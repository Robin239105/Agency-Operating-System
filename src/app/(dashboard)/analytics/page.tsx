'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MetricCard } from '@/components/ui/MetricCard';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  DollarSign, 
  Calendar,
  Download,
  Loader2
} from 'lucide-react';
import styles from './Analytics.module.css';

export default function AnalyticsPage() {
  const [projects, setProjects] = useState(0);
  const [tasks, setTasks] = useState(0);
  const [members, setMembers] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [pRes, tRes, mRes] = await Promise.all([
        fetch('/api/projects'),
        fetch('/api/tasks'),
        fetch('/api/team'),
      ]);
      const pData = await pRes.json();
      const tData = await tRes.json();
      const mData = await mRes.json();
      setProjects(pData.projects?.length || 0);
      setTasks(tData.tasks?.length || 0);
      setMembers(mData.members?.length || 1);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
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
          <h1 className="type-h2">Analytics</h1>
          <p className="type-body" style={{ color: 'var(--color-text-3)' }}>
            Real-time performance metrics.
          </p>
        </div>
        <div className={styles.headerActions}>
          <Button variant="ghost" leftIcon={<Download size={16} />}>Export</Button>
        </div>
      </header>

      <div className={styles.metricsGrid}>
        <MetricCard label="Active Projects" value={projects.toString()} />
        <MetricCard label="Total Tasks" value={tasks.toString()} />
        <MetricCard label="Team Members" value={members.toString()} />
      </div>

      <div className={styles.metricsGrid}>
        <Card className={styles.mainChartCard}>
          <div className={styles.chartHeader}>
            <div className={styles.chartTitle}>
              <h3 className="type-h3">Projects Overview</h3>
              <span className={styles.chartSub}>Current project distribution</span>
            </div>
          </div>
          <div style={{ padding: 'var(--space-xl)', textAlign: 'center', color: 'var(--color-text-3)' }}>
            {projects > 0 ? `${projects} active project${projects > 1 ? 's' : ''}` : 'No projects yet'}
          </div>
        </Card>
      </div>
    </div>
  );
}