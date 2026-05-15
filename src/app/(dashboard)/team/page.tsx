'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { 
  Users, 
  Mail, 
  MoreHorizontal,
  UserPlus,
  MessageSquare,
  Clock,
  Activity,
  Video,
  Loader2
} from 'lucide-react';
import styles from './Team.module.css';

interface TeamMember {
  id: string;
  name: string;
  role: string;
  avatar: string;
  status: string;
  tasks: number;
  hoursThisWeek: string;
}

export default function TeamPage() {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTeam();
  }, []);

  const fetchTeam = async () => {
    try {
      const res = await fetch('/api/team');
      const data = await res.json();
      if (data.members) {
        setMembers(data.members);
      }
    } catch (err) {
      console.error('Failed to fetch team:', err);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'var(--color-success)';
      case 'away': return 'var(--color-warning)';
      default: return 'var(--color-text-3)';
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
        <div className={styles.titleGroup}>
          <h1 className="type-h2">Team Collaboration</h1>
          <p className="type-body" style={{ color: 'var(--color-text-3)' }}>
            Manage your team and collaborate.
          </p>
        </div>
        <Button variant="primary" leftIcon={<UserPlus size={18} />}>
          Invite
        </Button>
      </header>

      <div className={styles.statsRow}>
        <Card className={styles.statCard}>
          <div className={styles.statIcon}><Users size={20} /></div>
          <div className={styles.statContent}>
            <span className={styles.statValue}>{members.length}</span>
            <span className={styles.statLabel}>Members</span>
          </div>
        </Card>
        <Card className={styles.statCard}>
          <div className={styles.statIcon}><Activity size={20} /></div>
          <div className={styles.statContent}>
            <span className={styles.statValue}>{members.filter(m => m.status === 'online').length}</span>
            <span className={styles.statLabel}>Online</span>
          </div>
        </Card>
      </div>

      <div className={styles.membersList}>
        {members.map((member) => (
          <Card key={member.id} className={styles.memberCard}>
            <div className={styles.avatar}>{member.avatar}</div>
            <div>
              <div className={styles.memberName}>{member.name}</div>
              <div className={styles.memberRole}>{member.role}</div>
            </div>
            <div className={styles.memberMeta}>
              <span>{member.tasks} tasks</span>
              <span>{member.hoursThisWeek}</span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}