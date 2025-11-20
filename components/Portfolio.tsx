'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from './Portfolio.module.css';
import { Artwork } from '@/types';

export default function Portfolio() {
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchArtworks() {
      try {
        const res = await fetch('/api/artworks?featured=true');
        const data = await res.json();
        setArtworks(data);
      } catch (error) {
        console.error('Error fetching artworks:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchArtworks();
  }, []);

  if (loading) {
    return (
      <section id="portfolio" className={styles.portfolio}>
        <div className="container">
          <h2 className={styles.title}>Collection</h2>
          <p className={styles.loading}>Chargement...</p>
        </div>
      </section>
    );
  }

  return (
    <section id="portfolio" className={styles.portfolio}>
      <div className="container">
        <h2 className={styles.title}>Collection</h2>
        <p className={styles.subtitle}>
          Découvrez une sélection de pièces uniques en céramique RAKU
        </p>
        
        <div className={styles.grid}>
          {artworks.length === 0 ? (
            <p className={styles.empty}>Aucune œuvre disponible pour le moment.</p>
          ) : (
            artworks.map((artwork) => (
              <Link 
                key={artwork._id} 
                href={`/artworks/${artwork._id}`}
                className={styles.card}
              >
                <div className={styles.imageContainer}>
                  {artwork.images && artwork.images.length > 0 ? (
                    <img 
                      src={artwork.images[0]} 
                      alt={artwork.title}
                      className={styles.image}
                    />
                  ) : (
                    <div className={styles.imagePlaceholder}></div>
                  )}
                  {artwork.status === 'sold' && (
                    <div className={styles.soldBadge}>Vendu</div>
                  )}
                  {artwork.status === 'reserved' && (
                    <div className={styles.reservedBadge}>Réservé</div>
                  )}
                </div>
                <div className={styles.cardContent}>
                  <h3 className={styles.cardTitle}>{artwork.title}</h3>
                  <p className={styles.cardPrice}>
                    {artwork.price.toFixed(2)} €
                  </p>
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
