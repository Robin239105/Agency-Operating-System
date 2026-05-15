'use client';

import React, { useState } from 'react';
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
  Briefcase,
  DollarSign,
  Clock,
  ChevronRight,
  CheckCircle,
  Loader2
} from 'lucide-react';
import styles from './Proposal.module.css';

interface Proposal {
  id: string;
  client: string;
  title: string;
  status: 'draft' | 'generating' | 'ready' | 'sent';
  created: string;
  value: string;
}

const mockProposals: Proposal[] = [
  { id: '1', client: 'Nexus Digital', title: 'Brand Identity Redesign', status: 'ready', created: 'May 14, 2024', value: '$12,000' },
  { id: '2', client: 'Vortex Media', title: 'Website Development', status: 'ready', created: 'May 12, 2024', value: '$28,000' },
  { id: '3', client: 'Starlight SaaS', title: 'Product Design System', status: 'generating', created: 'May 15, 2024', value: '$18,000' },
  { id: '4', client: 'TechStart Inc', title: 'Marketing Website', status: 'draft', created: 'May 15, 2024', value: '$8,500' },
];

export default function ProposalPage() {
  const [step, setStep] = useState<'form' | 'generating' | 'preview'>('form');
  const [clientName, setClientName] = useState('');
  const [projectType, setProjectType] = useState('');
  const [budget, setBudget] = useState('');
  const [timeline, setTimeline] = useState('');

  const handleGenerate = () => {
    setStep('generating');
    setTimeout(() => setStep('preview'), 3000);
  };

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
            <span className={styles.statValue}>23</span>
            <span className={styles.statLabel}>Proposals Generated</span>
          </div>
        </Card>
        <Card className={styles.statCard}>
          <div className={styles.statIcon}>
            <DollarSign size={20} />
          </div>
          <div className={styles.statContent}>
            <span className={styles.statValue}>$142k</span>
            <span className={styles.statLabel}>Total Value</span>
          </div>
        </Card>
        <Card className={styles.statCard}>
          <div className={styles.statIcon}>
            <FileText size={20} />
          </div>
          <div className={styles.statContent}>
            <span className={styles.statValue}>67%</span>
            <span className={styles.statLabel}>Win Rate</span>
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
                    <option value="design-system">Design System</option>
                    <option value="marketing">Marketing Campaign</option>
                  </select>
                </div>

                <div className={styles.fieldRow}>
                  <div className={styles.fieldGroup}>
                    <label className={styles.fieldLabel}>Estimated Budget</label>
                    <input 
                      type="text" 
                      className={styles.fieldInput}
                      placeholder="$10,000 - $25,000"
                      value={budget}
                      onChange={(e) => setBudget(e.target.value)}
                    />
                  </div>
                  <div className={styles.fieldGroup}>
                    <label className={styles.fieldLabel}>Timeline</label>
                    <input 
                      type="text" 
                      className={styles.fieldInput}
                      placeholder="4-6 weeks"
                      value={timeline}
                      onChange={(e) => setTimeline(e.target.value)}
                    />
                  </div>
                </div>

                <div className={styles.fieldGroup}>
                  <label className={styles.fieldLabel}>Project Description</label>
                  <textarea 
                    className={styles.fieldTextarea}
                    placeholder="Describe the project scope, goals, and key requirements..."
                    rows={4}
                  />
                </div>
              </div>

              <div className={styles.formActions}>
                <Button variant="secondary" onClick={() => setStep('preview')}>Skip Generation</Button>
                <Button variant="primary" leftIcon={<Sparkles size={16} />} onClick={handleGenerate}>
                  Generate with AI
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
                <h2 className="type-h3">Generating Your Proposal</h2>
                <p className="type-body" style={{ color: 'var(--color-text-3)' }}>
                  AI is analyzing your requirements and creating a professional proposal...
                </p>
                <div className={styles.generatingSteps}>
                  <div className={styles.genStep}>
                    <CheckCircle size={14} className={styles.doneIcon} />
                    <span>Analyzing project requirements</span>
                  </div>
                  <div className={styles.genStep}>
                    <Loader2 size={14} className={styles.spinIcon} />
                    <span>Generating scope of work</span>
                  </div>
                  <div className={styles.genStep}>
                    <span className={styles.pendingIcon}>○</span>
                    <span>Creating pricing breakdown</span>
                  </div>
                  <div className={styles.genStep}>
                    <span className={styles.pendingIcon}>○</span>
                    <span>Writing timeline & deliverables</span>
                  </div>
                </div>
              </div>
            </Card>
          )}

          {step === 'preview' && (
            <Card className={styles.previewCard}>
              <div className={styles.previewHeader}>
                <div>
                  <h2 className="type-h3">Proposal Preview</h2>
                  <p className="type-body" style={{ color: 'var(--color-text-3)', fontSize: '13px' }}>
                    Review and edit your generated proposal
                  </p>
                </div>
                <div className={styles.previewActions}>
                  <Button variant="ghost" leftIcon={<Copy size={14} />}>Copy</Button>
                  <Button variant="ghost" leftIcon={<Download size={14} />}>Export</Button>
                  <Button variant="primary" leftIcon={<Send size={14} />}>Send to Client</Button>
                </div>
              </div>

              <div className={styles.proposalContent}>
                <div className={styles.proposalHeader}>
                  <div className={styles.proposalLogo}>A</div>
                  <div className={styles.proposalTitle}>
                    <h3>Brand Identity Proposal</h3>
                    <p>Prepared for {clientName || 'Acme Corporation'}</p>
                  </div>
                </div>

                <div className={styles.proposalSection}>
                  <h4>Executive Summary</h4>
                  <p>
                    We're excited to present this proposal for your brand identity project. 
                    Our team will work closely with you to create a distinctive visual identity 
                    that communicates your brand's values and resonates with your target audience.
                  </p>
                </div>

                <div className={styles.proposalSection}>
                  <h4>Scope of Work</h4>
                  <ul>
                    <li>Brand strategy & positioning workshop</li>
                    <li>Logo design with 3 revision rounds</li>
                    <li>Color palette & typography system</li>
                    <li>Brand guidelines document</li>
                    <li>Social media asset templates</li>
                  </ul>
                </div>

                <div className={styles.proposalGrid}>
                  <div className={styles.proposalBox}>
                    <h4>Investment</h4>
                    <span className={styles.boxValue}>{budget || '$15,000'}</span>
                  </div>
                  <div className={styles.proposalBox}>
                    <h4>Timeline</h4>
                    <span className={styles.boxValue}>{timeline || '6 weeks'}</span>
                  </div>
                </div>
              </div>
            </Card>
          )}
        </div>

        <div className={styles.historySection}>
          <div className={styles.sectionHeader}>
            <h2 className="type-h3">Recent Proposals</h2>
          </div>
          <div className={styles.historyList}>
            {mockProposals.map((proposal, idx) => (
              <motion.div
                key={proposal.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
              >
                <Card className={styles.historyCard} hoverable>
                  <div className={styles.historyMain}>
                    <div className={styles.historyHeader}>
                      <Badge 
                        variant={
                          proposal.status === 'ready' ? 'success' : 
                          proposal.status === 'generating' ? 'warning' : 
                          proposal.status === 'sent' ? 'neutral' : 'neutral'
                        }
                      >
                        {proposal.status}
                      </Badge>
                    </div>
                    <h3 className={styles.historyTitle}>{proposal.title}</h3>
                    <p className={styles.historyClient}>{proposal.client}</p>
                    <div className={styles.historyMeta}>
                      <span>{proposal.created}</span>
                      <span className={styles.historyValue}>{proposal.value}</span>
                    </div>
                  </div>
                  <ChevronRight size={16} className={styles.chevron} />
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}