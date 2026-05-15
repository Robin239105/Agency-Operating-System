'use client';

import React, { useState, useEffect } from 'react';
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
  MessageSquare,
  ChevronRight,
  Brain,
  Calendar,
  Zap,
  Loader2
} from 'lucide-react';
import styles from './Summaries.module.css';

interface Summary {
  id: string;
  title: string;
  meeting: string;
  date: string;
  duration: string;
  participants: number;
  keyPoints: number;
  status: 'ready' | 'processing';
}

export default function SummariesPage() {
  const [summaries, setSummaries] = useState<Summary[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSummary, setSelectedSummary] = useState<Summary | null>(null);

  useEffect(() => {
    // For now, use mock data since we don't have an API for summaries yet
    setSummaries([
      { id: '1', title: 'Project Kickoff Discussion', meeting: 'Nexus Brand Kickoff', date: 'May 14, 2024', duration: '45 min', participants: 5, keyPoints: 8, status: 'ready' },
      { id: '2', title: 'Sprint Planning Session', meeting: 'Sprint 23 Planning', date: 'May 13, 2024', duration: '60 min', participants: 8, keyPoints: 12, status: 'ready' },
      { id: '3', title: 'Client Feedback Review', meeting: 'Vortex Design Review', date: 'May 12, 2024', duration: '30 min', participants: 3, keyPoints: 6, status: 'ready' },
    ]);
    setSelectedSummary({
      id: '1', title: 'Project Kickoff Discussion', meeting: 'Nexus Brand Kickoff', date: 'May 14, 2024', duration: '45 min', participants: 5, keyPoints: 8, status: 'ready'
    });
    setLoading(false);
  }, []);

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
          <h1 className="type-h2">AI Meeting Summaries</h1>
          <p className="type-body" style={{ color: 'var(--color-text-3)' }}>
            Automatically generated summaries from your meetings.
          </p>
        </div>
        <Button variant="primary" leftIcon={<Zap size={18} />}>
          New Summary
        </Button>
      </header>

      <div className={styles.statsRow}>
        <Card className={styles.statCard}>
          <div className={styles.statIcon} style={{ color: 'var(--color-ai)' }}>
            <Brain size={20} />
          </div>
          <div className={styles.statContent}>
            <span className={styles.statValue}>{summaries.length}</span>
            <span className={styles.statLabel}>Total Summaries</span>
          </div>
        </Card>
        <Card className={styles.statCard}>
          <div className={styles.statIcon}>
            <Sparkles size={20} />
          </div>
          <div className={styles.statContent}>
            <span className={styles.statValue}>{summaries.reduce((acc, s) => acc + s.keyPoints, 0)}</span>
            <span className={styles.statLabel}>Key Insights</span>
          </div>
        </Card>
        <Card className={styles.statCard}>
          <div className={styles.statIcon}>
            <Clock size={20} />
          </div>
          <div className={styles.statContent}>
            <span className={styles.statValue}>{Math.floor(summaries.reduce((acc, s) => acc + parseInt(s.duration), 0) / 60)}h</span>
            <span className={styles.statLabel}>Time Saved</span>
          </div>
        </Card>
      </div>

      <div className={styles.mainContent}>
        <div className={styles.listSection}>
          <div className={styles.sectionHeader}>
            <h2 className="type-h3">Recent Summaries</h2>
          </div>
          <div className={styles.summariesList}>
            {summaries.map((summary, idx) => (
              <motion.div
                key={summary.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
              >
                <Card 
                  className={`${styles.summaryCard} ${selectedSummary?.id === summary.id ? styles.selected : ''}`}
                  hoverable
                  onClick={() => setSelectedSummary(summary)}
                >
                  <div className={styles.summaryMain}>
                    <div className={styles.summaryHeader}>
                      {summary.status === 'processing' ? (
                        <Badge variant="warning">Processing</Badge>
                      ) : (
                        <Badge variant="success">Ready</Badge>
                      )}
                    </div>
                    <h3 className={styles.summaryTitle}>{summary.title}</h3>
                    <p className={styles.summaryMeeting}>{summary.meeting}</p>
                    <div className={styles.summaryMeta}>
                      <span><Calendar size={12} /> {summary.date}</span>
                      <span><Clock size={12} /> {summary.duration}</span>
                      <span><User size={12} /> {summary.participants}</span>
                    </div>
                  </div>
                  <ChevronRight size={16} className={styles.chevron} />
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        <div className={styles.detailSection}>
          {selectedSummary && (
            <Card className={styles.detailCard}>
              <div className={styles.detailHeader}>
                <div className={styles.detailTitleGroup}>
                  <h2 className="type-h3">{selectedSummary.title}</h2>
                  <p className={styles.detailMeeting}>{selectedSummary.meeting}</p>
                </div>
                <div className={styles.detailActions}>
                  <Button variant="ghost" size="sm"><Copy size={14} /></Button>
                  <Button variant="ghost" size="sm"><Download size={14} /></Button>
                </div>
              </div>

              <div className={styles.detailMeta}>
                <div className={styles.metaItem}>
                  <Clock size={14} />
                  <span>{selectedSummary.date}</span>
                </div>
                <div className={styles.metaItem}>
                  <User size={14} />
                  <span>{selectedSummary.participants} participants</span>
                </div>
                <div className={styles.metaItem}>
                  <FileText size={14} />
                  <span>{selectedSummary.keyPoints} key points</span>
                </div>
              </div>

              <div className={styles.summaryContent}>
                <h3 className={styles.contentTitle}>Meeting Overview</h3>
                <p className={styles.contentText}>
                  This meeting covered the main project objectives and deliverables. 
                  The team discussed current progress, identified blockers, and defined next steps.
                </p>

                <h3 className={styles.contentTitle}>Key Discussion Points</h3>
                <ul className={styles.pointsList}>
                  <li>Project timeline confirmed with client deliverables due end of month</li>
                  <li>Resource allocation reviewed</li>
                  <li>Technical requirements finalized</li>
                  <li>QA testing schedule established</li>
                </ul>

                <h3 className={styles.contentTitle}>Action Items</h3>
                <ul className={styles.actionList}>
                  <li><strong>Team Member 1:</strong> Complete task by Wednesday</li>
                  <li><strong>Team Member 2:</strong> Update documentation</li>
                  <li><strong>Team Member 3:</strong> Schedule follow-up meeting</li>
                </ul>

                <h3 className={styles.contentTitle}>AI-Generated Insights</h3>
                <div className={styles.aiInsights}>
                  <div className={styles.insightItem}>
                    <Sparkles size={14} className={styles.insightIcon} />
                    <span>High confidence: Project on track for delivery</span>
                  </div>
                  <div className={styles.insightItem}>
                    <Sparkles size={14} className={styles.insightIcon} />
                    <span>Risk identified: Timeline may be tight</span>
                  </div>
                </div>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}