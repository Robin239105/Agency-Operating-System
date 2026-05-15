'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Building2, Mail, Lock, User, Loader2, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import styles from '../login/Auth.module.css';

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Register the user
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Registration failed');
        return;
      }

      // Auto-login after registration
      const result = await signIn('credentials', {
        redirect: false,
        email,
        password,
      });

      if (result?.error) {
        setError('Login failed after registration');
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
          <h2 className="type-h2">Create Workspace</h2>
          <p className="type-body" style={{ color: 'var(--color-text-3)' }}>
            Start your agency's digital transformation.
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
            label="Full Name" 
            placeholder="Alex Rivers" 
            type="text" 
            icon={<User size={16} />}
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <Input 
            label="Work Email" 
            placeholder="alex@agency.com" 
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
          
          <Button 
            variant="primary" 
            style={{ width: '100%', marginTop: 'var(--space-md)' }}
            disabled={loading}
            type="submit"
          >
            {loading ? <Loader2 size={18} className={styles.spin} /> : 'Initialize AOS Workspace'}
          </Button>
        </form>

        <p className={styles.footer}>
          Already have a workspace? <Link href="/login">Sign In</Link>
        </p>
      </Card>
    </motion.div>
  );
}