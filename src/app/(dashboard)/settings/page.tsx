'use client';

import React, { useState } from 'react';
import { useSession } from 'next-auth/react';
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
  Check,
  Loader2,
  CheckCircle2
} from 'lucide-react';
import styles from './Settings.module.css';

export default function SettingsPage() {
  const { data: session } = useSession();
  const [name, setName] = useState(session?.user?.name || '');
  const [email, setEmail] = useState(session?.user?.email || '');
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    setSaved(false);
    try {
      const res = await fetch('/api/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email }),
      });
      if (res.ok) {
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
      }
    } catch (err) {
      console.error('Failed to save:', err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className="type-h2">System Settings</h1>
        <p className="type-body" style={{ color: 'var(--color-text-3)' }}>
          Manage your account and workspace.
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
              <Input 
                label="Full Name" 
                value={name} 
                onChange={(e) => setName(e.target.value)}
              />
              <Input 
                label="Email" 
                value={email} 
                type="email" 
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            
            <div className={styles.panelActions}>
              {saved && <span style={{ color: 'var(--color-success)', fontSize: 13, display: 'flex', alignItems: 'center', gap: 4 }}><CheckCircle2 size={14} /> Saved</span>}
              <Button variant="primary" onClick={handleSave} disabled={saving}>
                {saving ? <Loader2 size={16} /> : 'Save Changes'}
              </Button>
            </div>
          </Card>

          <Card className={styles.panelCard}>
            <div className={styles.panelHeader}>
              <h3 className="type-h3">Current Plan</h3>
              <Badge variant="active">Active</Badge>
            </div>
            <div className={styles.planInfo}>
              <div className={styles.planDetails}>
                <h4 className={styles.planName}>Free</h4>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}