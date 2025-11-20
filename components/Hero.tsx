import styles from './Hero.module.css';

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.heroContent}>
        <h1 className={styles.heroTitle}>Céramique RAKU</h1>
        <p className={styles.heroSubtitle}>
          Créations artisanales uniques par Michelle Roberge
        </p>
        <p className={styles.heroDescription}>
          Découvrez l&apos;art ancestral du RAKU à travers des pièces uniques, 
          façonnées à la main avec passion et cuites selon la technique traditionnelle japonaise.
        </p>
        <a href="#portfolio" className={styles.heroButton}>
          Découvrir les œuvres
        </a>
      </div>
      <div className={styles.heroImage}>
        <div className={styles.imagePlaceholder}>
          {/* Image will be added via CSS background or img tag */}
        </div>
      </div>
    </section>
  );
}
