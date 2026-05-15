'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Search, Bell, User, ChevronDown, Command, Settings, LogOut, CreditCard, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './TopBar.module.css';

const mockNotifications = [
  { id: 1, title: 'New client onboarded', message: 'Acme Corp has been added to your clients', time: '2m ago', unread: true },
  { id: 2, title: 'Invoice #1245 paid', message: 'Payment received from TechStart Inc', time: '1h ago', unread: true },
  { id: 3, title: 'AI Brief completed', message: 'Website redesign brief is ready for review', time: '3h ago', unread: false },
  { id: 4, title: 'Task assigned', message: 'You were assigned "Homepage Mockup"', time: '5h ago', unread: false },
];

export const TopBar: React.FC = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const notifRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

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

  return (
    <header className={styles.topBar}>
      <div className={styles.left}>
        <div className={styles.workspaceSwitcher}>
          <div className={styles.avatar}>D</div>
          <span className={styles.workspaceName}>DesignFlow Agency</span>
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
            <span className={styles.notificationDot} />
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
                  <button className={styles.markAllRead}>Mark all read</button>
                </div>
                <div className={styles.notifList}>
                  {mockNotifications.map((notif) => (
                    <div key={notif.id} className={`${styles.notifItem} ${notif.unread ? styles.unread : ''}`}>
                      <div className={styles.notifContent}>
                        <div className={styles.notifTitle}>{notif.title}</div>
                        <div className={styles.notifMessage}>{notif.message}</div>
                      </div>
                      <div className={styles.notifTime}>{notif.time}</div>
                    </div>
                  ))}
                </div>
                <div className={styles.dropdownFooter}>
                  View all notifications
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
              <User size={16} />
            </div>
            <span className={styles.userName}>Alex Rivers</span>
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
                    <User size={24} />
                  </div>
                  <div className={styles.profileInfo}>
                    <div className={styles.profileName}>Alex Rivers</div>
                    <div className={styles.profileEmail}>alex@designflow.io</div>
                  </div>
                </div>
                <div className={styles.menuList}>
                  <button className={styles.menuItem}>
                    <Settings size={16} />
                    <span>Settings</span>
                  </button>
                  <button className={styles.menuItem}>
                    <CreditCard size={16} />
                    <span>Billing</span>
                  </button>
                  <button className={styles.menuItem}>
                    <HelpCircle size={16} />
                    <span>Help & Support</span>
                  </button>
                </div>
                <div className={styles.menuDivider} />
                <button className={`${styles.menuItem} ${styles.logout}`}>
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