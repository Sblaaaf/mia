'use client';

import { useState, useEffect } from 'react';
import styles from './NewsManagement.module.css';
import { NewsItem } from '@/types';

export default function NewsManagement() {
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<Partial<NewsItem>>({
    title: '',
    content: '',
    image: '',
    expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
  });

  useEffect(() => {
    fetchNews();
  }, []);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      await fetch('/api/news', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      
      setShowForm(false);
      setFormData({
        title: '',
        content: '',
        image: '',
        expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      });
      fetchNews();
    } catch (error) {
      console.error('Error saving news:', error);
    }
  };

  if (loading) {
    return <div className={styles.loading}>Chargement...</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>Gestion des Actualités</h2>
        <button onClick={() => setShowForm(!showForm)} className={styles.addButton}>
          {showForm ? 'Annuler' : 'Ajouter une actualité'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label>Titre *</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
              className={styles.input}
            />
          </div>

          <div className={styles.formGroup}>
            <label>Contenu *</label>
            <textarea
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              required
              rows={5}
              className={styles.textarea}
            />
          </div>

          <div className={styles.formGroup}>
            <label>URL de l&apos;image</label>
            <input
              type="url"
              value={formData.image}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              className={styles.input}
              placeholder="https://example.com/image.jpg"
            />
          </div>

          <div className={styles.formGroup}>
            <label>Date d&apos;expiration *</label>
            <input
              type="date"
              value={formData.expiresAt instanceof Date ? formData.expiresAt.toISOString().split('T')[0] : ''}
              onChange={(e) => setFormData({ ...formData, expiresAt: new Date(e.target.value) })}
              required
              className={styles.input}
            />
          </div>

          <button type="submit" className={styles.submitButton}>
            Publier
          </button>
        </form>
      )}

      <div className={styles.list}>
        {newsItems.map((item) => (
          <div key={item._id} className={styles.card}>
            {item.image && (
              <div className={styles.cardImage}>
                <img src={item.image} alt={item.title} />
              </div>
            )}
            <div className={styles.cardContent}>
              <h3>{item.title}</h3>
              <p>{item.content}</p>
              <p className={styles.expiry}>
                Expire le {new Date(item.expiresAt).toLocaleDateString('fr-FR')}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
