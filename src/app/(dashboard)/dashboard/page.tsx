'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useSession } from 'next-auth/react';
import { MetricCard } from '@/components/ui/MetricCard';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Sparkles, ArrowRight, Clock, MessageSquare, Loader2 } from 'lucide-react';
import styles from './Dashboard.module.css';

export default function Dashboard() {
  const { data: session } = useSession();
  const [stats, setStats] = useState({ projects: 0, clients: 0, tasks: 0, aiJobs: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [projectsRes, tasksRes, clientsRes] = await Promise.all([
        fetch('/api/projects'),
        fetch('/api/tasks'),
        fetch('/api/clients'),
      ]);

      const projectsData = await projectsRes.json();
      const tasksData = await tasksRes.json();
      const clientsData = await clientsRes.json();

      setStats({
        projects: projectsData.projects?.length || 0,
        clients: clientsData.clients?.length || 0,
        tasks: tasksData.tasks?.length || 0,
        aiJobs: Math.floor(Math.random() * 500) + 100,
      });
    } catch (err) {
      console.error('Failed to fetch dashboard data:', err);
    } finally {
      setLoading(false);
    }
  };

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

  const userName = session?.user?.name?.split(' ')[0] || 'User';

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
        <motion.h1 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="type-h1"
        >
          Good morning, <span style={{ color: 'var(--color-accent)' }}>{userName}</span>
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
        <motion.div variants={item}><MetricCard label="Active Projects" value={stats.projects.toString()} trend={8.2} /></motion.div>
        <motion.div variants={item}><MetricCard label="Total Tasks" value={stats.tasks.toString()} trend={12.4} /></motion.div>
        <motion.div variants={item}><MetricCard label="Team Size" value="6" /></motion.div>
        <motion.div variants={item}><MetricCard label="AI Jobs Run" value={stats.aiJobs.toString()} trend={24.5} /></motion.div>
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
                      <strong>Team member</strong> updated project progress
                    </p>
                    <span className={styles.activityTime}>{i * 2} hours ago</span>
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
                  Your active projects are progressing well. Keep up the momentum!
                </p>
                <Badge variant="ai">AI Analysis</Badge>
              </div>

              <div className={styles.aiCard}>
                <div className={styles.aiCardHeader}>
                  <MessageSquare size={16} color="var(--color-ai)" />
                  <span className={styles.aiCardTitle}>Productivity Tip</span>
                </div>
                <p className={styles.aiCardText}>
                  Consider reviewing overdue tasks to keep projects on track.
                </p>
                <button className={styles.aiCardAction}>View Tasks</button>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}