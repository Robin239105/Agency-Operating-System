'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { MetricCard } from '@/components/ui/MetricCard';
import { 
  Play, 
  Pause, 
  Square, 
  Clock, 
  Calendar,
  ChevronRight,
  Timer,
  BarChart3,
  Loader2
} from 'lucide-react';
import styles from './Time.module.css';

interface TimeEntry {
  id: string;
  description?: string;
  duration: number;
  startTime: string;
  endTime?: string;
  billable: boolean;
  project?: { name: string };
}

export default function TimePage() {
  const [entries, setEntries] = useState<TimeEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [selectedProject, setSelectedProject] = useState('General');

  useEffect(() => {
    fetchEntries();
  }, []);

  const fetchEntries = async () => {
    try {
      const res = await fetch('/api/time-entries');
      const data = await res.json();
      if (data.timeEntries) {
        setEntries(data.timeEntries);
      }
    } catch (err) {
      console.error('Failed to fetch entries:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setTimerSeconds(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning]);

  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const formatDuration = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    return hrs > 0 ? `${hrs}h ${mins}m` : `${mins}m`;
  };

  const totalToday = entries
    .filter(e => new Date(e.startTime).toDateString() === new Date().toDateString())
    .reduce((acc, e) => acc + (e.duration || 0), 0);

  const totalWeek = entries.reduce((acc, e) => acc + (e.duration || 0), 0);
  const billablePercent = entries.length > 0 ? Math.round((entries.filter(e => e.billable).length / entries.length) * 100) : 0;

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
          <h1 className="type-h2">Time Tracking</h1>
          <p className="type-body" style={{ color: 'var(--color-text-3)' }}>
            Track time across projects and generate billing reports.
          </p>
        </div>
      </header>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={styles.timerSection}
      >
        <Card className={styles.timerCard}>
          <div className={styles.timerHeader}>
            <div className={styles.projectSelect}>
              <span className={styles.projectLabel}>Project</span>
              <select 
                className={styles.projectDropdown}
                value={selectedProject}
                onChange={(e) => setSelectedProject(e.target.value)}
              >
                <option>General</option>
                <option>Design Work</option>
                <option>Development</option>
              </select>
            </div>
            <div className={styles.timerDisplay}>
              <Timer size={24} className={styles.timerIcon} />
              <span className={styles.timerTime}>{formatTime(timerSeconds)}</span>
            </div>
          </div>
          
          <div className={styles.taskInputWrapper}>
            <input 
              type="text" 
              placeholder="What are you working on?" 
              className={styles.taskInput}
            />
          </div>

          <div className={styles.timerActions}>
            {isTimerRunning ? (
              <div className={styles.runningActions}>
                <Button 
                  variant="secondary" 
                  leftIcon={<Pause size={18} />}
                  onClick={() => setIsTimerRunning(false)}
                >
                  Pause
                </Button>
                <Button 
                  variant="primary"
                  leftIcon={<Square size={18} />}
                  onClick={() => { setIsTimerRunning(false); setTimerSeconds(0); }}
                >
                  Stop & Save
                </Button>
              </div>
            ) : (
              <Button 
                variant="primary"
                size="lg"
                leftIcon={<Play size={18} />}
                onClick={() => setIsTimerRunning(true)}
              >
                Start Timer
              </Button>
            )}
          </div>
        </Card>
      </motion.div>

      <div className={styles.metricsRow}>
        <MetricCard label="Today" value={(totalToday / 3600).toFixed(1)} suffix="h" />
        <MetricCard label="This Week" value={(totalWeek / 3600).toFixed(1)} suffix="h" />
        <MetricCard label="Billable %" value={billablePercent.toString()} suffix="%" />
        <MetricCard label="Entries" value={entries.length.toString()} />
      </div>

      <div className={styles.entriesSection}>
        <div className={styles.entriesHeader}>
          <h2 className="type-h3">Recent Entries</h2>
          <Button variant="ghost" rightIcon={<ChevronRight size={16} />}>View All</Button>
        </div>

        <div className={styles.entriesList}>
          {entries.slice(0, 5).map((entry, idx) => (
            <motion.div
              key={entry.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              <Card className={styles.entryCard} hoverable>
                <div className={styles.entryMain}>
                  <div className={styles.entryProject}>{entry.project?.name || 'General'}</div>
                  <div className={styles.entryTask}>{entry.description || 'No description'}</div>
                </div>
                <div className={styles.entryMeta}>
                  <span className={styles.entryDuration}>{formatDuration(entry.duration)}</span>
                  <span className={styles.entryDate}>{new Date(entry.startTime).toLocaleDateString()}</span>
                  {entry.billable && <Badge variant="success">Billable</Badge>}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}