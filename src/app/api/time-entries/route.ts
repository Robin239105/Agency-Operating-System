import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const projectId = searchParams.get('projectId');

    const timeEntries = await prisma.timeEntry.findMany({
      where: {
        userId: session.user.id,
        ...(projectId ? { projectId } : {}),
      },
      include: {
        project: { select: { id: true, name: true, color: true } },
        task: { select: { id: true, title: true } }
      },
      orderBy: { startTime: 'desc' },
      take: 100,
    });

    return NextResponse.json({ timeEntries });
  } catch (error) {
    console.error('Time entries error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { description, duration, startTime, endTime, billable, projectId, taskId } = await req.json();

    const timeEntry = await prisma.timeEntry.create({
      data: {
        description,
        duration: duration || (endTime ? Math.floor((new Date(endTime).getTime() - new Date(startTime).getTime()) / 1000) : 0),
        startTime: new Date(startTime),
        endTime: endTime ? new Date(endTime) : null,
        billable: billable ?? true,
        projectId,
        taskId,
        userId: session.user.id,
      },
      include: {
        project: { select: { id: true, name: true, color: true } },
        task: { select: { id: true, title: true } }
      }
    });

    return NextResponse.json({ timeEntry });
  } catch (error) {
    console.error('Create time entry error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id, description, duration, endTime } = await req.json();

    const timeEntry = await prisma.timeEntry.update({
      where: { id },
      data: {
        ...(description && { description }),
        ...(duration && { duration }),
        ...(endTime && { endTime: new Date(endTime) }),
      }
    });

    return NextResponse.json({ timeEntry });
  } catch (error) {
    console.error('Update time entry error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}