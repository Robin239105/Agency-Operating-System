'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { 
  Download, 
  Eye, 
  Send,
  Filter,
  Search,
  MoreHorizontal,
  FileText,
  DollarSign,
  Clock,
  CheckCircle,
  AlertCircle,
  Loader2
} from 'lucide-react';
import styles from './Invoices.module.css';

interface Invoice {
  id: string;
  number: string;
  client: string;
  amount: string;
  date: string;
  dueDate: string;
  status: string;
  items: number;
}

export default function InvoicesPage() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [stats, setStats] = useState({ totalPaid: 0, totalPending: 0, totalOverdue: 0 });
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchInvoices();
  }, []);

  const fetchInvoices = async () => {
    try {
      const res = await fetch('/api/invoices');
      const data = await res.json();
      if (data.invoices) {
        setInvoices(data.invoices);
        setStats(data.stats);
      }
    } catch (err) {
      console.error('Failed to fetch invoices:', err);
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'paid': return <CheckCircle size={14} />;
      case 'pending': return <Clock size={14} />;
      case 'overdue': return <AlertCircle size={14} />;
      default: return <FileText size={14} />;
    }
  };

  const getStatusBadge = (status: string): 'success' | 'warning' | 'danger' | 'neutral' => {
    switch (status) {
      case 'paid': return 'success';
      case 'pending': return 'warning';
      case 'overdue': return 'danger';
      default: return 'neutral';
    }
  };

  const filteredInvoices = invoices
    .filter(inv => filter === 'all' || inv.status === filter)
    .filter(inv => inv.client.toLowerCase().includes(search.toLowerCase()) || inv.number.toLowerCase().includes(search.toLowerCase()));

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
          <h1 className="type-h2">Invoices & Payments</h1>
          <p className="type-body" style={{ color: 'var(--color-text-3)' }}>
            Track and manage all your client invoices and payments.
          </p>
        </div>
        <Button variant="primary" leftIcon={<FileText size={18} />}>
          New Invoice
        </Button>
      </header>

      <div className={styles.statsRow}>
        <Card className={styles.statCard}>
          <div className={styles.statIcon} style={{ color: 'var(--color-success)' }}>
            <CheckCircle size={20} />
          </div>
          <div className={styles.statContent}>
            <span className={styles.statValue}>${stats.totalPaid.toLocaleString()}</span>
            <span className={styles.statLabel}>Paid This Month</span>
          </div>
        </Card>
        <Card className={styles.statCard}>
          <div className={styles.statIcon} style={{ color: 'var(--color-warning)' }}>
            <Clock size={20} />
          </div>
          <div className={styles.statContent}>
            <span className={styles.statValue}>${stats.totalPending.toLocaleString()}</span>
            <span className={styles.statLabel}>Pending</span>
          </div>
        </Card>
        <Card className={styles.statCard}>
          <div className={styles.statIcon} style={{ color: 'var(--color-danger)' }}>
            <AlertCircle size={20} />
          </div>
          <div className={styles.statContent}>
            <span className={styles.statValue}>${stats.totalOverdue.toLocaleString()}</span>
            <span className={styles.statLabel}>Overdue</span>
          </div>
        </Card>
        <Card className={styles.statCard}>
          <div className={styles.statIcon}>
            <DollarSign size={20} />
          </div>
          <div className={styles.statContent}>
            <span className={styles.statValue}>${(stats.totalPending + stats.totalOverdue).toLocaleString()}</span>
            <span className={styles.statLabel}>Outstanding</span>
          </div>
        </Card>
      </div>

      <div className={styles.controls}>
        <div className={styles.searchWrapper}>
          <Search size={16} className={styles.searchIcon} />
          <input 
            type="text" 
            placeholder="Search invoices by number or client..." 
            className={styles.searchInput}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className={styles.filterGroup}>
          <Button 
            variant={filter === 'all' ? 'secondary' : 'ghost'} 
            size="sm"
            onClick={() => setFilter('all')}
          >
            All
          </Button>
          <Button 
            variant={filter === 'paid' ? 'secondary' : 'ghost'} 
            size="sm"
            onClick={() => setFilter('paid')}
          >
            Paid
          </Button>
          <Button 
            variant={filter === 'pending' ? 'secondary' : 'ghost'} 
            size="sm"
            onClick={() => setFilter('pending')}
          >
            Pending
          </Button>
          <Button 
            variant={filter === 'overdue' ? 'secondary' : 'ghost'} 
            size="sm"
            onClick={() => setFilter('overdue')}
          >
            Overdue
          </Button>
        </div>
      </div>

      <div className={styles.invoicesList}>
        {(filteredInvoices.length > 0 ? filteredInvoices : [
          { id: '1', number: 'INV-001', client: 'Sample Client', amount: '$1,000', date: '2024-05-01', dueDate: '2024-05-15', status: 'pending', items: 2 }
        ]).map((invoice, idx) => (
          <motion.div
            key={invoice.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
          >
            <Card className={styles.invoiceCard} hoverable>
              <div className={styles.invoiceMain}>
                <div className={styles.invoiceNumber}>{invoice.number}</div>
                <div className={styles.invoiceClient}>{invoice.client}</div>
              </div>
              <div className={styles.invoiceMeta}>
                <div className={styles.metaItem}>
                  <span className={styles.metaLabel}>Amount</span>
                  <span className={styles.metaValue}>{invoice.amount}</span>
                </div>
                <div className={styles.metaItem}>
                  <span className={styles.metaLabel}>Date</span>
                  <span className={styles.metaValue}>{invoice.date}</span>
                </div>
                <div className={styles.metaItem}>
                  <span className={styles.metaLabel}>Due</span>
                  <span className={styles.metaValue}>{invoice.dueDate}</span>
                </div>
              </div>
              <div className={styles.invoiceActions}>
                <Badge variant={getStatusBadge(invoice.status)}>
                  {getStatusIcon(invoice.status)}
                  {invoice.status}
                </Badge>
                <div className={styles.actionButtons}>
                  <Button variant="ghost" size="sm"><Eye size={14} /></Button>
                  <Button variant="ghost" size="sm"><Download size={14} /></Button>
                  <Button variant="ghost" size="sm"><Send size={14} /></Button>
                  <Button variant="ghost" size="sm"><MoreHorizontal size={14} /></Button>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}