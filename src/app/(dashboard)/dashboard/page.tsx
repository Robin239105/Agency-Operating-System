'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { MetricCard } from '@/components/ui/MetricCard';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Sparkles, ArrowRight, Clock, MessageSquare } from 'lucide-react';
import styles from './Dashboard.module.css';

export default function Dashboard() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <motion.h1 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="type-h1"
        >
          Good morning, <span style={{ color: 'var(--color-accent)' }}>Alex</span>
        </motion.h1>
        <p className="type-body" style={{ color: 'var(--color-text-2)' }}>
          Here's what's happening across your agency today.
        </p>
      </header>

      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className={styles.metricsGrid}
      >
        <motion.div variants={item}><MetricCard label="Revenue MTD" value="142.8" prefix="$" suffix="k" trend={12.4} /></motion.div>
        <motion.div variants={item}><MetricCard label="Active Projects" value="24" trend={8.2} /></motion.div>
        <motion.div variants={item}><MetricCard label="Total Clients" value="18" trend={-2.1} /></motion.div>
        <motion.div variants={item}><MetricCard label="AI Jobs Run" value="1,240" trend={24.5} /></motion.div>
      </motion.div>

      <div className={styles.mainGrid}>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className={styles.activityColumn}
        >
          <Card padding="none">
            <div className={styles.cardHeader}>
              <h3 className="type-h3">Project Activity</h3>
              <Badge variant="default">Live Feed</Badge>
            </div>
            <div className={styles.activityList}>
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className={styles.activityItem}>
                  <div className={styles.activityIcon}>
                    <Clock size={14} />
                  </div>
                  <div className={styles.activityContent}>
                    <p className={styles.activityText}>
                      <strong>Sarah Chen</strong> updated the design brief for <strong>Nexus Brand Identity</strong>
                    </p>
                    <span className={styles.activityTime}>2 hours ago</span>
                  </div>
                  <ArrowRight size={14} className={styles.activityArrow} />
                </div>
              ))}
            </div>
          </Card>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className={styles.workloadColumn}
        >
          <Card>
            <h3 className="type-h3" style={{ marginBottom: 'var(--space-lg)' }}>Recent AI Insights</h3>
            <div className={styles.aiInsights}>
              <div className={styles.aiCard}>
                <div className={styles.aiCardHeader}>
                  <Sparkles size={16} color="var(--color-ai)" />
                  <span className={styles.aiCardTitle}>Project Health Alert</span>
                </div>
                <p className={styles.aiCardText}>
                  "Vortex Media" project has had no updates in 72 hours. Suggested action: Review blockers with lead designer.
                </p>
                <Badge variant="ai">AI Analysis</Badge>
              </div>

              <div className={styles.aiCard}>
                <div className={styles.aiCardHeader}>
                  <MessageSquare size={16} color="var(--color-ai)" />
                  <span className={styles.aiCardTitle}>Meeting Summary</span>
                </div>
                <p className={styles.aiCardText}>
                  Acme Corp sync completed. Key takeaways: Q3 budget approved, expanding scope for mobile app.
                </p>
                <button className={styles.aiCardAction}>View Full Report</button>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
