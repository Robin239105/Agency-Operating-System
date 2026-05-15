'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Search, Bell, User, ChevronDown, Command, Settings, LogOut, CreditCard, HelpCircle, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './TopBar.module.css';

interface Notification {
  id: string;
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
}

export const TopBar: React.FC = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const notifRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const res = await fetch('/api/notifications');
      const data = await res.json();
      if (data.notifications) {
        setNotifications(data.notifications);
        setUnreadCount(data.unreadCount);
      }
    } catch (err) {
      console.error('Failed to fetch notifications:', err);
    }
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setShowNotifications(false);
      }
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setShowProfile(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const userName = session?.user?.name || 'User';
  const userEmail = session?.user?.email || '';
  const userInitial = userName.charAt(0).toUpperCase();

  const handleSignOut = async () => {
    await signOut({ callbackUrl: '/login' });
  };

  return (
    <header className={styles.topBar}>
      <div className={styles.left}>
        <div className={styles.workspaceSwitcher}>
          <div className={styles.avatar}>{userInitial}</div>
          <span className={styles.workspaceName}>My Workspace</span>
          <ChevronDown size={14} className={styles.chevron} />
        </div>
      </div>

      <div className={styles.center}>
        <div className={styles.searchBar}>
          <Search size={16} className={styles.searchIcon} />
          <input type="text" placeholder="Search system..." className={styles.searchInput} />
          <div className={styles.searchKbd}>
            <Command size={10} />
            <span>K</span>
          </div>
        </div>
      </div>

      <div className={styles.right}>
        <div ref={notifRef} style={{ position: 'relative' }}>
          <button 
            className={styles.iconBtn}
            onClick={() => setShowNotifications(!showNotifications)}
          >
            <Bell size={18} />
            {unreadCount > 0 && <span className={styles.notificationDot} />}
          </button>
          
          <AnimatePresence>
            {showNotifications && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.95 }}
                transition={{ duration: 0.15 }}
                className={styles.dropdown}
              >
                <div className={styles.dropdownHeader}>
                  <span className={styles.dropdownTitle}>Notifications</span>
                  {unreadCount > 0 && <button className={styles.markAllRead}>Mark all read</button>}
                </div>
                <div className={styles.notifList}>
                  {notifications.length === 0 && (
                    <div className={styles.notifItem}>
                      <div className={styles.notifMessage}>No notifications yet</div>
                    </div>
                  )}
                  {notifications.slice(0, 5).map((notif) => (
                    <div key={notif.id} className={`${styles.notifItem} ${!notif.read ? styles.unread : ''}`}>
                      <div className={styles.notifContent}>
                        <div className={styles.notifTitle}>{notif.title}</div>
                        <div className={styles.notifMessage}>{notif.message}</div>
                      </div>
                      <div className={styles.notifTime}>{new Date(notif.createdAt).toLocaleDateString()}</div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        <div className={styles.divider} />
        
        <div ref={profileRef} style={{ position: 'relative' }}>
          <div 
            className={styles.userMenu}
            onClick={() => setShowProfile(!showProfile)}
          >
            <div className={styles.userAvatar}>
              {userInitial || <User size={16} />}
            </div>
            <span className={styles.userName}>{userName}</span>
            <ChevronDown size={14} className={styles.chevron} />
          </div>

          <AnimatePresence>
            {showProfile && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.95 }}
                transition={{ duration: 0.15 }}
                className={styles.dropdown}
              >
                <div className={styles.profileHeader}>
                  <div className={styles.profileAvatar}>
                    {userInitial || <User size={24} />}
                  </div>
                  <div className={styles.profileInfo}>
                    <div className={styles.profileName}>{userName}</div>
                    <div className={styles.profileEmail}>{userEmail}</div>
                  </div>
                </div>
                <div className={styles.menuList}>
                  <button className={styles.menuItem} onClick={() => router.push('/settings')}>
                    <Settings size={16} />
                    <span>Settings</span>
                  </button>
                  <button className={styles.menuItem} onClick={() => router.push('/billing')}>
                    <CreditCard size={16} />
                    <span>Billing</span>
                  </button>
                  <button className={styles.menuItem}>
                    <HelpCircle size={16} />
                    <span>Help & Support</span>
                  </button>
                </div>
                <div className={styles.menuDivider} />
                <button className={`${styles.menuItem} ${styles.logout}`} onClick={handleSignOut}>
                  <LogOut size={16} />
                  <span>Sign out</span>
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
};