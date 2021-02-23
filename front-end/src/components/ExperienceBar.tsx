import styles from '../styles/components/ExperienceBar.module.css';

// vai criar no className caracteres unicos para que o css nunca interfira em
// outros componentes da aplicação, o css vai ficar exclusivo a esse excopo

export function ExperienceBar() {
  return (
    <header className={styles.experienceBar}>
      <span>0 xp</span>
      <div>
        <div style={{ width: '50%' }} />

        <span className={styles.currentExperience} style={{ left: '50%' }}>
          300 xp
        </span>
      </div>
      <span>600 xp</span>
    </header>
  )
};