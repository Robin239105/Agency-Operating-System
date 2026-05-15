'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { 
  Plus, 
  Search, 
  Filter, 
  Sparkles, 
  Calendar, 
  MessageSquare, 
  MoreHorizontal,
  ChevronDown,
  Loader2
} from 'lucide-react';
import styles from './Projects.module.css';

interface Task {
  id: string;
  title: string;
  assignee?: { name: string };
  dueDate?: string;
  priority: string;
  comments: number;
}

interface Column {
  id: string;
  title: string;
  tasks: Task[];
}

export default function ProjectsPage() {
  const [columns, setColumns] = useState<Column[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await fetch('/api/projects');
      const data = await res.json();
      if (data.projects) {
        // Transform projects to kanban columns
        const todo = data.projects.filter((p: any) => p.status === 'ACTIVE').slice(0, 3);
        const inProgress = data.projects.filter((p: any) => p.status === 'ON_HOLD').slice(0, 2);
        const done = data.projects.filter((p: any) => p.status === 'COMPLETED').slice(0, 2);
        
        setColumns([
          { id: 'active', title: 'Active', tasks: todo.map((p: any) => ({ id: p.id, title: p.name, priority: 'medium', comments: p._count?.tasks || 0 })) },
          { id: 'on-hold', title: 'On Hold', tasks: inProgress.map((p: any) => ({ id: p.id, title: p.name, priority: 'high', comments: p._count?.tasks || 0 })) },
          { id: 'completed', title: 'Completed', tasks: done.map((p: any) => ({ id: p.id, title: p.name, priority: 'low', comments: p._count?.tasks || 0 })) },
        ]);
      }
    } catch (err) {
      console.error('Failed to fetch projects:', err);
    } finally {
      setLoading(false);
    }
  };

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
        <div className={styles.projectSelector}>
          <div className={styles.projectIcon}>P</div>
          <div className={styles.projectName}>
            <span className={styles.projectLabel}>Project</span>
            <div className={styles.projectTitle}>
              All Projects <ChevronDown size={14} />
            </div>
          </div>
        </div>

        <div className={styles.headerActions}>
          <div className={styles.viewToggle}>
            <button className={styles.activeToggle}>Board</button>
            <button>List</button>
            <button>Timeline</button>
          </div>
          <Button variant="secondary" leftIcon={<Sparkles size={16} color="var(--color-ai)" />}>
            Analyze Health
          </Button>
          <Button variant="primary" leftIcon={<Plus size={16} />}>Project</Button>
        </div>
      </header>

      <div className={styles.board}>
        {columns.map((column) => (
          <div key={column.id} className={styles.column}>
            <div className={styles.columnHeader}>
              <div className={styles.columnTitleGroup}>
                <span className={styles.columnTitle}>{column.title}</span>
                <span className={styles.columnCount}>{column.tasks.length}</span>
              </div>
              <Button variant="ghost" size="sm" style={{ padding: '0 4px' }}><Plus size={14} /></Button>
            </div>

            <div className={styles.taskList}>
              {column.tasks.map((task) => (
                <motion.div
                  key={task.id}
                  whileHover={{ scale: 1.02, rotate: 1 }}
                  className={styles.taskCardWrapper}
                >
                  <Card hoverable className={styles.taskCard}>
                    <div className={styles.taskHeader}>
                      <span className={styles.taskId}>{task.id.slice(0, 8)}</span>
                      <div className={`${styles.priority} ${styles[task.priority]}`} />
                    </div>
                    <h4 className={styles.taskTitle}>{task.title}</h4>
                    <div className={styles.taskFooter}>
                      <div className={styles.assignee}>
                        <div className={styles.avatarSmall}>P</div>
                        <span className={styles.dueDate}><Calendar size={12} /> Due soon</span>
                      </div>
                      <div className={styles.meta}>
                        <span className={styles.metaItem}><MessageSquare size={12} /> {task.comments}</span>
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

function clsx(...args: any[]) {
  return args.filter(Boolean).join(' ');
}