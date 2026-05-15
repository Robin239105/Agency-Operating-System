import React from 'react';
import { clsx } from 'clsx';
import styles from './Badge.module.css';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'active' | 'progress' | 'review' | 'blocked' | 'ai' | 'default' | 'success' | 'warning' | 'danger' | 'neutral';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ children, variant = 'default', className }) => {
  return (
    <span className={clsx(styles.badge, styles[variant], className)}>
      {variant === 'ai' && <span className={styles.dot} />}
      {children}
    </span>
  );
};
