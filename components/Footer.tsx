import styles from './Footer.module.css';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.footerContent}>
          <div className={styles.footerSection}>
            <h3 className={styles.footerTitle}>Michelle Roberge</h3>
            <p className={styles.footerText}>Artiste Céramiste RAKU</p>
          </div>
          
          <div className={styles.footerSection}>
            <h4 className={styles.footerSubtitle}>Navigation</h4>
            <ul className={styles.footerList}>
              <li><a href="/">Accueil</a></li>
              <li><a href="/about">À Propos</a></li>
              <li><a href="/contact">Contact</a></li>
            </ul>
          </div>

          <div className={styles.footerSection}>
            <h4 className={styles.footerSubtitle}>Contact</h4>
            <p className={styles.footerText}>Email: contact@michelle-roberge.com</p>
          </div>
        </div>
        
        <div className={styles.footerBottom}>
          <p>&copy; {currentYear} Michelle Roberge. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
}
