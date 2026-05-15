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
  TrendingUp
} from 'lucide-react';
import styles from './Time.module.css';

interface TimeEntry {
  id: string;
  project: string;
  task: string;
  duration: string;
  date: string;
  billable: boolean;
}

const mockEntries: TimeEntry[] = [
  { id: '1', project: 'Nexus Brand', task: 'Logo design iteration', duration: '2h 45m', date: 'Today', billable: true },
  { id: '2', project: 'Vortex Website', task: 'Homepage wireframe', duration: '1h 30m', date: 'Today', billable: true },
  { id: '3', project: 'Internal', task: 'Team meeting', duration: '45m', date: 'Today', billable: false },
  { id: '4', project: 'Acme Marketing', task: 'Email campaign setup', duration: '3h 15m', date: 'Yesterday', billable: true },
  { id: '5', project: 'Starlight App', task: 'UI review session', duration: '2h', date: 'Yesterday', billable: true },
];

export default function TimePage() {
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [selectedProject, setSelectedProject] = useState('Nexus Brand');

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

  const formatHours = (str: string) => {
    const match = str.match(/(\d+)h\s*(\d+)?m?/);
    if (match) {
      const hours = parseInt(match[1] || '0') + (parseInt(match[2] || '0') / 60);
      return hours.toFixed(1);
    }
    return '0';
  };

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
                <option>Nexus Brand</option>
                <option>Vortex Website</option>
                <option>Starlight App</option>
                <option>Acme Marketing</option>
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
        <MetricCard label="Today" value="4.2" suffix="h" trend={12} />
        <MetricCard label="This Week" value="32.5" suffix="h" trend={8} />
        <MetricCard label="Billable %" value="87" suffix="%" />
        <MetricCard label="Revenue" value="2.4" prefix="$" suffix="k" trend={15} />
      </div>

      <div className={styles.entriesSection}>
        <div className={styles.entriesHeader}>
          <h2 className="type-h3">Recent Entries</h2>
          <Button variant="ghost" rightIcon={<ChevronRight size={16} />}>View All</Button>
        </div>

        <div className={styles.entriesList}>
          {mockEntries.map((entry, idx) => (
            <motion.div
              key={entry.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              <Card className={styles.entryCard} hoverable>
                <div className={styles.entryMain}>
                  <div className={styles.entryProject}>{entry.project}</div>
                  <div className={styles.entryTask}>{entry.task}</div>
                </div>
                <div className={styles.entryMeta}>
                  <span className={styles.entryDuration}>{entry.duration}</span>
                  <span className={styles.entryDate}>{entry.date}</span>
                  {entry.billable && <Badge variant="success">Billable</Badge>}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      <div className={styles.bottomGrid}>
        <Card className={styles.weeklyCard}>
          <div className={styles.chartHeader}>
            <h3 className="type-label">Weekly Overview</h3>
          </div>
          <div className={styles.barChart}>
            {[
              { day: 'Mon', hours: 6.5 },
              { day: 'Tue', hours: 8 },
              { day: 'Wed', hours: 7.25 },
              { day: 'Thu', hours: 5.5 },
              { day: 'Fri', hours: 4.75 },
              { day: 'Sat', hours: 2 },
              { day: 'Sun', hours: 0 },
            ].map((item, i) => (
              <div key={item.day} className={styles.barWrapper}>
                <div className={styles.bar} style={{ height: `${(item.hours / 10) * 100}%` }} />
                <span className={styles.barLabel}>{item.day}</span>
                <span className={styles.barValue}>{item.hours}h</span>
              </div>
            ))}
          </div>
        </Card>

        <Card className={styles.projectsCard}>
          <div className={styles.chartHeader}>
            <h3 className="type-label">Time by Project</h3>
          </div>
          <div className={styles.projectList}>
            {[
              { name: 'Nexus Brand', hours: 12.5, color: 'var(--color-accent)' },
              { name: 'Vortex Website', hours: 9, color: 'var(--color-ai)' },
              { name: 'Starlight App', hours: 6, color: 'var(--color-warning)' },
              { name: 'Acme Marketing', hours: 5, color: 'var(--color-text-3)' },
            ].map((project, i) => (
              <div key={project.name} className={styles.projectRow}>
                <div className={styles.projectInfo}>
                  <span className={styles.projectDot} style={{ background: project.color }} />
                  <span className={styles.projectName}>{project.name}</span>
                </div>
                <span className={styles.projectHours}>{project.hours}h</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}