import React from 'react';
import { Card } from './Card';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { clsx } from 'clsx';
import styles from './MetricCard.module.css';

interface MetricCardProps {
  label: string;
  value: string | number;
  trend?: number;
  prefix?: string;
  suffix?: string;
}

export const MetricCard: React.FC<MetricCardProps> = ({ label, value, trend, prefix, suffix }) => {
  const isPositive = trend && trend > 0;
  
  return (
    <Card className={styles.metricCard}>
      <span className="type-label" style={{ color: 'var(--color-text-3)' }}>{label}</span>
      <div className={styles.valueRow}>
        <span className={styles.value}>
          {prefix && <span className={styles.prefix}>{prefix}</span>}
          {value}
          {suffix && <span className={styles.suffix}>{suffix}</span>}
        </span>
      </div>
      {trend !== undefined && (
        <div className={clsx(styles.trend, isPositive ? styles.positive : styles.negative)}>
          {isPositive ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
          <span>{Math.abs(trend)}%</span>
          <span className={styles.trendLabel}>vs last month</span>
        </div>
      )}
    </Card>
  );
};
