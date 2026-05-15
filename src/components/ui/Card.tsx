import React from 'react';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';
import styles from './Card.module.css';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hoverable?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  background?: 'surface' | 'elevated' | 'canvas';
  style?: React.CSSProperties;
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({ 
  children, 
  className, 
  hoverable = false, 
  padding = 'md',
  background = 'surface',
  style,
  onClick 
}) => {
  return (
    <motion.div
      whileHover={hoverable ? { translateY: -4, borderColor: 'var(--color-text-3)', boxShadow: 'var(--shadow-mid)' } : {}}
      className={clsx(
        styles.card, 
        styles[`p-${padding}`], 
        styles[`bg-${background}`],
        { [styles.hoverable]: hoverable },
        className
      )}
      style={style}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
};
