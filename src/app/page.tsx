'use client';

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
      padding: '32px',
      color: '#F1F5F9',
      fontFamily: 'system-ui, sans-serif'
    }}>
      <div style={{ textAlign: 'center' }}>
        <h1 style={{ 
          fontSize: '60px', 
          fontWeight: '700',
          marginBottom: '16px',
          letterSpacing: '-0.04em'
        }}>
          AOS
        </h1>
        <p style={{ 
          color: '#94A3B8', 
          maxWidth: '500px', 
          margin: '0 auto 32px',
          fontSize: '18px'
        }}>
          The AI-Powered Agency Operating System.
        </p>

        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
          <Link href="/login">
            <button style={{
              background: '#3D7BFF',
              color: 'white',
              padding: '16px 32px',
              borderRadius: '10px',
              fontWeight: '600',
              border: 'none',
              cursor: 'pointer'
            }}>
              Enter System
            </button>
          </Link>
        </div>
      </div>

      <div style={{
        position: 'absolute',
        bottom: '32px',
        fontSize: '11px',
        textTransform: 'uppercase',
        letterSpacing: '0.2em',
        color: '#475569'
      }}>
        Built for Performance
      </div>
    </main>
  );
}