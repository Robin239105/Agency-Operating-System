# Agency Operating System (AOS)

A modern, full-featured agency management platform built with Next.js, Prisma, and PostgreSQL.

## Features

### Dashboard
- Overview with key metrics and quick actions
- Activity feed and recent updates

### Client Management
- Client CRM with contact details, status tracking, and MRR
- Project management with kanban board
- Task management with priority levels and assignments
- Time tracking with timer, weekly charts, and project breakdown

### AI Workflows
- Brief Analyzer for processing project briefs
- AI Proposal Generator with multi-step form
- Meeting Summaries with key points and action items

### Team
- Team collaboration with member cards and status
- Activity feed showing recent team actions
- Quick actions for calls and chats

### Finance
- Billing plans and subscription management
- Invoice creation and payment tracking
- Payment history and outstanding balances

### Additional
- Knowledgebase with categorized articles
- Analytics with revenue charts and team heatmaps
- Settings for account and workspace management

## Tech Stack

- **Framework**: Next.js 16 with App Router
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js
- **UI**: Custom components with CSS Modules
- **Animations**: Framer Motion
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database (Neon, Supabase, or local)

### Installation

```bash
# Install dependencies
npm install

# Set up environment variables
# Copy .env.example to .env and update with your database URL

# Push database schema
npx prisma db push

# Start development server
npm run dev
```

### Environment Variables

```
DATABASE_URL=postgresql://...
DIRECT_URL=postgresql://...
NEXTAUTH_SECRET=your-secret-key
NEXTAUTH_URL=http://localhost:3000
```

## Project Structure

```
src/
├── app/                  # Next.js App Router pages
│   ├── (auth)/          # Authentication pages
│   ├── (dashboard)/     # Protected dashboard pages
│   └── api/            # API routes
├── components/          # Reusable UI components
│   ├── layout/         # Layout components (Sidebar, TopBar)
│   └── ui/             # UI components (Button, Card, etc.)
├── lib/                 # Utility libraries (Prisma, Auth)
└── types/               # TypeScript type definitions
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run db:studio` - Open Prisma Studio

## License

MIT