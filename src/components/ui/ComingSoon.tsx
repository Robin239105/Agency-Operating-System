'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Construction } from 'lucide-react';
import { Card } from '@/components/ui/Card';

interface ComingSoonProps {
  title: string;
}

export const ComingSoon: React.FC<ComingSoonProps> = ({ title }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '60vh',
        textAlign: 'center'
      }}
    >
      <div style={{
        width: '64px',
        height: '64px',
        background: 'rgba(139, 92, 246, 0.1)',
        color: 'var(--color-ai)',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 'var(--space-xl)',
        boxShadow: 'var(--shadow-ai)'
      }}>
        <Sparkles size={32} />
      </div>
      <h1 className="type-h2" style={{ marginBottom: 'var(--space-md)' }}>{title}</h1>
      <p className="type-body" style={{ color: 'var(--color-text-3)', maxWidth: '400px' }}>
        We're precision-engineering this module to meet AOS standards. 
        Expected arrival: Q3 2024.
      </p>
      
      <div style={{ marginTop: 'var(--space-2xl)', display: 'flex', gap: 'var(--space-md)' }}>
        <Card background="elevated" style={{ padding: 'var(--space-md) var(--space-lg)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)' }}>
            <Construction size={18} color="var(--color-warning)" />
            <span className="type-label" style={{ color: 'var(--color-text-2)' }}>Under Construction</span>
          </div>
        </Card>
      </div>
    </motion.div>
  );
};
