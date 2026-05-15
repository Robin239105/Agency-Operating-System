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

    const articles = await prisma.knowledgeBaseArticle.findMany({
      orderBy: { updatedAt: 'desc' },
      take: 50,
    });

    if (articles.length === 0) {
      // Return sample articles for demo
      return NextResponse.json({ 
        articles: [
          { id: '1', title: 'Getting Started Guide', category: 'Getting Started', readTime: '5 min', views: 1240, starred: true, excerpt: 'Learn how to set up your workspace and invite team members.' },
          { id: '2', title: 'Understanding Projects', category: 'Projects', readTime: '8 min', views: 856, starred: false, excerpt: 'Learn how to create and manage projects effectively.' },
          { id: '3', title: 'Task Management Basics', category: 'Tasks', readTime: '6 min', views: 634, starred: true, excerpt: 'Master task creation, assignment, and tracking.' },
          { id: '4', title: 'Time Tracking Tips', category: 'Time', readTime: '7 min', views: 512, starred: false, excerpt: 'Get the most out of time tracking features.' },
          { id: '5', title: 'AI Features Overview', category: 'AI', readTime: '10 min', views: 428, starred: false, excerpt: 'Explore the AI-powered features in AOS.' },
        ],
        categories: [
          { id: 'getting-started', name: 'Getting Started', count: 5 },
          { id: 'projects', name: 'Projects', count: 8 },
          { id: 'tasks', name: 'Tasks', count: 6 },
          { id: 'time', name: 'Time Tracking', count: 4 },
          { id: 'ai', name: 'AI Features', count: 3 },
        ]
      });
    }

    const categories = [...new Set(articles.map(a => a.category))].map(cat => ({
      id: cat.toLowerCase().replace(' ', '-'),
      name: cat,
      count: articles.filter(a => a.category === cat).length
    }));

    return NextResponse.json({ 
      articles: articles.map(a => ({
        id: a.id,
        title: a.title,
        category: a.category,
        readTime: Math.ceil(a.content.length / 1000) + ' min',
        views: a.views,
        starred: a.starred,
        excerpt: a.content.substring(0, 100) + '...'
      })),
      categories
    });
  } catch (error) {
    console.error('KB error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}