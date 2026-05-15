'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Home() {
  return (
    <main style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center',
      background: 'radial-gradient(circle at center, #12161F 0%, #0B0E14 100%)',
      padding: 'var(--space-xl)'
    }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        style={{ textAlign: 'center' }}
      >
        <h1 className="type-hero" style={{ marginBottom: 'var(--space-md)' }}>
          AOS
        </h1>
        <p className="type-body" style={{ 
          color: 'var(--color-text-2)', 
          maxWidth: '500px', 
          margin: '0 auto var(--space-xl)',
          fontSize: '18px'
        }}>
          The AI-Powered Agency Operating System. 
          Precision-engineered for the modern digital landscape.
        </p>

        <div style={{ display: 'flex', gap: 'var(--space-md)', justifyContent: 'center' }}>
          <Link href="/login">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                background: 'var(--color-accent)',
                color: 'white',
                padding: 'var(--space-md) var(--space-xl)',
                borderRadius: 'var(--radius-md)',
                fontWeight: 600,
                boxShadow: 'var(--shadow-mid)'
              }}
            >
              Enter System
            </motion.button>
          </Link>
          
          <motion.button
            whileHover={{ scale: 1.05, background: 'rgba(255,255,255,0.05)' }}
            whileTap={{ scale: 0.95 }}
            style={{
              border: '1px solid var(--color-border)',
              color: 'var(--color-text-1)',
              padding: 'var(--space-md) var(--space-xl)',
              borderRadius: 'var(--radius-md)',
              fontWeight: 500
            }}
          >
            Documentation
          </motion.button>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ delay: 1, duration: 2 }}
        style={{
          position: 'absolute',
          bottom: 'var(--space-xl)',
          fontSize: '11px',
          fontFamily: 'var(--font-dm-mono)',
          textTransform: 'uppercase',
          letterSpacing: '0.2em',
          color: 'var(--color-text-3)'
        }}
      >
        Built for Performance • Powered by AI
      </motion.div>
    </main>
  );
}
