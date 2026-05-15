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
        members: { include: { user: { select: { id: true, name: true, email: true, image: true } } } },
        tasks: true,
        _count: { select: { tasks: true, timeEntries: true } }
      },
      orderBy: { updatedAt: 'desc' },
    });

    return NextResponse.json({ projects });
  } catch (error) {
    console.error('Projects error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { name, description, color, workspaceId } = await req.json();

    const project = await prisma.project.create({
      data: {
        name,
        description,
        color,
        createdById: session.user.id,
        workspaceId: workspaceId || (await prisma.workspace.create({
          data: {
            name: 'My Workspace',
            slug: `workspace-${Date.now()}`,
          }
        })).id,
        members: {
          create: { userId: session.user.id, role: 'ADMIN' }
        }
      },
      include: {
        members: { include: { user: { select: { id: true, name: true, email: true } } } }
      }
    });

    return NextResponse.json({ project });
  } catch (error) {
    console.error('Create project error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}