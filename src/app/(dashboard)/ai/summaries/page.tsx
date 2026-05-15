'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { 
  FileText, 
  Clock, 
  User,
  Sparkles,
  Copy,
  Download,
  Calendar,
  Zap,
  Brain
} from 'lucide-react';

export default function SummariesPage() {
  return (
    <div style={{ padding: 'var(--space-xl)' }}>
      <header style={{ marginBottom: 'var(--space-xl)' }}>
        <h1 className="type-h2">AI Meeting Summaries</h1>
        <p className="type-body" style={{ color: 'var(--color-text-3)' }}>
          Connect your calendar to start generating meeting summaries.
        </p>
      </header>

      <Card style={{ padding: 'var(--space-2xl)', textAlign: 'center' }}>
        <div style={{ marginBottom: 'var(--space-lg)' }}>
          <Brain size={48} style={{ color: 'var(--color-ai)' }} />
        </div>
        <h2 className="type-h3" style={{ marginBottom: 'var(--space-md)' }}>No Summaries Yet</h2>
        <p className="type-body" style={{ color: 'var(--color-text-3)', maxWidth: 400, margin: '0 auto var(--space-lg)' }}>
          AI-generated meeting summaries will appear here once you connect your calendar and start having meetings.
        </p>
        <Button variant="primary" leftIcon={<Zap size={16} />}>
          Connect Calendar
        </Button>
      </Card>
    </div>
  );
}