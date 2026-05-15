'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useSession } from 'next-auth/react';
import { MetricCard } from '@/components/ui/MetricCard';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Sparkles, Clock, MessageSquare, Loader2 } from 'lucide-react';
import styles from './Dashboard.module.css';

interface DashboardData {
  projects: number;
  clients: number;
  tasks: number;
  teamMembers: number;
  recentEntries: number;
}

export default function Dashboard() {
  const { data: session } = useSession();
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [projectsRes, tasksRes, clientsRes, teamRes, timeRes] = await Promise.all([
        fetch('/api/projects'),
        fetch('/api/tasks'),
        fetch('/api/clients'),
        fetch('/api/team'),
        fetch('/api/time-entries'),
      ]);

      const projectsData = await projectsRes.json();
      const tasksData = await tasksRes.json();
      const clientsData = await clientsRes.json();
      const teamData = await teamRes.json();
      const timeData = await timeRes.json();

      setData({
        projects: projectsData.projects?.length || 0,
        clients: clientsData.clients?.length || 0,
        tasks: tasksData.tasks?.length || 0,
        teamMembers: teamData.members?.length || 1,
        recentEntries: timeData.timeEntries?.length || 0,
      });
    } catch (err) {
      console.error('Failed to fetch dashboard data:', err);
      setData({ projects: 0, clients: 0, tasks: 0, teamMembers: 1, recentEntries: 0 });
    } finally {
      setLoading(false);
    }
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
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
        <motion.div variants={item}>
          <MetricCard label="Active Projects" value={data?.projects.toString() || '0'} />
        </motion.div>
        <motion.div variants={item}>
          <MetricCard label="Total Tasks" value={data?.tasks.toString() || '0'} />
        </motion.div>
        <motion.div variants={item}>
          <MetricCard label="Team Size" value={data?.teamMembers.toString() || '1'} />
        </motion.div>
        <motion.div variants={item}>
          <MetricCard label="Time Entries" value={data?.recentEntries.toString() || '0'} />
        </motion.div>
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
              <h3 className="type-h3">Recent Activity</h3>
              <Badge variant="default">Live</Badge>
            </div>
            <div className={styles.activityList}>
              {data && data.projects > 0 ? (
                <div className={styles.activityItem}>
                  <div className={styles.activityIcon}>
                    <Clock size={14} />
                  </div>
                  <div className={styles.activityContent}>
                    <p className={styles.activityText}>
                      <strong>You</strong> have {data.projects} active project{data.projects !== 1 ? 's' : ''}
                    </p>
                    <span className={styles.activityTime}>Now</span>
                  </div>
                </div>
              ) : (
                <div className={styles.activityItem}>
                  <div className={styles.activityIcon}>
                    <Sparkles size={14} />
                  </div>
                  <div className={styles.activityContent}>
                    <p className={styles.activityText}>
                      <strong>Welcome!</strong> Create your first project to get started
                    </p>
                    <span className={styles.activityTime}>Now</span>
                  </div>
                </div>
              )}
              {data && data.tasks > 0 && (
                <div className={styles.activityItem}>
                  <div className={styles.activityIcon}>
                    <MessageSquare size={14} />
                  </div>
                  <div className={styles.activityContent}>
                    <p className={styles.activityText}>
                      <strong>{data.tasks}</strong> task{data.tasks !== 1 ? 's are' : ' is'} assigned to you
                    </p>
                    <span className={styles.activityTime}>Now</span>
                  </div>
                </div>
              )}
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
            <h3 className="type-h3" style={{ marginBottom: 'var(--space-lg)' }}>Quick Start</h3>
            <div className={styles.aiInsights}>
              {data && data.projects === 0 && (
                <div className={styles.aiCard}>
                  <div className={styles.aiCardHeader}>
                    <Sparkles size={16} color="var(--color-ai)" />
                    <span className={styles.aiCardTitle}>Get Started</span>
                  </div>
                  <p className={styles.aiCardText}>
                    Create a project and start tracking your work.
                  </p>
                  <Badge variant="ai">Tip</Badge>
                </div>
              )}
              {data && data.tasks === 0 && data.projects > 0 && (
                <div className={styles.aiCard}>
                  <div className={styles.aiCardHeader}>
                    <MessageSquare size={16} color="var(--color-ai)" />
                    <span className={styles.aiCardTitle}>Next Step</span>
                  </div>
                  <p className={styles.aiCardText}>
                    Add tasks to your projects to start tracking progress.
                  </p>
                  <Badge variant="ai">Tip</Badge>
                </div>
              )}
              {data && data.tasks > 0 && (
                <div className={styles.aiCard}>
                  <div className={styles.aiCardHeader}>
                    <Sparkles size={16} color="var(--color-ai)" />
                    <span className={styles.aiCardTitle}>Status Update</span>
                  </div>
                  <p className={styles.aiCardText}>
                    You have {data.tasks} task{data.tasks !== 1 ? 's' : ''} across {data.projects} project{data.projects !== 1 ? 's' : ''}.
                  </p>
                  <Badge variant="ai">Summary</Badge>
                </div>
              )}
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}