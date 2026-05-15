'use client';

import React, { useState } from 'react';
import { motion, Reorder } from 'framer-motion';
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
  ChevronDown
} from 'lucide-react';
import styles from './Projects.module.css';

interface Task {
  id: string;
  title: string;
  assignee: string;
  dueDate: string;
  priority: 'high' | 'medium' | 'low';
  comments: number;
}

interface Column {
  id: string;
  title: string;
  tasks: Task[];
}

const initialData: Column[] = [
  {
    id: 'backlog',
    title: 'Backlog',
    tasks: [
      { id: 'T-101', title: 'Research competitor brand systems', assignee: 'Alex', dueDate: 'May 20', priority: 'medium', comments: 3 },
      { id: 'T-102', title: 'Define core typography scale', assignee: 'Sarah', dueDate: 'May 18', priority: 'high', comments: 1 }
    ]
  },
  {
    id: 'in-progress',
    title: 'In Progress',
    tasks: [
      { id: 'T-103', title: 'Develop color palette tokens', assignee: 'Alex', dueDate: 'May 16', priority: 'high', comments: 5 },
      { id: 'T-104', title: 'Wireframe dashboard layout', assignee: 'Chen', dueDate: 'May 17', priority: 'medium', comments: 2 }
    ]
  },
  {
    id: 'review',
    title: 'Review',
    tasks: [
      { id: 'T-105', title: 'Hero section animation polish', assignee: 'Chen', dueDate: 'May 14', priority: 'low', comments: 8 }
    ]
  },
  {
    id: 'done',
    title: 'Done',
    tasks: [
      { id: 'T-106', title: 'Initial discovery call', assignee: 'Alex', dueDate: 'May 10', priority: 'medium', comments: 4 }
    ]
  }
];

export default function ProjectsPage() {
  const [columns] = useState(initialData);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.projectSelector}>
          <div className={styles.projectIcon}>N</div>
          <div className={styles.projectName}>
            <span className={styles.projectLabel}>Project</span>
            <div className={styles.projectTitle}>
              Nexus Brand Identity <ChevronDown size={14} />
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
          <Button variant="primary" leftIcon={<Plus size={16} />}>Task</Button>
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
                      <span className={styles.taskId}>{task.id}</span>
                      <div className={clsx(styles.priority, styles[task.priority])} />
                    </div>
                    <h4 className={styles.taskTitle}>{task.title}</h4>
                    <div className={styles.taskFooter}>
                      <div className={styles.assignee}>
                        <div className={styles.avatarSmall}>{task.assignee.charAt(0)}</div>
                        <span className={styles.dueDate}><Calendar size={12} /> {task.dueDate}</span>
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
