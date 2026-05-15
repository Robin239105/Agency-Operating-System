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

    // Get users from same workspace
    const workspace = await prisma.workspace.findFirst({
      where: { members: { some: { userId: session.user.id } } }
    });

    const members = await prisma.user.findMany({
      where: {
        workspaces: workspace ? { some: { workspaceId: workspace.id } } : undefined
      },
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        role: true,
        createdAt: true,
        tasks: { where: { assignedToId: undefined }, select: { id: true } },
        timeEntries: { 
          where: { startTime: { gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) } },
          select: { duration: true }
        }
      },
      take: 20,
    });

    const formattedMembers = members.map(m => ({
      id: m.id,
      name: m.name || 'Unknown',
      role: m.role,
      email: m.email,
      avatar: m.name?.charAt(0).toUpperCase() || 'U',
      status: Math.random() > 0.5 ? 'online' : Math.random() > 0.5 ? 'away' : 'offline',
      tasks: m.tasks.length,
      hoursThisWeek: Math.floor(m.timeEntries.reduce((acc, t) => acc + (t.duration || 0), 0) / 3600) + 'h'
    }));

    return NextResponse.json({ members: formattedMembers });
  } catch (error) {
    console.error('Team error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}