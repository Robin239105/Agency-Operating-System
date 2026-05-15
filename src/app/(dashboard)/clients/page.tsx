'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { DataTable } from '@/components/ui/DataTable';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Search, Plus, Filter, MoreVertical, ExternalLink } from 'lucide-react';
import styles from './Clients.module.css';

interface Client {
  id: string;
  name: string;
  status: 'active' | 'progress' | 'review' | 'blocked';
  lastContact: string;
  mrr: string;
  projects: number;
}

const mockClients: Client[] = [
  { id: 'CL-001', name: 'Nexus Digital', status: 'active', lastContact: '2024-05-12', mrr: '$4,500', projects: 3 },
  { id: 'CL-002', name: 'Vortex Media', status: 'progress', lastContact: '2024-05-14', mrr: '$12,000', projects: 5 },
  { id: 'CL-003', name: 'Acme Corp', status: 'review', lastContact: '2024-05-10', mrr: '$2,800', projects: 1 },
  { id: 'CL-004', name: 'Starlight SaaS', status: 'active', lastContact: '2024-05-13', mrr: '$8,200', projects: 2 },
  { id: 'CL-005', name: 'Quantum Leap', status: 'blocked', lastContact: '2024-05-08', mrr: '$15,000', projects: 4 },
];

export default function ClientsPage() {
  const [search, setSearch] = useState('');

  const columns: any[] = [
    { 
      header: 'Client Name', 
      accessor: (row: Client) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)' }}>
          <div className={styles.clientAvatar}>{row.name.charAt(0)}</div>
          <span style={{ fontWeight: 600 }}>{row.name}</span>
        </div>
      ) 
    },
    { 
      header: 'Status', 
      accessor: (row: Client) => <Badge variant={row.status}>{row.status.replace(/_/g, ' ')}</Badge> 
    },
    { header: 'Last Contact', accessor: 'lastContact', isMono: true },
    { header: 'Projects', accessor: 'projects', isMono: true },
    { 
      header: 'MRR Value', 
      accessor: (row: Client) => <span style={{ color: 'var(--color-success)', fontWeight: 600 }}>{row.mrr}</span>,
      isMono: true
    },
    {
      header: '',
      accessor: (row: Client) => (
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 'var(--space-sm)' }}>
          <Button variant="ghost" size="sm" style={{ padding: '0 8px' }}><ExternalLink size={14} /></Button>
          <Button variant="ghost" size="sm" style={{ padding: '0 8px' }}><MoreVertical size={14} /></Button>
        </div>
      )
    }
  ];

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.titleGroup}>
          <h1 className="type-h2">Client CRM</h1>
          <p className="type-body" style={{ color: 'var(--color-text-3)' }}>
            Manage your agency relationships and revenue.
          </p>
        </div>
        <Button variant="primary" leftIcon={<Plus size={18} />}>
          New Client
        </Button>
      </header>

      <div className={styles.controls}>
        <div className={styles.searchWrapper}>
          <Search size={16} className={styles.searchIcon} />
          <input 
            type="text" 
            placeholder="Search clients by name, ID, or status..." 
            className={styles.searchInput}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <Button variant="secondary" leftIcon={<Filter size={16} />}>Filters</Button>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <DataTable columns={columns} data={mockClients} />
      </motion.div>
    </div>
  );
}
