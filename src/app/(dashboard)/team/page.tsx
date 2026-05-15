'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { 
  Users, 
  Mail, 
  MoreHorizontal,
  Plus,
  MessageSquare,
  Clock,
  Activity,
  Video,
  Circle,
  UserPlus
} from 'lucide-react';
import styles from './Team.module.css';

interface TeamMember {
  id: string;
  name: string;
  role: string;
  email: string;
  status: 'online' | 'offline' | 'away' | 'busy';
  avatar: string;
  tasks: number;
  hoursThisWeek: string;
}

const teamMembers: TeamMember[] = [
  { id: '1', name: 'Alex Rivers', role: 'Creative Director', email: 'alex@designflow.io', status: 'online', avatar: 'A', tasks: 5, hoursThisWeek: '38h' },
  { id: '2', name: 'Sarah Chen', role: 'Senior Designer', email: 'sarah@designflow.io', status: 'online', avatar: 'S', tasks: 8, hoursThisWeek: '42h' },
  { id: '3', name: 'Jordan Smith', role: 'Developer', email: 'jordan@designflow.io', status: 'away', avatar: 'J', tasks: 3, hoursThisWeek: '35h' },
  { id: '4', name: 'Chen Lee', role: 'UX Designer', email: 'chen@designflow.io', status: 'busy', avatar: 'C', tasks: 6, hoursThisWeek: '40h' },
  { id: '5', name: 'Emma Wilson', role: 'Project Manager', email: 'emma@designflow.io', status: 'offline', avatar: 'E', tasks: 4, hoursThisWeek: '32h' },
  { id: '6', name: 'Marcus Brown', role: 'Motion Designer', email: 'marcus@designflow.io', status: 'online', avatar: 'M', tasks: 2, hoursThisWeek: '28h' },
];

const recentActivity = [
  { id: '1', user: 'Sarah', action: 'completed task', target: 'Logo final deliverable', time: '5m ago' },
  { id: '2', user: 'Chen', action: 'commented on', target: 'Dashboard wireframes', time: '15m ago' },
  { id: '3', user: 'Jordan', action: 'pushed code to', target: 'Nexus Portal repo', time: '32m ago' },
  { id: '4', user: 'Alex', action: 'created project', target: 'Starlight Mobile App', time: '1h ago' },
  { id: '5', user: 'Emma', action: 'scheduled meeting', target: 'Sprint planning', time: '2h ago' },
];

export default function TeamPage() {
  const [activeTab, setActiveTab] = useState<'members' | 'activity'>('members');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'var(--color-success)';
      case 'away': return 'var(--color-warning)';
      case 'busy': return 'var(--color-danger)';
      default: return 'var(--color-text-3)';
    }
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.titleGroup}>
          <h1 className="type-h2">Team Collaboration</h1>
          <p className="type-body" style={{ color: 'var(--color-text-3)' }}>
            Manage your team, track activity, and collaborate in real-time.
          </p>
        </div>
        <Button variant="primary" leftIcon={<UserPlus size={18} />}>
          Invite Member
        </Button>
      </header>

      <div className={styles.statsRow}>
        <Card className={styles.statCard}>
          <div className={styles.statIcon}><Users size={20} /></div>
          <div className={styles.statContent}>
            <span className={styles.statValue}>{teamMembers.length}</span>
            <span className={styles.statLabel}>Team Members</span>
          </div>
        </Card>
        <Card className={styles.statCard}>
          <div className={styles.statIcon}><Activity size={20} /></div>
          <div className={styles.statContent}>
            <span className={styles.statValue}>3</span>
            <span className={styles.statLabel}>Online Now</span>
          </div>
        </Card>
        <Card className={styles.statCard}>
          <div className={styles.statIcon}><Clock size={20} /></div>
          <div className={styles.statContent}>
            <span className={styles.statValue}>215h</span>
            <span className={styles.statLabel}>Total This Week</span>
          </div>
        </Card>
        <Card className={styles.statCard}>
          <div className={styles.statIcon}><MessageSquare size={20} /></div>
          <div className={styles.statContent}>
            <span className={styles.statValue}>28</span>
            <span className={styles.statLabel}>Active Tasks</span>
          </div>
        </Card>
      </div>

      <div className={styles.mainContent}>
        <div className={styles.membersSection}>
          <div className={styles.sectionHeader}>
            <h2 className="type-h3">Team Members</h2>
          </div>
          <div className={styles.membersList}>
            {teamMembers.map((member, idx) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
              >
                <Card className={styles.memberCard} hoverable>
                  <div className={styles.memberMain}>
                    <div className={styles.avatarWrapper}>
                      <div className={styles.avatar}>{member.avatar}</div>
                      <span 
                        className={styles.statusDot} 
                        style={{ background: getStatusColor(member.status) }}
                      />
                    </div>
                    <div className={styles.memberInfo}>
                      <div className={styles.memberName}>{member.name}</div>
                      <div className={styles.memberRole}>{member.role}</div>
                    </div>
                  </div>
                  <div className={styles.memberMeta}>
                    <div className={styles.metaItem}>
                      <span className={styles.metaValue}>{member.tasks}</span>
                      <span className={styles.metaLabel}>Tasks</span>
                    </div>
                    <div className={styles.metaItem}>
                      <span className={styles.metaValue}>{member.hoursThisWeek}</span>
                      <span className={styles.metaLabel}>This Week</span>
                    </div>
                  </div>
                  <div className={styles.memberActions}>
                    <Button variant="ghost" size="sm"><Mail size={14} /></Button>
                    <Button variant="ghost" size="sm"><MessageSquare size={14} /></Button>
                    <Button variant="ghost" size="sm"><MoreHorizontal size={14} /></Button>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        <div className={styles.activitySection}>
          <Card className={styles.activityCard}>
            <div className={styles.sectionHeader}>
              <h2 className="type-h3">Recent Activity</h2>
            </div>
            <div className={styles.activityList}>
              {recentActivity.map((item, idx) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className={styles.activityItem}
                >
                  <div className={styles.activityAvatar}>
                    {item.user.charAt(0)}
                  </div>
                  <div className={styles.activityContent}>
                    <span className={styles.activityUser}>{item.user}</span>
                    <span className={styles.activityAction}>{item.action}</span>
                    <span className={styles.activityTarget}>{item.target}</span>
                    <span className={styles.activityTime}>{item.time}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </Card>

          <Card className={styles.quickActionsCard}>
            <h3 className="type-label" style={{ marginBottom: 'var(--space-md)' }}>Quick Actions</h3>
            <div className={styles.quickActions}>
              <button className={styles.quickAction}>
                <Video size={16} />
                <span>Start Call</span>
              </button>
              <button className={styles.quickAction}>
                <MessageSquare size={16} />
                <span>New Chat</span>
              </button>
              <button className={styles.quickAction}>
                <Users size={16} />
                <span>Create Group</span>
              </button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}