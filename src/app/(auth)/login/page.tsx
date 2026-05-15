'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Sparkles, Mail, Lock } from 'lucide-react';
import Link from 'next/link';
import styles from './Auth.module.css';

export default function LoginPage() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className={styles.authCardWrapper}
    >
      <Card className={styles.authCard}>
        <div className={styles.header}>
          <div className={styles.logo}>A</div>
          <h2 className="type-h2">Welcome Back</h2>
          <p className="type-body" style={{ color: 'var(--color-text-3)' }}>
            Enter your credentials to access the system.
          </p>
        </div>

        <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
          <Input 
            label="Email Address" 
            placeholder="name@agency.com" 
            type="email" 
            icon={<Mail size={16} />}
          />
          <Input 
            label="Password" 
            placeholder="••••••••" 
            type="password" 
            icon={<Lock size={16} />}
          />
          
          <div className={styles.actions}>
            <Link href="/forgot-password" className={styles.forgotPass}>
              Forgot password?
            </Link>
          </div>

          <Link href="/dashboard" style={{ width: '100%' }}>
            <Button variant="primary" style={{ width: '100%' }}>
              Sign In to AOS
            </Button>
          </Link>

          <div className={styles.divider}>
            <span>OR</span>
          </div>

          <Button variant="ai" style={{ width: '100%' }} leftIcon={<Sparkles size={16} />}>
            Sign in with SSO
          </Button>
        </form>

        <p className={styles.footer}>
          Don't have an account? <Link href="/register">Create Workspace</Link>
        </p>
      </Card>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className={styles.systemStatus}
      >
        <span className={styles.statusDot} />
        System Operational • v1.0.4
      </motion.div>
    </motion.div>
  );
}
