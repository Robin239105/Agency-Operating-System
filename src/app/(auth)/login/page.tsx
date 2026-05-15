'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Sparkles, Mail, Lock, Loader2, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import styles from './Auth.module.css';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const result = await signIn('credentials', {
        redirect: false,
        email,
        password,
      });

      if (result?.error) {
        setError('Invalid email or password');
      } else {
        router.push('/dashboard');
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

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

        <form className={styles.form} onSubmit={handleSubmit}>
          {error && (
            <div className={styles.error}>
              <AlertCircle size={16} />
              {error}
            </div>
          )}
          
          <Input 
            label="Email Address" 
            placeholder="name@agency.com" 
            type="email" 
            icon={<Mail size={16} />}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input 
            label="Password" 
            placeholder="••••••••" 
            type="password" 
            icon={<Lock size={16} />}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          
          <div className={styles.actions}>
            <Link href="/forgot-password" className={styles.forgotPass}>
              Forgot password?
            </Link>
          </div>

          <Button 
            variant="primary" 
            style={{ width: '100%' }}
            disabled={loading}
            type="submit"
          >
            {loading ? <Loader2 size={18} className={styles.spin} /> : 'Sign In to AOS'}
          </Button>

          <div className={styles.divider}>
            <span>OR</span>
          </div>

          <Button 
            variant="ai" 
            style={{ width: '100%' }} 
            leftIcon={<Sparkles size={16} />}
            type="button"
            onClick={() => router.push('/register')}
          >
            Create New Account
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