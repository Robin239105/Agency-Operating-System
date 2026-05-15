'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { 
  Search, 
  BookOpen, 
  FileText, 
  ChevronRight,
  Star,
  Clock,
  Eye,
  Plus,
  FolderOpen,
  Code,
  Layout,
  Zap,
  Shield,
  Database
} from 'lucide-react';
import styles from './KB.module.css';

interface Article {
  id: string;
  title: string;
  category: string;
  readTime: string;
  views: number;
  starred: boolean;
  excerpt: string;
}

const categories = [
  { id: 'getting-started', name: 'Getting Started', icon: Zap, color: 'var(--color-accent)', count: 8 },
  { id: 'design-system', name: 'Design System', icon: Layout, color: 'var(--color-ai)', count: 12 },
  { id: 'development', name: 'Development', icon: Code, color: 'var(--color-warning)', count: 15 },
  { id: 'security', name: 'Security', icon: Shield, color: 'var(--color-danger)', count: 6 },
  { id: 'integrations', name: 'Integrations', icon: Database, color: 'var(--color-success)', count: 9 },
];

const articles: Article[] = [
  { id: '1', title: 'Quick Start Guide: Setting Up Your First Project', category: 'Getting Started', readTime: '5 min', views: 1240, starred: true, excerpt: 'Learn how to create and configure your first project in just a few minutes.' },
  { id: '2', title: 'Understanding Color Tokens in the Design System', category: 'Design System', readTime: '8 min', views: 856, starred: false, excerpt: 'Deep dive into how color tokens are structured and how to use them.' },
  { id: '3', title: 'API Authentication: OAuth 2.0 Implementation', category: 'Development', readTime: '12 min', views: 634, starred: true, excerpt: 'Complete guide to implementing OAuth 2.0 authentication in your apps.' },
  { id: '4', title: 'Best Practices for Secure API Keys', category: 'Security', readTime: '6 min', views: 512, starred: false, excerpt: 'Essential security practices for managing API keys in production.' },
  { id: '5', title: 'Integrating with Slack: Webhooks & Events', category: 'Integrations', readTime: '10 min', views: 428, starred: false, excerpt: 'Step-by-step guide to setting up Slack integrations with your projects.' },
  { id: '6', title: 'Typography Scale & Font Usage', category: 'Design System', readTime: '7 min', views: 789, starred: true, excerpt: 'How to properly use the typography scale and font tokens.' },
];

export default function KBPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [search, setSearch] = useState('');

  const filteredArticles = articles.filter(article => {
    const matchesCategory = selectedCategory === 'all' || 
      article.category.toLowerCase().replace(' ', '-') === selectedCategory;
    const matchesSearch = article.title.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.titleGroup}>
          <h1 className="type-h2">Knowledgebase</h1>
          <p className="type-body" style={{ color: 'var(--color-text-3)' }}>
            Browse documentation, guides, and best practices.
          </p>
        </div>
        <Button variant="primary" leftIcon={<Plus size={18} />}>
          New Article
        </Button>
      </header>

      <div className={styles.mainContent}>
        <div className={styles.sidebar}>
          <div className={styles.searchBox}>
            <Search size={16} className={styles.searchIcon} />
            <input 
              type="text" 
              placeholder="Search knowledgebase..." 
              className={styles.searchInput}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className={styles.categories}>
            <button 
              className={`${styles.categoryBtn} ${selectedCategory === 'all' ? styles.active : ''}`}
              onClick={() => setSelectedCategory('all')}
            >
              <FolderOpen size={16} />
              <span>All Articles</span>
              <span className={styles.categoryCount}>{articles.length}</span>
            </button>
            {categories.map((cat) => (
              <button 
                key={cat.id}
                className={`${styles.categoryBtn} ${selectedCategory === cat.id ? styles.active : ''}`}
                onClick={() => setSelectedCategory(cat.id)}
              >
                <cat.icon size={16} style={{ color: cat.color }} />
                <span>{cat.name}</span>
                <span className={styles.categoryCount}>{cat.count}</span>
              </button>
            ))}
          </div>

          <Card className={styles.popularCard}>
            <h3 className={styles.popularTitle}>
              <Star size={14} />
              Popular Articles
            </h3>
            <div className={styles.popularList}>
              {articles.filter(a => a.starred).map(article => (
                <div key={article.id} className={styles.popularItem}>
                  <FileText size={12} />
                  <span>{article.title}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className={styles.articlesSection}>
          <div className={styles.sectionHeader}>
            <h2 className="type-h3">
              {selectedCategory === 'all' ? 'All Articles' : categories.find(c => c.id === selectedCategory)?.name}
            </h2>
            <span className={styles.articleCount}>{filteredArticles.length} articles</span>
          </div>

          <div className={styles.articlesList}>
            {filteredArticles.map((article, idx) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
              >
                <Card className={styles.articleCard} hoverable>
                  <div className={styles.articleContent}>
                    <div className={styles.articleMeta}>
                      <Badge variant="neutral">{article.category}</Badge>
                      {article.starred && <Star size={14} className={styles.starIcon} />}
                    </div>
                    <h3 className={styles.articleTitle}>{article.title}</h3>
                    <p className={styles.articleExcerpt}>{article.excerpt}</p>
                    <div className={styles.articleStats}>
                      <span><Clock size={12} /> {article.readTime}</span>
                      <span><Eye size={12} /> {article.views} views</span>
                    </div>
                  </div>
                  <div className={styles.articleAction}>
                    <ChevronRight size={18} className={styles.chevron} />
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}