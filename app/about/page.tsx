import styles from './page.module.css';

export default function AboutPage() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>À Propos</h1>
        
        <div className={styles.grid}>
          <div className={styles.imageSection}>
            <div className={styles.artistImage}>
              {/* Artist photo placeholder */}
            </div>
          </div>

          <div className={styles.textSection}>
            <h2>Michelle Roberge</h2>
            <h3 className={styles.subtitle}>Artiste Céramiste RAKU</h3>
            
            <div className={styles.bio}>
              <p>
                Passionnée par l&apos;art de la céramique RAKU depuis plus de 15 ans, 
                je crée des pièces uniques qui allient tradition japonaise et sensibilité contemporaine.
              </p>
              
              <p>
                Chaque création est le fruit d&apos;un travail méticuleux, de la conception 
                à la cuisson selon la technique ancestrale du RAKU. Cette méthode de 
                cuisson rapide à haute température, suivie d&apos;un refroidissement brutal, 
                confère à chaque pièce des couleurs et des textures uniques et imprévisibles.
              </p>

              <p>
                Mon atelier est situé au cœur de la nature, où je puise mon inspiration 
                dans les formes organiques et les éléments naturels. Chaque œuvre raconte 
                une histoire, capture un moment, exprime une émotion.
              </p>
            </div>

            <div className={styles.technique}>
              <h3>La Technique RAKU</h3>
              <p>
                Le RAKU est une technique de cuisson d&apos;origine japonaise qui se caractérise 
                par une sortie du four à très haute température (environ 1000°C) et un 
                refroidissement rapide. Les pièces sont ensuite placées dans des matières 
                combustibles (sciure, paille) qui créent une réduction d&apos;oxygène, donnant 
                ces effets métalliques et craquelés si caractéristiques.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
