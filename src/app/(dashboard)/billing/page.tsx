'use client';

import React from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { CreditCard, Check } from 'lucide-react';
import styles from './Billing.module.css';

export default function BillingPage() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.titleGroup}>
          <h1 className="type-h2">Billing & Plans</h1>
          <p className="type-body" style={{ color: 'var(--color-text-3)' }}>
            Manage your subscription and billing.
          </p>
        </div>
      </header>

      <Card className={styles.paymentCard}>
        <h3 className="type-h3" style={{ marginBottom: 'var(--space-lg)' }}>Payment Method</h3>
        <div className={styles.paymentMethod}>
          <div className={styles.cardIcon}><CreditCard size={24} /></div>
          <div className={styles.cardInfo}>
            <span className={styles.cardNumber}>No card on file</span>
          </div>
        </div>
        <div style={{ marginTop: 'var(--space-lg)' }}>
          <Button variant="primary">Add Payment Method</Button>
        </div>
      </Card>
    </div>
  );
}