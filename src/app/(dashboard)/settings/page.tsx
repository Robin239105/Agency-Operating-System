'use client';

import React from 'react';
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
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className="type-h2">System Settings</h1>
        <p className="type-body" style={{ color: 'var(--color-text-3)' }}>
          Manage your agency workspace, billing, and system configurations.
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
              <h3 className="type-h3">Workspace Identity</h3>
              <p className="type-small" style={{ color: 'var(--color-text-3)' }}>Update your agency branding and global settings.</p>
            </div>
            
            <div className={styles.fieldGrid}>
              <Input label="Agency Name" defaultValue="DesignFlow Studio" />
              <Input label="Workspace Slug" defaultValue="designflow" prefix="aos.app/" />
              <div className={styles.fieldGroup}>
                <label className="type-label" style={{ color: 'var(--color-text-3)' }}>Workspace Logo</label>
                <div className={styles.logoUpload}>
                  <div className={styles.logoPreview}>D</div>
                  <Button variant="secondary" size="sm">Change Logo</Button>
                </div>
              </div>
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
                <h4 className={styles.planName}>Enterprise Cinematic</h4>
                <p className={styles.planPrice}>$499<span className={styles.planPeriod}>/month</span></p>
              </div>
              <ul className={styles.planFeatures}>
                <li><Check size={14} color="var(--color-success)" /> Unlimited AI Workflow Credits</li>
                <li><Check size={14} color="var(--color-success)" /> Multi-tenant Client Portals</li>
                <li><Check size={14} color="var(--color-success)" /> White-label Reporting</li>
              </ul>
            </div>
            
            <div className={styles.panelActions}>
              <Button variant="secondary">Manage Subscription</Button>
              <Button variant="ghost">View Billing History</Button>
            </div>
          </Card>

          <Card className={styles.panelCard}>
            <div className={styles.panelHeader}>
              <h3 className="type-h3">API Keys</h3>
              <p className="type-small" style={{ color: 'var(--color-text-3)' }}>Connect AOS to your existing workflow via our API.</p>
            </div>
            
            <div className={styles.apiKey}>
              <div className={styles.keyInfo}>
                <Key size={16} color="var(--color-text-3)" />
                <code className="type-mono">sk_live_••••••••••••••••••••••••</code>
              </div>
              <Button variant="ghost" size="sm">Reveal</Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
