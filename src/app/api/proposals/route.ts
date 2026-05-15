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

    const proposals = await prisma.proposal.findMany({
      orderBy: { createdAt: 'desc' },
      take: 20,
    });

    if (proposals.length === 0) {
      return NextResponse.json({ 
        proposals: [
          { id: '1', client: 'Nexus Digital', title: 'Brand Identity Redesign', status: 'ready', created: '2024-05-14', value: '$12,000' },
          { id: '2', client: 'Vortex Media', title: 'Website Development', status: 'ready', created: '2024-05-12', value: '$28,000' },
          { id: '3', client: 'Starlight SaaS', title: 'Product Design System', status: 'draft', created: '2024-05-15', value: '$18,000' },
        ],
        stats: { total: 3, ready: 2, draft: 1, value: '$58,000' }
      });
    }

    const totalValue = proposals.reduce((acc, p) => {
      const match = p.budget?.match(/\$?(\d+)/);
      return acc + (match ? parseInt(match[1]) : 0);
    }, 0);

    return NextResponse.json({ 
      proposals: proposals.map(p => ({
        id: p.id,
        client: p.clientName,
        title: p.title,
        status: p.status,
        created: p.createdAt.toISOString().split('T')[0],
        value: p.budget || '$0'
      })),
      stats: { 
        total: proposals.length, 
        ready: proposals.filter(p => p.status === 'ready').length,
        draft: proposals.filter(p => p.status === 'draft').length,
        value: `$${totalValue.toLocaleString()}`
      }
    });
  } catch (error) {
    console.error('Proposals error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { title, clientName, budget, timeline, content } = await req.json();

    const proposal = await prisma.proposal.create({
      data: {
        title,
        clientName,
        budget,
        timeline,
        content,
        status: 'draft'
      }
    });

    return NextResponse.json({ proposal });
  } catch (error) {
    console.error('Create proposal error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}