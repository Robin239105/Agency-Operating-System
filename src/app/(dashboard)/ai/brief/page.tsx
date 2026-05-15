'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { 
  Sparkles, 
  Plus, 
  Search, 
  Upload, 
  FileText, 
  Check, 
  Copy, 
  ChevronRight,
  Loader2,
  RefreshCcw
} from 'lucide-react';
import styles from './AIBrief.module.css';

export default function AIBriefPage() {
  const [status, setStatus] = useState<'idle' | 'uploading' | 'processing' | 'done'>('idle');
  const [progress, setProgress] = useState(0);

  const startAnalysis = () => {
    setStatus('uploading');
    let p = 0;
    const interval = setInterval(() => {
      p += 5;
      setProgress(p);
      if (p >= 100) {
        clearInterval(interval);
        setStatus('processing');
        setTimeout(() => setStatus('done'), 3000);
      }
    }, 50);
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.titleGroup}>
          <div className={styles.aiBadge}>
            <Sparkles size={14} />
            <span>AI WORKFLOW</span>
          </div>
          <h1 className="type-h2">Brief Analyzer</h1>
          <p className="type-body" style={{ color: 'var(--color-text-3)' }}>
            Upload project briefs or meeting transcripts to extract requirements and milestones.
          </p>
        </div>
        <Button variant="ghost" leftIcon={<RefreshCcw size={16} />}>Reset Workflow</Button>
      </header>

      <div className={styles.content}>
        <div className={styles.workflowPanel}>
          <h3 className="type-label" style={{ marginBottom: 'var(--space-md)' }}>Execution Steps</h3>
          <div className={styles.steps}>
            <Step number={1} title="Upload Brief" status={status === 'idle' ? 'active' : 'done'} />
            <Step number={2} title="AI Processing" status={status === 'processing' ? 'active' : status === 'done' ? 'done' : 'pending'} />
            <Step number={3} title="Extract Requirements" status={status === 'done' ? 'active' : 'pending'} />
            <Step number={4} title="Generate Milestones" status={status === 'done' ? 'active' : 'pending'} />
          </div>
        </div>

        <div className={styles.previewPanel}>
          <AnimatePresence mode="wait">
            {status === 'idle' && (
              <motion.div
                key="idle"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className={styles.uploadZone}
                onClick={startAnalysis}
              >
                <div className={styles.uploadIcon}>
                  <Upload size={32} />
                </div>
                <h3 className="type-h3">Drop your brief here</h3>
                <p className="type-body" style={{ color: 'var(--color-text-3)' }}>
                  Support PDF, DOCX, or plain text files. Max 10MB.
                </p>
                <Button variant="secondary" style={{ marginTop: 'var(--space-md)' }}>Select File</Button>
              </motion.div>
            )}

            {(status === 'uploading' || status === 'processing') && (
              <motion.div
                key="processing"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className={styles.processingState}
              >
                <div className={styles.aiGlowCircle}>
                  <Sparkles size={48} color="var(--color-ai)" />
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                    className={styles.orbit}
                  />
                </div>
                <h3 className="type-h3">
                  {status === 'uploading' ? 'Uploading Brief...' : 'Analyzing with AI...'}
                </h3>
                <div className={styles.progressBarWrapper}>
                  <motion.div 
                    className={styles.progressBar} 
                    animate={{ width: `${progress}%` }}
                  />
                </div>
                <p className={styles.streamingText}>
                  {status === 'processing' ? 'Extracting project scope and identifying technical requirements...' : 'Initializing secure upload tunnel...'}
                </p>
              </motion.div>
            )}

            {status === 'done' && (
              <motion.div
                key="done"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className={styles.resultCard}
              >
                <div className={styles.resultHeader}>
                  <div className={styles.resultTitle}>
                    <FileText size={18} color="var(--color-ai)" />
                    <span>Analysis Results: Nexus Brand Identity</span>
                  </div>
                  <Button variant="ghost" size="sm"><Copy size={14} /></Button>
                </div>
                
                <div className={styles.resultBody}>
                  <section className={styles.resultSection}>
                    <h4 className={styles.sectionTitle}>Summary</h4>
                    <p className={styles.sectionText}>
                      The client is seeking a complete brand overhaul for their digital presence, focusing on a cinematic dark aesthetic that communicates precision and technical excellence.
                    </p>
                  </section>

                  <section className={styles.resultSection}>
                    <h4 className={styles.sectionTitle}>Key Requirements</h4>
                    <ul className={styles.resultList}>
                      <li>Full typography system using Bricolage Grotesque</li>
                      <li>Custom 3D-inspired animated hero components</li>
                      <li>Multi-tenant architecture support</li>
                      <li>Automated billing integration</li>
                    </ul>
                  </section>
                </div>

                <div className={styles.resultFooter}>
                  <Button variant="ai" leftIcon={<Plus size={16} />}>Create Project from Brief</Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

function Step({ number, title, status }: { number: number, title: string, status: 'pending' | 'active' | 'done' }) {
  return (
    <div className={clsx(styles.step, styles[status])}>
      <div className={styles.stepNumber}>
        {status === 'done' ? <Check size={12} /> : number}
      </div>
      <span className={styles.stepTitle}>{title}</span>
      {status === 'active' && <Loader2 size={12} className={styles.stepLoader} />}
    </div>
  );
}

function clsx(...args: any[]) {
  return args.filter(Boolean).join(' ');
}
