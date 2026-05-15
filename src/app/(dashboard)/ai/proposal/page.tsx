'use client';

import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { 
  Sparkles, 
  FileText,
  Loader2
} from 'lucide-react';

interface Proposal {
  id: string;
  title: string;
  client: string;
  status: string;
  created: string;
  value: string;
}

export default function ProposalPage() {
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProposals();
  }, []);

  const fetchProposals = async () => {
    try {
      const res = await fetch('/api/proposals');
      const data = await res.json();
      if (data.proposals) setProposals(data.proposals);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div style={{ padding: 'var(--space-xl)' }}>
        <div style={{ display: 'flex', justifyContent: 'center', padding: '100px' }}>
          <Loader2 size={32} className="spin" />
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: 'var(--space-xl)' }}>
      <h1 className="type-h2">AI Proposal Generator</h1>
      <p className="type-body" style={{ color: 'var(--color-text-3)', marginBottom: 'var(--space-xl)' }}>
        Generate proposals with AI.
      </p>

      {proposals.length === 0 ? (
        <Card style={{ padding: 'var(--space-2xl)', textAlign: 'center' }}>
          <Sparkles size={40} style={{ color: 'var(--color-ai)', marginBottom: 'var(--space-md)' }} />
          <h2 className="type-h3" style={{ marginBottom: 'var(--space-sm)' }}>No Proposals Yet</h2>
          <p style={{ color: 'var(--color-text-3)', marginBottom: 'var(--space-lg)' }}>
            Create your first proposal using the API.
          </p>
        </Card>
      ) : (
        proposals.map((p) => (
          <Card key={p.id} style={{ padding: 'var(--space-md)', marginBottom: 'var(--space-sm)' }}>
            <Badge variant={p.status === 'ready' ? 'success' : 'neutral'}>{p.status}</Badge>
            <h3 style={{ margin: 'var(--space-sm) 0' }}>{p.title}</h3>
            <p style={{ color: 'var(--color-text-3)' }}>{p.client} - {p.value}</p>
          </Card>
        ))
      )}
    </div>
  );
}