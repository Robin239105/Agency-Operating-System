'use client';

import React, { useState, useEffect } from 'react';
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
  Paperclip,
  Loader2
} from 'lucide-react';
import styles from './Tasks.module.css';

interface Task {
  id: string;
  title: string;
  description?: string;
  status: 'TODO' | 'IN_PROGRESS' | 'REVIEW' | 'DONE';
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
  dueDate?: string;
  project?: { name: string };
  assignedTo?: { name: string };
  _count?: { comments: number };
}

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await fetch('/api/tasks');
      const data = await res.json();
      if (data.tasks) {
        setTasks(data.tasks);
      }
    } catch (err) {
      console.error('Failed to fetch tasks:', err);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColumn = (status: string) => tasks.filter(t => t.status === status);
  
  const getPriorityBadge = (priority: string) => {
    const variants: Record<string, 'danger' | 'warning' | 'success' | 'neutral'> = {
      URGENT: 'danger',
      HIGH: 'warning',
      MEDIUM: 'neutral',
      LOW: 'success'
    };
    return <Badge variant={variants[priority] || 'neutral'}>{priority.toLowerCase()}</Badge>;
  };

  const columns = [
    { id: 'TODO', title: 'To Do', color: 'var(--color-text-2)', tasks: getStatusColumn('TODO') },
    { id: 'IN_PROGRESS', title: 'In Progress', color: 'var(--color-accent)', tasks: getStatusColumn('IN_PROGRESS') },
    { id: 'REVIEW', title: 'Review', color: 'var(--color-warning)', tasks: getStatusColumn('REVIEW') },
    { id: 'DONE', title: 'Done', color: 'var(--color-success)', tasks: getStatusColumn('DONE') },
  ];

  const filteredTasks = tasks.filter(task => 
    task.title.toLowerCase().includes(search.toLowerCase())
  );

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
          <div className={styles.stat}><span className={styles.statNum}>{tasks.filter(t => t.status === 'TODO').length}</span><span className={styles.statLabel}>To Do</span></div>
          <div className={styles.stat}><span className={styles.statNum}>{tasks.filter(t => t.status === 'IN_PROGRESS').length}</span><span className={styles.statLabel}>In Progress</span></div>
          <div className={styles.stat}><span className={styles.statNum}>{tasks.length}</span><span className={styles.statLabel}>Total</span></div>
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
              {filteredTasks.filter(t => t.status === column.id).map((task, idx) => (
                <motion.div
                  key={task.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className={styles.taskCardWrapper}
                >
                  <Card hoverable className={styles.taskCard}>
                    <div className={styles.taskHeader}>
                      <span className={styles.taskId}>{task.id.slice(0, 8)}</span>
                      {getPriorityBadge(task.priority)}
                    </div>
                    <h4 className={styles.taskTitle}>{task.title}</h4>
                    {task.project && <div className={styles.projectTag}>{task.project.name}</div>}
                    <div className={styles.taskFooter}>
                      <div className={styles.assignee}>
                        {task.assignedTo && <div className={styles.avatarSmall}>{task.assignedTo.name?.charAt(0) || 'U'}</div>}
                        {task.dueDate && <span className={styles.dueDate}><Calendar size={12} /> {new Date(task.dueDate).toLocaleDateString()}</span>}
                      </div>
                      <div className={styles.meta}>
                        {task._count?.comments ? <span className={styles.metaItem}><MessageSquare size={12} /> {task._count.comments}</span> : null}
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