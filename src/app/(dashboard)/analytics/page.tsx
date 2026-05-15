'use client';

import React from 'react';
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
  Download
} from 'lucide-react';
import styles from './Analytics.module.css';

export default function AnalyticsPage() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.titleGroup}>
          <h1 className="type-h2">Agency Analytics</h1>
          <p className="type-body" style={{ color: 'var(--color-text-3)' }}>
            Real-time performance metrics and revenue forecasting.
          </p>
        </div>
        <div className={styles.headerActions}>
          <Button variant="secondary" leftIcon={<Calendar size={16} />}>Last 12 Months</Button>
          <Button variant="ghost" leftIcon={<Download size={16} />}>Export Report</Button>
        </div>
      </header>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={styles.mainChartCard}
      >
        <Card>
          <div className={styles.chartHeader}>
            <div className={styles.chartTitle}>
              <h3 className="type-h3">Monthly Recurring Revenue</h3>
              <span className={styles.chartSub}>Growth trend for fiscal year 2024</span>
            </div>
            <div className={styles.chartLegend}>
              <div className={styles.legendItem}><span className={styles.dot} style={{ background: 'var(--color-accent)' }} /> Revenue</div>
              <div className={styles.legendItem}><span className={styles.dot} style={{ background: 'var(--color-text-3)' }} /> Target</div>
            </div>
          </div>
          
          <div className={styles.chartPlaceholder}>
            {/* Simple SVG Chart Mockup */}
            <svg width="100%" height="240" viewBox="0 0 800 240" fill="none">
              <path d="M0 200C100 180 150 140 200 150C250 160 300 100 400 80C500 60 600 40 800 20" stroke="var(--color-accent)" strokeWidth="3" strokeLinecap="round" />
              <path d="M0 200C100 180 150 140 200 150C250 160 300 100 400 80C500 60 600 40 800 20V240H0V200Z" fill="url(#chartGradient)" />
              <defs>
                <linearGradient id="chartGradient" x1="400" y1="20" x2="400" y2="240" gradientUnits="userSpaceOnUse">
                  <stop stopColor="var(--color-accent)" stopOpacity="0.1" />
                  <stop offset="1" stopColor="var(--color-accent)" stopOpacity="0" />
                </linearGradient>
              </defs>
              {/* Grid lines */}
              {[0, 60, 120, 180, 240].map(y => (
                <line key={y} x1="0" y1={y} x2="800" y2={y} stroke="var(--color-border)" strokeDasharray="4 4" />
              ))}
            </svg>
            <div className={styles.chartXAxis}>
              {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map(m => (
                <span key={m}>{m}</span>
              ))}
            </div>
          </div>
        </Card>
      </motion.div>

      <div className={styles.metricsGrid}>
        <MetricCard label="ARR" value="1.82" prefix="$" suffix="M" trend={15.2} />
        <MetricCard label="Churn Rate" value="1.4" suffix="%" trend={-0.8} />
        <MetricCard label="LTV" value="42.5" prefix="$" suffix="k" trend={4.2} />
        <MetricCard label="Avg. Deal Size" value="8.4" prefix="$" suffix="k" trend={2.1} />
      </div>

      <div className={styles.bottomGrid}>
        <Card className={styles.heatmapCard}>
          <h3 className="type-label" style={{ marginBottom: 'var(--space-md)' }}>Team Activity Heatmap</h3>
          <div className={styles.heatmap}>
            {Array.from({ length: 7 * 24 }).map((_, i) => (
              <div 
                key={i} 
                className={styles.heatCell} 
                style={{ opacity: Math.random() * 0.8 + 0.1 }} 
              />
            ))}
          </div>
        </Card>

        <Card className={styles.distributionCard}>
          <h3 className="type-label" style={{ marginBottom: 'var(--space-md)' }}>Revenue by Client</h3>
          <div className={styles.distribution}>
            <div className={styles.distItem}>
              <span className={styles.distLabel}>Nexus Digital</span>
              <div className={styles.distBarWrapper}>
                <div className={styles.distBar} style={{ width: '45%', background: 'var(--color-accent)' }} />
              </div>
              <span className={styles.distValue}>45%</span>
            </div>
            <div className={styles.distItem}>
              <span className={styles.distLabel}>Vortex Media</span>
              <div className={styles.distBarWrapper}>
                <div className={styles.distBar} style={{ width: '30%', background: 'var(--color-ai)' }} />
              </div>
              <span className={styles.distValue}>30%</span>
            </div>
            <div className={styles.distItem}>
              <span className={styles.distLabel}>Others</span>
              <div className={styles.distBarWrapper}>
                <div className={styles.distBar} style={{ width: '25%', background: 'var(--color-text-3)' }} />
              </div>
              <span className={styles.distValue}>25%</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
