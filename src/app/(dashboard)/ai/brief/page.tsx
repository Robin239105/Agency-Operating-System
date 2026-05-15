'use client';

import React from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Sparkles } from 'lucide-react';

export default function AIBriefPage() {
  return (
    <div style={{ padding: 'var(--space-xl)' }}>
      <h1 className="type-h2">Brief Analyzer</h1>
      <p className="type-body" style={{ color: 'var(--color-text-3)', marginBottom: 'var(--space-xl)' }}>
        Upload project briefs to extract requirements and milestones.
      </p>

      <Card style={{ padding: 'var(--space-2xl)', textAlign: 'center' }}>
        <Sparkles size={40} style={{ color: 'var(--color-ai)', marginBottom: 'var(--space-md)' }} />
        <h2 className="type-h3" style={{ marginBottom: 'var(--space-sm)' }}>Coming Soon</h2>
        <p style={{ color: 'var(--color-text-3)', marginBottom: 'var(--space-lg)' }}>
          AI brief analysis will be available after connecting an AI provider.
        </p>
        <Button variant="primary">Connect AI Provider</Button>
      </Card>
    </div>
  );
}