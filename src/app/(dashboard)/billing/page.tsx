'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { 
  CreditCard, 
  Check, 
  Zap,
  Shield,
  Clock,
  ChevronRight,
  Download,
  HelpCircle
} from 'lucide-react';
import styles from './Billing.module.css';

const plans = [
  {
    id: 'starter',
    name: 'Starter',
    price: 29,
    period: 'month',
    description: 'Perfect for small teams and startups',
    features: ['5 team members', '10 projects', '5GB storage', 'Basic analytics', 'Email support'],
    current: false,
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 79,
    period: 'month',
    description: 'For growing agencies that need more',
    features: ['20 team members', 'Unlimited projects', '50GB storage', 'Advanced analytics', 'Priority support', 'API access', 'Custom integrations'],
    current: true,
    popular: true,
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 199,
    period: 'month',
    description: 'For large teams with advanced needs',
    features: ['Unlimited members', 'Unlimited storage', 'Enterprise analytics', '24/7 dedicated support', 'Custom contracts', 'SSO & SAML', 'Audit logs'],
    current: false,
  },
];

export default function BillingPage() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.titleGroup}>
          <h1 className="type-h2">Billing & Plans</h1>
          <p className="type-body" style={{ color: 'var(--color-text-3)' }}>
            Manage your subscription and billing preferences.
          </p>
        </div>
      </header>

      <div className={styles.usageSection}>
        <Card className={styles.usageCard}>
          <div className={styles.usageHeader}>
            <h3 className="type-h3">Current Usage</h3>
            <Badge variant="success">Pro Plan</Badge>
          </div>
          <div className={styles.usageGrid}>
            <div className={styles.usageItem}>
              <div className={styles.usageLabel}>
                <span>Team Members</span>
                <span className={styles.usageValue}>12 / 20</span>
              </div>
              <div className={styles.usageBar}>
                <div className={styles.usageProgress} style={{ width: '60%' }} />
              </div>
            </div>
            <div className={styles.usageItem}>
              <div className={styles.usageLabel}>
                <span>Storage</span>
                <span className={styles.usageValue}>24.5 GB / 50 GB</span>
              </div>
              <div className={styles.usageBar}>
                <div className={styles.usageProgress} style={{ width: '49%' }} />
              </div>
            </div>
            <div className={styles.usageItem}>
              <div className={styles.usageLabel}>
                <span>Projects</span>
                <span className={styles.usageValue}>8 / Unlimited</span>
              </div>
              <div className={styles.usageBar}>
                <div className={styles.usageProgress} style={{ width: '20%' }} />
              </div>
            </div>
          </div>
        </Card>
      </div>

      <div className={styles.planSection}>
        <div className={styles.planHeader}>
          <h2 className="type-h3">Available Plans</h2>
          <div className={styles.billingToggle}>
            <button 
              className={billingCycle === 'monthly' ? styles.activeToggle : ''}
              onClick={() => setBillingCycle('monthly')}
            >
              Monthly
            </button>
            <button 
              className={billingCycle === 'yearly' ? styles.activeToggle : ''}
              onClick={() => setBillingCycle('yearly')}
            >
              Yearly <span className={styles.saveBadge}>Save 20%</span>
            </button>
          </div>
        </div>

        <div className={styles.plansGrid}>
          {plans.map((plan, idx) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className={`${styles.planCard} ${plan.current ? styles.currentPlan : ''} ${plan.popular ? styles.popularPlan : ''}`}
            >
              {plan.popular && <span className={styles.popularBadge}>Most Popular</span>}
              <div className={styles.planInfo}>
                <h3 className={styles.planName}>{plan.name}</h3>
                <p className={styles.planDesc}>{plan.description}</p>
              </div>
              <div className={styles.planPricing}>
                <span className={styles.planPrice}>${billingCycle === 'yearly' ? Math.floor(plan.price * 0.8) : plan.price}</span>
                <span className={styles.planPeriod}>/{plan.period}</span>
              </div>
              <ul className={styles.planFeatures}>
                {plan.features.map((feature) => (
                  <li key={feature} className={styles.planFeature}>
                    <Check size={14} className={styles.checkIcon} />
                    {feature}
                  </li>
                ))}
              </ul>
              <div className={styles.planAction}>
                {plan.current ? (
                  <Button variant="secondary" disabled>Current Plan</Button>
                ) : (
                  <Button variant={plan.popular ? 'primary' : 'secondary'}>
                    {plan.price > 79 ? 'Contact Sales' : 'Upgrade'}
                  </Button>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className={styles.bottomSection}>
        <Card className={styles.paymentCard}>
          <div className={styles.paymentHeader}>
            <h3 className="type-h3">Payment Method</h3>
            <Button variant="ghost" size="sm">Update</Button>
          </div>
          <div className={styles.paymentMethod}>
            <div className={styles.cardIcon}><CreditCard size={24} /></div>
            <div className={styles.cardInfo}>
              <span className={styles.cardNumber}>•••• •••• •••• 4242</span>
              <span className={styles.cardExpiry}>Expires 12/25</span>
            </div>
            <Badge variant="neutral">Default</Badge>
          </div>
        </Card>

        <Card className={styles.billingInfoCard}>
          <div className={styles.billingHeader}>
            <h3 className="type-h3">Billing Information</h3>
            <Button variant="ghost" size="sm">Edit</Button>
          </div>
          <div className={styles.billingDetails}>
            <div className={styles.billingRow}>
              <span className={styles.billingLabel}>Next invoice</span>
              <span className={styles.billingValue}>June 15, 2024</span>
            </div>
            <div className={styles.billingRow}>
              <span className={styles.billingLabel}>Amount</span>
              <span className={styles.billingValue}>$79.00</span>
            </div>
            <div className={styles.billingRow}>
              <span className={styles.billingLabel}>Payment method</span>
              <span className={styles.billingValue}>Visa ending in 4242</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}