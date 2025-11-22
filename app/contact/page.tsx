'use client';

import { useState } from 'react';
import styles from './page.module.css';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    try {
      // In a real implementation, this would send to an API endpoint
      // For now, we'll just simulate a successful submission
      await new Promise(resolve => setTimeout(resolve, 1000));
      setStatus('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
      });
    } catch (error) {
      setStatus('error');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>Contact</h1>
        <p className={styles.intro}>
          N&apos;hésitez pas à me contacter pour toute question, commande ou visite d&apos;atelier.
        </p>

        <div className={styles.grid}>
          <div className={styles.contactInfo}>
            <h2>Informations</h2>
            
            <div className={styles.infoItem}>
              <h3>Email</h3>
              <p>contact@michelle-roberge.com</p>
            </div>

            <div className={styles.infoItem}>
              <h3>Téléphone</h3>
              <p>+33 6 12 34 56 78</p>
            </div>

            <div className={styles.infoItem}>
              <h3>Atelier</h3>
              <p>Sur rendez-vous uniquement</p>
              <p className={styles.address}>
                Adresse communiquée lors de la prise de rendez-vous
              </p>
            </div>

            <div className={styles.infoItem}>
              <h3>Horaires</h3>
              <p>Du mardi au samedi</p>
              <p>10h - 18h</p>
            </div>
          </div>

          <div className={styles.formSection}>
            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.formGroup}>
                <label htmlFor="name">Nom *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className={styles.input}
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="email">Email *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className={styles.input}
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="phone">Téléphone</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={styles.input}
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="subject">Sujet *</label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className={styles.input}
                >
                  <option value="">Sélectionnez un sujet</option>
                  <option value="purchase">Achat d&apos;une œuvre</option>
                  <option value="reservation">Réservation</option>
                  <option value="visit">Visite d&apos;atelier</option>
                  <option value="custom">Commande personnalisée</option>
                  <option value="other">Autre</option>
                </select>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="message">Message *</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className={styles.textarea}
                />
              </div>

              <button 
                type="submit" 
                className={styles.submitButton}
                disabled={status === 'sending'}
              >
                {status === 'sending' ? 'Envoi en cours...' : 'Envoyer'}
              </button>

              {status === 'success' && (
                <p className={styles.successMessage}>
                  Votre message a été envoyé avec succès ! Je vous répondrai dans les plus brefs délais.
                </p>
              )}

              {status === 'error' && (
                <p className={styles.errorMessage}>
                  Une erreur est survenue. Veuillez réessayer ou me contacter directement par email.
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
