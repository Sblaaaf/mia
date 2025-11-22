'use client';

import { useState, useEffect } from 'react';
import styles from './ArtworkManagement.module.css';
import { Artwork } from '@/types';

export default function ArtworkManagement() {
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<Artwork>>({
    title: '',
    description: '',
    price: 0,
    images: [],
    dimensions: { height: 0, width: 0 },
    technique: 'RAKU',
    status: 'available',
    featured: false,
  });

  useEffect(() => {
    fetchArtworks();
  }, []);

  async function fetchArtworks() {
    try {
      const res = await fetch('/api/artworks');
      const data = await res.json();
      setArtworks(data);
    } catch (error) {
      console.error('Error fetching artworks:', error);
    } finally {
      setLoading(false);
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (editingId) {
        await fetch(`/api/artworks/${editingId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
      } else {
        await fetch('/api/artworks', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
      }
      
      setShowForm(false);
      setEditingId(null);
      setFormData({
        title: '',
        description: '',
        price: 0,
        images: [],
        dimensions: { height: 0, width: 0 },
        technique: 'RAKU',
        status: 'available',
        featured: false,
      });
      fetchArtworks();
    } catch (error) {
      console.error('Error saving artwork:', error);
    }
  };

  const handleEdit = (artwork: Artwork) => {
    setFormData(artwork);
    setEditingId(artwork._id || null);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cette œuvre ?')) return;
    
    try {
      await fetch(`/api/artworks/${id}`, { method: 'DELETE' });
      fetchArtworks();
    } catch (error) {
      console.error('Error deleting artwork:', error);
    }
  };

  if (loading) {
    return <div className={styles.loading}>Chargement...</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>Gestion des Œuvres</h2>
        <button onClick={() => setShowForm(!showForm)} className={styles.addButton}>
          {showForm ? 'Annuler' : 'Ajouter une œuvre'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGrid}>
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
              <label>Prix (€) *</label>
              <input
                type="number"
                step="0.01"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
                required
                className={styles.input}
              />
            </div>

            <div className={styles.formGroup}>
              <label>Technique *</label>
              <input
                type="text"
                value={formData.technique}
                onChange={(e) => setFormData({ ...formData, technique: e.target.value })}
                required
                className={styles.input}
              />
            </div>

            <div className={styles.formGroup}>
              <label>Statut *</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                required
                className={styles.input}
              >
                <option value="available">Disponible</option>
                <option value="reserved">Réservé</option>
                <option value="sold">Vendu</option>
              </select>
            </div>

            <div className={styles.formGroup}>
              <label>Hauteur (cm) *</label>
              <input
                type="number"
                value={formData.dimensions?.height}
                onChange={(e) => setFormData({
                  ...formData,
                  dimensions: { ...formData.dimensions!, height: parseFloat(e.target.value) }
                })}
                required
                className={styles.input}
              />
            </div>

            <div className={styles.formGroup}>
              <label>Largeur (cm) *</label>
              <input
                type="number"
                value={formData.dimensions?.width}
                onChange={(e) => setFormData({
                  ...formData,
                  dimensions: { ...formData.dimensions!, width: parseFloat(e.target.value) }
                })}
                required
                className={styles.input}
              />
            </div>

            <div className={styles.formGroup}>
              <label>Profondeur (cm)</label>
              <input
                type="number"
                value={formData.dimensions?.depth || ''}
                onChange={(e) => setFormData({
                  ...formData,
                  dimensions: { ...formData.dimensions!, depth: parseFloat(e.target.value) || undefined }
                })}
                className={styles.input}
              />
            </div>

            <div className={styles.formGroup}>
              <label>
                <input
                  type="checkbox"
                  checked={formData.featured}
                  onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                  className={styles.checkbox}
                />
                Œuvre mise en avant
              </label>
            </div>
          </div>

          <div className={styles.formGroup}>
            <label>Description *</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
              rows={4}
              className={styles.textarea}
            />
          </div>

          <div className={styles.formGroup}>
            <label>URLs des images (une par ligne)</label>
            <textarea
              value={formData.images?.join('\n') || ''}
              onChange={(e) => setFormData({
                ...formData,
                images: e.target.value.split('\n').filter(url => url.trim())
              })}
              rows={3}
              className={styles.textarea}
              placeholder="https://example.com/image1.jpg"
            />
          </div>

          <button type="submit" className={styles.submitButton}>
            {editingId ? 'Mettre à jour' : 'Créer'}
          </button>
        </form>
      )}

      <div className={styles.list}>
        {artworks.map((artwork) => (
          <div key={artwork._id} className={styles.card}>
            <div className={styles.cardImage}>
              {artwork.images && artwork.images.length > 0 ? (
                <img src={artwork.images[0]} alt={artwork.title} />
              ) : (
                <div className={styles.placeholder}></div>
              )}
            </div>
            <div className={styles.cardContent}>
              <h3>{artwork.title}</h3>
              <p className={styles.price}>{artwork.price.toFixed(2)} €</p>
              <p className={styles.status}>{artwork.status}</p>
              {artwork.featured && <span className={styles.badge}>En vedette</span>}
            </div>
            <div className={styles.cardActions}>
              <button onClick={() => handleEdit(artwork)} className={styles.editButton}>
                Modifier
              </button>
              <button onClick={() => handleDelete(artwork._id!)} className={styles.deleteButton}>
                Supprimer
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
