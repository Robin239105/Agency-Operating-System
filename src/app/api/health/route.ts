import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    // Try a simple query to verify DB connection
    await prisma.user.count();
    return NextResponse.json({ 
      status: 'ok', 
      message: 'Database connection successful' 
    });
  } catch (error: any) {
    console.error('Health check error:', error);
    return NextResponse.json({ 
      status: 'error', 
      message: 'Database connection failed',
      error: error.message 
    }, { status: 500 });
  }
}