'use client';

import { useEffect, useState } from 'react';
import styles from './NewsSection.module.css';
import { NewsItem } from '@/types';

export default function NewsSection() {
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchNews() {
      try {
        const res = await fetch('/api/news');
        const data = await res.json();
        setNewsItems(data);
      } catch (error) {
        console.error('Error fetching news:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchNews();
  }, []);

  if (loading) {
    return (
      <section className={styles.newsSection}>
        <div className="container">
          <h2 className={styles.title}>Actualités</h2>
          <p className={styles.loading}>Chargement...</p>
        </div>
      </section>
    );
  }

  if (newsItems.length === 0) {
    return null;
  }

  return (
    <section className={styles.newsSection}>
      <div className="container">
        <h2 className={styles.title}>Actualités</h2>
        <div className={styles.newsGrid}>
          {newsItems.map((item) => (
            <article key={item._id} className={styles.newsCard}>
              {item.image && (
                <div className={styles.newsImage}>
                  <img src={item.image} alt={item.title} />
                </div>
              )}
              <div className={styles.newsContent}>
                <h3 className={styles.newsTitle}>{item.title}</h3>
                <p className={styles.newsText}>{item.content}</p>
                <p className={styles.newsDate}>
                  Expire le {new Date(item.expiresAt).toLocaleDateString('fr-FR')}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
