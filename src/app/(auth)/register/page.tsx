'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Building2, Mail, Lock, User } from 'lucide-react';
import Link from 'next/link';
import styles from '../login/Auth.module.css';

export default function RegisterPage() {
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
          <h2 className="type-h2">Create Workspace</h2>
          <p className="type-body" style={{ color: 'var(--color-text-3)' }}>
            Start your agency's digital transformation.
          </p>
        </div>

        <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
          <Input 
            label="Full Name" 
            placeholder="Alex Rivers" 
            type="text" 
            icon={<User size={16} />}
          />
          <Input 
            label="Agency Name" 
            placeholder="DesignFlow Studio" 
            type="text" 
            icon={<Building2 size={16} />}
          />
          <Input 
            label="Work Email" 
            placeholder="alex@agency.com" 
            type="email" 
            icon={<Mail size={16} />}
          />
          <Input 
            label="Password" 
            placeholder="••••••••" 
            type="password" 
            icon={<Lock size={16} />}
          />
          
          <Button variant="primary" style={{ width: '100%', marginTop: 'var(--space-md)' }}>
            Initialize AOS Workspace
          </Button>
        </form>

        <p className={styles.footer}>
          Already have a workspace? <Link href="/login">Sign In</Link>
        </p>
      </Card>
    </motion.div>
  );
}
