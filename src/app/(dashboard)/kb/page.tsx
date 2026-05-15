'use client';

import React, { useState, useEffect } from 'react';
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
  Database,
  Sparkles,
  Loader2
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

interface Category {
  id: string;
  name: string;
  count: number;
}

export default function KBPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchKB();
  }, []);

  const fetchKB = async () => {
    try {
      const res = await fetch('/api/knowledgebase');
      const data = await res.json();
      if (data.articles) {
        setArticles(data.articles);
        setCategories(data.categories || []);
      }
    } catch (err) {
      console.error('Failed to fetch KB:', err);
    } finally {
      setLoading(false);
    }
  };

  const filteredArticles = articles.filter(article => {
    const matchesCategory = selectedCategory === 'all' || 
      article.category.toLowerCase().replace(' ', '-') === selectedCategory;
    const matchesSearch = article.title.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getCategoryIcon = (name: string) => {
    const icons: any = { 'Getting Started': Zap, 'Projects': Layout, 'Tasks': Code, 'Time': Clock, 'AI': Sparkles };
    return icons[name] || BookOpen;
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
            {(categories.length > 0 ? categories : [
              { id: 'getting-started', name: 'Getting Started', count: 5 },
              { id: 'projects', name: 'Projects', count: 8 },
              { id: 'tasks', name: 'Tasks', count: 6 },
            ]).map((cat) => {
              const Icon = getCategoryIcon(cat.name);
              return (
                <button 
                  key={cat.id}
                  className={`${styles.categoryBtn} ${selectedCategory === cat.id ? styles.active : ''}`}
                  onClick={() => setSelectedCategory(cat.id)}
                >
                  <Icon size={16} />
                  <span>{cat.name}</span>
                  <span className={styles.categoryCount}>{cat.count}</span>
                </button>
              );
            })}
          </div>

          <Card className={styles.popularCard}>
            <h3 className={styles.popularTitle}>
              <Star size={14} />
              Popular Articles
            </h3>
            <div className={styles.popularList}>
              {articles.filter(a => a.starred).slice(0, 3).map(article => (
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
              {selectedCategory === 'all' ? 'All Articles' : categories.find(c => c.id === selectedCategory)?.name || 'Articles'}
            </h2>
            <span className={styles.articleCount}>{filteredArticles.length} articles</span>
          </div>

          <div className={styles.articlesList}>
            {(filteredArticles.length > 0 ? filteredArticles : articles.slice(0, 3)).map((article, idx) => (
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