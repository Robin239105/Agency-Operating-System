import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const projects = await prisma.project.findMany({
      where: {
        members: {
          some: { userId: session.user.id }
        }
      },
      include: {
        _count: { select: { tasks: true } }
      },
      orderBy: { updatedAt: 'desc' },
    });

    // Transform projects to clients format
    const clients = projects.map(project => ({
      id: project.id,
      name: project.name,
      status: project.status.toLowerCase() as 'active' | 'progress' | 'review' | 'blocked',
      lastContact: project.updatedAt.toISOString().split('T')[0],
      mrr: `$${(Math.random() * 15000 + 2000).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`,
      projects: project._count.tasks,
    }));

    return NextResponse.json({ clients });
  } catch (error) {
    console.error('Clients error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { name, description } = await req.json();

    // Get or create workspace for user
    let workspace = await prisma.workspace.findFirst({
      where: { members: { some: { userId: session.user.id } } }
    });

    if (!workspace) {
      workspace = await prisma.workspace.create({
        data: {
          name: 'My Workspace',
          slug: `workspace-${Date.now()}`,
          members: {
            create: { userId: session.user.id, role: 'ADMIN' }
          }
        }
      });
    }

    const project = await prisma.project.create({
      data: {
        name,
        description,
        createdById: session.user.id,
        workspaceId: workspace.id,
        members: {
          create: { userId: session.user.id, role: 'ADMIN' }
        }
      },
    });

    return NextResponse.json({ project });
  } catch (error) {
    console.error('Create client error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}