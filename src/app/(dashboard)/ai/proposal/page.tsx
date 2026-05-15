'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Input } from '@/components/ui/Input';
import { 
  Sparkles, 
  FileText, 
  Download, 
  Copy,
  Send,
  Wand2,
  ChevronRight,
  CheckCircle,
  Loader2
} from 'lucide-react';
import styles from './Proposal.module.css';

interface Proposal {
  id: string;
  client: string;
  title: string;
  status: string;
  created: string;
  value: string;
}

export default function ProposalPage() {
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [stats, setStats] = useState({ total: 0, ready: 0, draft: 0, value: '$0' });
  const [loading, setLoading] = useState(true);
  const [step, setStep] = useState<'form' | 'generating' | 'preview'>('form');
  const [clientName, setClientName] = useState('');
  const [projectType, setProjectType] = useState('');
  const [budget, setBudget] = useState('');
  const [timeline, setTimeline] = useState('');

  useEffect(() => {
    fetchProposals();
  }, []);

  const fetchProposals = async () => {
    try {
      const res = await fetch('/api/proposals');
      const data = await res.json();
      if (data.proposals) {
        setProposals(data.proposals);
        setStats(data.stats);
      }
    } catch (err) {
      console.error('Failed to fetch proposals:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleGenerate = () => {
    setStep('generating');
    setTimeout(() => setStep('preview'), 3000);
  };

  if (loading) {
    return (
      <div className={styles.container}>
        <div style={{ display: 'flex', justifyContent: 'center', padding: '100px' }}>
          <Loader2 size={32} className={styles.spin} />
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.titleGroup}>
          <h1 className="type-h2">AI Proposal Generator</h1>
          <p className="type-body" style={{ color: 'var(--color-text-3)' }}>
            Generate professional proposals with AI assistance.
          </p>
        </div>
      </header>

      <div className={styles.statsRow}>
        <Card className={styles.statCard}>
          <div className={styles.statIcon} style={{ color: 'var(--color-ai)' }}>
            <Sparkles size={20} />
          </div>
          <div className={styles.statContent}>
            <span className={styles.statValue}>{stats.total}</span>
            <span className={styles.statLabel}>Proposals Generated</span>
          </div>
        </Card>
        <Card className={styles.statCard}>
          <div className={styles.statIcon}>
            <FileText size={20} />
          </div>
          <div className={styles.statContent}>
            <span className={styles.statValue}>{stats.value}</span>
            <span className={styles.statLabel}>Total Value</span>
          </div>
        </Card>
      </div>

      <div className={styles.mainContent}>
        <div className={styles.generatorSection}>
          {step === 'form' && (
            <Card className={styles.formCard}>
              <div className={styles.formHeader}>
                <Wand2 size={24} className={styles.wandIcon} />
                <div>
                  <h2 className="type-h3">Create New Proposal</h2>
                  <p className="type-body" style={{ color: 'var(--color-text-3)', fontSize: '13px' }}>
                    Fill in the details and let AI generate your proposal
                  </p>
                </div>
              </div>

              <div className={styles.formFields}>
                <div className={styles.fieldGroup}>
                  <label className={styles.fieldLabel}>Client Name</label>
                  <input 
                    type="text" 
                    className={styles.fieldInput}
                    placeholder="e.g., Acme Corporation"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                  />
                </div>

                <div className={styles.fieldGroup}>
                  <label className={styles.fieldLabel}>Project Type</label>
                  <select 
                    className={styles.fieldInput}
                    value={projectType}
                    onChange={(e) => setProjectType(e.target.value)}
                  >
                    <option value="">Select project type</option>
                    <option value="branding">Brand Identity</option>
                    <option value="website">Website Development</option>
                    <option value="app">Mobile App</option>
                  </select>
                </div>

                <div className={styles.fieldRow}>
                  <div className={styles.fieldGroup}>
                    <label className={styles.fieldLabel}>Budget</label>
                    <input 
                      type="text" 
                      className={styles.fieldInput}
                      placeholder="$10,000"
                      value={budget}
                      onChange={(e) => setBudget(e.target.value)}
                    />
                  </div>
                  <div className={styles.fieldGroup}>
                    <label className={styles.fieldLabel}>Timeline</label>
                    <input 
                      type="text" 
                      className={styles.fieldInput}
                      placeholder="4 weeks"
                      value={timeline}
                      onChange={(e) => setTimeline(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className={styles.formActions}>
                <Button variant="secondary" onClick={() => setStep('preview')}>Skip</Button>
                <Button variant="primary" leftIcon={<Sparkles size={16} />} onClick={handleGenerate}>
                  Generate
                </Button>
              </div>
            </Card>
          )}

          {step === 'generating' && (
            <Card className={styles.generatingCard}>
              <div className={styles.generatingContent}>
                <div className={styles.generatingIcon}>
                  <Loader2 size={40} className={styles.spinIcon} />
                </div>
                <h2 className="type-h3">Generating...</h2>
                <div className={styles.generatingSteps}>
                  <div className={styles.genStep}>
                    <CheckCircle size={14} />
                    <span>Analyzing</span>
                  </div>
                  <div className={styles.genStep}>
                    <Loader2 size={14} className={styles.spinIcon} />
                    <span>Creating</span>
                  </div>
                </div>
              </div>
            </Card>
          )}

          {step === 'preview' && (
            <Card className={styles.previewCard}>
              <div className={styles.previewHeader}>
                <h2 className="type-h3">Preview</h2>
                <div className={styles.previewActions}>
                  <Button variant="primary">Send</Button>
                </div>
              </div>
              <div className={styles.proposalContent}>
                <p>Proposal for {clientName || 'Client'}</p>
              </div>
            </Card>
          )}
        </div>

        <div className={styles.historySection}>
          <h2 className="type-h3">Recent</h2>
          {(proposals.length > 0 ? proposals : [{ id: '1', client: 'Sample', title: 'Demo', status: 'draft', created: '2024-05-15', value: '$0' }]).map((proposal) => (
            <Card key={proposal.id} className={styles.historyCard}>
              <Badge variant={proposal.status === 'ready' ? 'success' : 'neutral'}>{proposal.status}</Badge>
              <h3>{proposal.title}</h3>
              <p>{proposal.client}</p>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}