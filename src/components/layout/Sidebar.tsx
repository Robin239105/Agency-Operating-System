'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, 
  Users, 
  Briefcase, 
  CheckSquare, 
  Clock, 
  Zap, 
  Users2, 
  Database, 
  CreditCard, 
  PieChart, 
  Settings,
  ChevronLeft,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { clsx } from 'clsx';
import styles from './Sidebar.module.css';

const navItems = [
  { group: null, items: [
    { name: 'Overview', icon: LayoutDashboard, href: '/dashboard' }
  ]},
  { group: 'Clients', items: [
    { name: 'Clients', icon: Users, href: '/clients' },
    { name: 'Projects', icon: Briefcase, href: '/projects' },
    { name: 'Tasks', icon: CheckSquare, href: '/tasks' },
    { name: 'Time Tracking', icon: Clock, href: '/time' }
  ]},
  { group: 'AI Workflows', items: [
    { name: 'Brief Analyzer', icon: Sparkles, href: '/ai/brief' },
    { name: 'Proposal Gen', icon: Zap, href: '/ai/proposal' },
    { name: 'Summaries', icon: Database, href: '/ai/summaries' }
  ]},
  { group: 'Team', items: [
    { name: 'Collaboration', icon: Users2, href: '/team' },
    { name: 'Knowledgebase', icon: Database, href: '/kb' }
  ]},
  { group: 'Finance', items: [
    { name: 'Invoices', icon: CreditCard, href: '/billing/invoices' },
    { name: 'Billing', icon: CreditCard, href: '/billing' }
  ]},
  { group: 'Analytics', items: [
    { name: 'Insights', icon: PieChart, href: '/analytics' }
  ]},
  { group: 'System', items: [
    { name: 'Settings', icon: Settings, href: '/settings' }
  ]}
];

export const Sidebar: React.FC = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();

  return (
    <motion.aside
      initial={false}
      animate={{ width: isCollapsed ? 64 : 240 }}
      className={styles.sidebar}
    >
      <div className={styles.header}>
        <div className={styles.logo}>
          <div className={styles.logoIcon}>A</div>
          {!isCollapsed && <span className={styles.logoText}>AOS</span>}
        </div>
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className={styles.collapseBtn}
        >
          {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>
      </div>

      <nav className={styles.nav}>
        {navItems.map((group, idx) => (
          <div key={idx} className={styles.group}>
            {!isCollapsed && group.group && (
              <h3 className={styles.groupTitle}>{group.group}</h3>
            )}
            <div className={styles.items}>
              {group.items.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link key={item.name} href={item.href}>
                    <div className={clsx(styles.item, { [styles.active]: isActive })}>
                      <item.icon size={18} className={styles.icon} />
                      {!isCollapsed && <span className={styles.itemName}>{item.name}</span>}
                      {isActive && <motion.div layoutId="activeNav" className={styles.activeIndicator} />}
                    </div>
                  </Link>
                );
              })}
            </div>
            {!isCollapsed && idx < navItems.length - 1 && <div className={styles.divider} />}
          </div>
        ))}
      </nav>
    </motion.aside>
  );
};
