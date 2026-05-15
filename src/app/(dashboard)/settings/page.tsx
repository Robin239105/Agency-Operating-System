'use client';

import React from 'react';
import { useSession } from 'next-auth/react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { 
  Settings, 
  CreditCard, 
  Shield, 
  Users, 
  Database, 
  Key,
  Check
} from 'lucide-react';
import styles from './Settings.module.css';

export default function SettingsPage() {
  const { data: session } = useSession();
  const userName = session?.user?.name || 'User';
  const userEmail = session?.user?.email || '';
  const userInitial = userName.charAt(0).toUpperCase();

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className="type-h2">System Settings</h1>
        <p className="type-body" style={{ color: 'var(--color-text-3)' }}>
          Manage your account, workspace, and system configurations.
        </p>
      </header>

      <div className={styles.content}>
        <aside className={styles.nav}>
          <button className={styles.navItemActive}><Settings size={16} /> General</button>
          <button className={styles.navItem}><CreditCard size={16} /> Billing</button>
          <button className={styles.navItem}><Users size={16} /> Team</button>
          <button className={styles.navItem}><Shield size={16} /> Security</button>
          <button className={styles.navItem}><Database size={16} /> API & Webhooks</button>
        </aside>

        <div className={styles.panels}>
          <Card className={styles.panelCard}>
            <div className={styles.panelHeader}>
              <h3 className="type-h3">Account</h3>
              <p className="type-small" style={{ color: 'var(--color-text-3)' }}>Your personal account information.</p>
            </div>
            
            <div className={styles.fieldGrid}>
              <Input label="Full Name" defaultValue={userName} />
              <Input label="Email" defaultValue={userEmail} type="email" />
            </div>
            
            <div className={styles.panelActions}>
              <Button variant="primary">Save Changes</Button>
            </div>
          </Card>

          <Card className={styles.panelCard}>
            <div className={styles.panelHeader}>
              <h3 className="type-h3">Workspace</h3>
              <Badge variant="active">Active</Badge>
            </div>
            
            <div className={styles.fieldGrid}>
              <Input label="Agency Name" defaultValue="My Agency" />
              <Input label="Workspace Slug" defaultValue="my-agency" prefix="aos.app/" />
            </div>
            
            <div className={styles.panelActions}>
              <Button variant="primary">Save Changes</Button>
            </div>
          </Card>

          <Card className={styles.panelCard}>
            <div className={styles.panelHeader}>
              <h3 className="type-h3">Current Plan</h3>
              <Badge variant="active">Active</Badge>
            </div>
            
            <div className={styles.planInfo}>
              <div className={styles.planDetails}>
                <h4 className={styles.planName}>Pro</h4>
                <p className={styles.planPrice}>$79<span className={styles.planPeriod}>/month</span></p>
              </div>
              <ul className={styles.planFeatures}>
                <li><Check size={14} color="var(--color-success)" /> Unlimited Projects</li>
                <li><Check size={14} color="var(--color-success)" /> 20 Team Members</li>
                <li><Check size={14} color="var(--color-success)" /> Priority Support</li>
              </ul>
            </div>
            
            <div className={styles.panelActions}>
              <Button variant="secondary">Manage Subscription</Button>
            </div>
          </Card>

          <Card className={styles.panelCard}>
            <div className={styles.panelHeader}>
              <h3 className="type-h3">API Keys</h3>
              <p className="type-small" style={{ color: 'var(--color-text-3)' }}>Connect AOS to your workflow.</p>
            </div>
            
            <div className={styles.apiKey}>
              <div className={styles.keyInfo}>
                <Key size={16} color="var(--color-text-3)" />
                <code className="type-mono">sk_live_••••••••••••••••</code>
              </div>
              <Button variant="ghost" size="sm">Reveal</Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}