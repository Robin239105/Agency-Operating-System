'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { 
  Plus, 
  Search, 
  Filter, 
  Calendar, 
  MessageSquare, 
  MoreHorizontal,
  Flag,
  Paperclip,
  Clock
} from 'lucide-react';
import styles from './Tasks.module.css';

interface Task {
  id: string;
  title: string;
  assignee: { name: string; avatar: string };
  project: string;
  dueDate: string;
  priority: 'urgent' | 'high' | 'medium' | 'low';
  comments: number;
  attachments: number;
}

interface Column {
  id: string;
  title: string;
  color: string;
  tasks: Task[];
}

const initialData: Column[] = [
  {
    id: 'urgent',
    title: 'Urgent',
    color: 'var(--color-danger)',
    tasks: [
      { id: 'T-001', title: 'Fix critical bug in client portal login', assignee: { name: 'Alex', avatar: 'A' }, project: 'Nexus Portal', dueDate: 'Today', priority: 'urgent', comments: 12, attachments: 3 },
      { id: 'T-002', title: 'Client emergency: logo revision request', assignee: { name: 'Sarah', avatar: 'S' }, project: 'Vortex Rebrand', dueDate: 'Today', priority: 'urgent', comments: 5, attachments: 1 },
    ]
  },
  {
    id: 'todo',
    title: 'To Do',
    color: 'var(--color-text-2)',
    tasks: [
      { id: 'T-003', title: 'Design system documentation update', assignee: { name: 'Chen', avatar: 'C' }, project: 'Design System', dueDate: 'May 18', priority: 'high', comments: 2, attachments: 0 },
      { id: 'T-004', title: 'Create homepage wireframes', assignee: { name: 'Alex', avatar: 'A' }, project: 'Starlight Web', dueDate: 'May 20', priority: 'medium', comments: 8, attachments: 4 },
      { id: 'T-005', title: 'Review API documentation', assignee: { name: 'Jordan', avatar: 'J' }, project: 'Internal Tools', dueDate: 'May 21', priority: 'low', comments: 0, attachments: 2 },
    ]
  },
  {
    id: 'in-progress',
    title: 'In Progress',
    color: 'var(--color-accent)',
    tasks: [
      { id: 'T-006', title: 'Implement new dashboard charts', assignee: { name: 'Chen', avatar: 'C' }, project: 'Analytics Dashboard', dueDate: 'May 17', priority: 'high', comments: 6, attachments: 1 },
      { id: 'T-007', title: 'Mobile responsive fixes', assignee: { name: 'Alex', avatar: 'A' }, project: 'Nexus Portal', dueDate: 'May 18', priority: 'medium', comments: 4, attachments: 0 },
    ]
  },
  {
    id: 'done',
    title: 'Done',
    color: 'var(--color-success)',
    tasks: [
      { id: 'T-008', title: 'User authentication flow', assignee: { name: 'Jordan', avatar: 'J' }, project: 'Nexus Portal', dueDate: 'May 14', priority: 'high', comments: 15, attachments: 3 },
      { id: 'T-009', title: 'Email template design', assignee: { name: 'Sarah', avatar: 'S' }, project: 'Acme Marketing', dueDate: 'May 13', priority: 'medium', comments: 3, attachments: 5 },
      { id: 'T-010', title: 'Database optimization', assignee: { name: 'Chen', avatar: 'C' }, project: 'Internal Tools', dueDate: 'May 12', priority: 'low', comments: 7, attachments: 0 },
    ]
  }
];

export default function TasksPage() {
  const [columns] = useState(initialData);
  const [search, setSearch] = useState('');

  const getPriorityBadge = (priority: string) => {
    const variants: Record<string, 'danger' | 'warning' | 'success' | 'neutral'> = {
      urgent: 'danger',
      high: 'warning',
      medium: 'neutral',
      low: 'success'
    };
    return <Badge variant={variants[priority]}>{priority}</Badge>;
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.titleGroup}>
          <h1 className="type-h2">Task Manager</h1>
          <p className="type-body" style={{ color: 'var(--color-text-3)' }}>
            Track and prioritize all tasks across your projects.
          </p>
        </div>
        <div className={styles.headerActions}>
          <Button variant="secondary" leftIcon={<Filter size={16} />}>Filters</Button>
          <Button variant="primary" leftIcon={<Plus size={16} />}>New Task</Button>
        </div>
      </header>

      <div className={styles.controls}>
        <div className={styles.searchWrapper}>
          <Search size={16} className={styles.searchIcon} />
          <input 
            type="text" 
            placeholder="Search tasks by title or ID..." 
            className={styles.searchInput}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className={styles.stats}>
          <div className={styles.stat}><span className={styles.statNum}>12</span><span className={styles.statLabel}>Today</span></div>
          <div className={styles.stat}><span className={styles.statNum}>8</span><span className={styles.statLabel}>Overdue</span></div>
          <div className={styles.stat}><span className={styles.statNum}>23</span><span className={styles.statLabel}>This Week</span></div>
        </div>
      </div>

      <div className={styles.board}>
        {columns.map((column) => (
          <div key={column.id} className={styles.column}>
            <div className={styles.columnHeader}>
              <div className={styles.columnTitleGroup}>
                <span className={styles.columnDot} style={{ background: column.color }} />
                <span className={styles.columnTitle}>{column.title}</span>
                <span className={styles.columnCount}>{column.tasks.length}</span>
              </div>
              <Button variant="ghost" size="sm" style={{ padding: '4px' }}><Plus size={14} /></Button>
            </div>

            <div className={styles.taskList}>
              {column.tasks.map((task, idx) => (
                <motion.div
                  key={task.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className={styles.taskCardWrapper}
                >
                  <Card hoverable className={styles.taskCard}>
                    <div className={styles.taskHeader}>
                      <span className={styles.taskId}>{task.id}</span>
                      {getPriorityBadge(task.priority)}
                    </div>
                    <h4 className={styles.taskTitle}>{task.title}</h4>
                    <div className={styles.projectTag}>{task.project}</div>
                    <div className={styles.taskFooter}>
                      <div className={styles.assignee}>
                        <div className={styles.avatarSmall}>{task.assignee.avatar}</div>
                        <span className={styles.dueDate}><Calendar size={12} /> {task.dueDate}</span>
                      </div>
                      <div className={styles.meta}>
                        {task.comments > 0 && <span className={styles.metaItem}><MessageSquare size={12} /> {task.comments}</span>}
                        {task.attachments > 0 && <span className={styles.metaItem}><Paperclip size={12} /> {task.attachments}</span>}
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}