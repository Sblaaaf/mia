'use client';

import Link from 'next/link';
import { useState } from 'react';
import styles from './Header.module.css';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className={styles.header}>
      <div className="container">
        <div className={styles.headerContent}>
          <Link href="/" className={styles.logo}>
            Michelle Roberge
          </Link>
          
          <button 
            className={styles.menuToggle} 
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <span className={styles.menuIcon}></span>
            <span className={styles.menuIcon}></span>
            <span className={styles.menuIcon}></span>
          </button>

          <nav className={`${styles.nav} ${isMenuOpen ? styles.navOpen : ''}`}>
            <Link href="/" className={styles.navLink} onClick={() => setIsMenuOpen(false)}>
              Accueil
            </Link>
            <Link href="/about" className={styles.navLink} onClick={() => setIsMenuOpen(false)}>
              À Propos
            </Link>
            <Link href="/contact" className={styles.navLink} onClick={() => setIsMenuOpen(false)}>
              Contact
            </Link>
            <Link href="/admin" className={styles.navLink} onClick={() => setIsMenuOpen(false)}>
              Admin
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
