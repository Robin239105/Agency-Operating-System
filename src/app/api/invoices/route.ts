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

    const invoices = await prisma.invoice.findMany({
      where: { createdById: session.user.id },
      include: {
        items: true,
        project: { select: { name: true } }
      },
      orderBy: { createdAt: 'desc' },
      take: 50,
    });

    const formattedInvoices = invoices.map(inv => ({
      id: inv.id,
      number: inv.number,
      client: inv.project?.name || inv.clientName || 'Unknown',
      amount: `$${inv.total.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`,
      date: inv.issueDate.toISOString().split('T')[0],
      dueDate: inv.dueDate.toISOString().split('T')[0],
      status: inv.status.toLowerCase(),
      items: inv.items.length
    }));

    const totalPaid = invoices.filter(i => i.status === 'PAID').reduce((acc, i) => acc + i.total, 0);
    const totalPending = invoices.filter(i => i.status === 'SENT').reduce((acc, i) => acc + i.total, 0);
    const totalOverdue = invoices.filter(i => i.status === 'OVERDUE').reduce((acc, i) => acc + i.total, 0);

    return NextResponse.json({ 
      invoices: formattedInvoices,
      stats: { totalPaid, totalPending, totalOverdue }
    });
  } catch (error) {
    console.error('Invoices error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { clientName, projectId, items, dueDate } = await req.json();
    
    const count = await prisma.invoice.count();
    const invoiceNumber = `INV-2024-${String(count + 1).padStart(3, '0')}`;

    const invoice = await prisma.invoice.create({
      data: {
        number: invoiceNumber,
        clientName,
        projectId,
        dueDate: new Date(dueDate),
        createdById: session.user.id,
        status: 'DRAFT',
        items: {
          create: items.map((item: any) => ({
            description: item.description,
            quantity: item.quantity || 1,
            rate: item.rate || 0,
            amount: (item.quantity || 1) * (item.rate || 0)
          }))
        }
      }
    });

    return NextResponse.json({ invoice });
  } catch (error) {
    console.error('Create invoice error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}