'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { DataTable } from '@/components/ui/DataTable';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Search, Plus, Filter, MoreVertical, ExternalLink, Loader2 } from 'lucide-react';
import styles from './Clients.module.css';

interface Client {
  id: string;
  name: string;
  status: 'active' | 'progress' | 'review' | 'blocked';
  lastContact: string;
  mrr: string;
  projects: number;
}

export default function ClientsPage() {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      const res = await fetch('/api/clients');
      const data = await res.json();
      if (data.clients) {
        setClients(data.clients);
      }
    } catch (err) {
      console.error('Failed to fetch clients:', err);
    } finally {
      setLoading(false);
    }
  };

  const filteredClients = clients.filter(client => 
    client.name.toLowerCase().includes(search.toLowerCase())
  );

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
      accessor: (row: Client) => <Badge variant={row.status === 'active' ? 'success' : row.status === 'progress' ? 'warning' : row.status === 'review' ? 'neutral' : 'danger'}>{row.status}</Badge> 
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

  if (loading) {
    return (
      <div className={styles.container}>
        <div style={{ display: 'flex', justifyContent: 'center', padding: '100px' }}>
          <Loader2 size={32} className={styles.spin} />
        </div>
      </div>
    );
  }

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
        <DataTable columns={columns} data={filteredClients} />
      </motion.div>
    </div>
  );
}