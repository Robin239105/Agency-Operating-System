import React from 'react';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'radial-gradient(circle at center, #12161F 0%, #0B0E14 100%)',
      padding: 'var(--space-xl)'
    }}>
      {children}
    </div>
  );
}
