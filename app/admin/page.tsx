'use client';

import { useState } from 'react';
import styles from './page.module.css';
import ArtworkManagement from '@/components/admin/ArtworkManagement';
import NewsManagement from '@/components/admin/NewsManagement';

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<'artworks' | 'news'>('artworks');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Simple authentication - in production, use proper auth
    if (credentials.email === 'admin@michelle-roberge.com' && credentials.password === 'admin123') {
      setIsAuthenticated(true);
    } else {
      setError('Identifiants incorrects');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className={styles.loginContainer}>
        <div className={styles.loginBox}>
          <h1 className={styles.loginTitle}>Administration</h1>
          <form onSubmit={handleLogin} className={styles.loginForm}>
            <div className={styles.formGroup}>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={credentials.email}
                onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
                required
                className={styles.input}
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="password">Mot de passe</label>
              <input
                type="password"
                id="password"
                value={credentials.password}
                onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                required
                className={styles.input}
              />
            </div>
            {error && <p className={styles.error}>{error}</p>}
            <button type="submit" className={styles.loginButton}>
              Se connecter
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.adminContainer}>
      <div className={styles.header}>
        <h1>Administration</h1>
        <button onClick={() => setIsAuthenticated(false)} className={styles.logoutButton}>
          Déconnexion
        </button>
      </div>

      <div className={styles.tabs}>
        <button
          className={`${styles.tab} ${activeTab === 'artworks' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('artworks')}
        >
          Œuvres
        </button>
        <button
          className={`${styles.tab} ${activeTab === 'news' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('news')}
        >
          Actualités
        </button>
      </div>

      <div className={styles.content}>
        {activeTab === 'artworks' && <ArtworkManagement />}
        {activeTab === 'news' && <NewsManagement />}
      </div>
    </div>
  );
}
