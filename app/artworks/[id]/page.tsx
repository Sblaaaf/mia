'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import styles from './page.module.css';
import { Artwork } from '@/types';

export default function ArtworkDetail() {
  const params = useParams();
  const [artwork, setArtwork] = useState<Artwork | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    async function fetchArtwork() {
      try {
        const res = await fetch(`/api/artworks/${params.id}`);
        const data = await res.json();
        setArtwork(data);
      } catch (error) {
        console.error('Error fetching artwork:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchArtwork();
  }, [params.id]);

  if (loading) {
    return <div className={styles.loading}>Chargement...</div>;
  }

  if (!artwork) {
    return <div className={styles.error}>Œuvre introuvable</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.gallery}>
          <div className={styles.mainImage}>
            {artwork.images && artwork.images.length > 0 ? (
              <img 
                src={artwork.images[currentImageIndex]} 
                alt={artwork.title}
              />
            ) : (
              <div className={styles.placeholder}></div>
            )}
          </div>
          {artwork.images && artwork.images.length > 1 && (
            <div className={styles.thumbnails}>
              {artwork.images.map((image, index) => (
                <button
                  key={index}
                  className={`${styles.thumbnail} ${index === currentImageIndex ? styles.active : ''}`}
                  onClick={() => setCurrentImageIndex(index)}
                >
                  <img src={image} alt={`${artwork.title} ${index + 1}`} />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className={styles.details}>
          <h1 className={styles.title}>{artwork.title}</h1>
          
          <div className={styles.price}>
            {artwork.price.toFixed(2)} €
          </div>

          <div className={styles.status}>
            {artwork.status === 'available' && (
              <span className={styles.available}>Disponible</span>
            )}
            {artwork.status === 'reserved' && (
              <span className={styles.reserved}>Réservé</span>
            )}
            {artwork.status === 'sold' && (
              <span className={styles.sold}>Vendu</span>
            )}
          </div>

          <div className={styles.info}>
            <h3>Détails</h3>
            <p>{artwork.description}</p>
            
            <div className={styles.specs}>
              <p><strong>Technique:</strong> {artwork.technique}</p>
              <p><strong>Dimensions:</strong> {artwork.dimensions.height} x {artwork.dimensions.width}
                {artwork.dimensions.depth && ` x ${artwork.dimensions.depth}`} cm
              </p>
            </div>
          </div>

          {artwork.status === 'available' && (
            <div className={styles.actions}>
              <a href="/contact" className={styles.btnPrimary}>
                Réserver cette œuvre
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
