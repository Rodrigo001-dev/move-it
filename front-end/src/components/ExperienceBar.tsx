import { useContext } from 'react';
import { ChanllengesContext } from '../contexts/ChanllengesContext';

import styles from '../styles/components/ExperienceBar.module.css';

// vai criar no className caracteres unicos para que o css nunca interfira em
// outros componentes da aplicação, o css vai ficar exclusivo a esse excopo

export function ExperienceBar() {
  const { currentExperience, experienceToNextLevel } = useContext(ChanllengesContext);

  const percentToNextLevel = Math.round(currentExperience * 100) / experienceToNextLevel;

  return (
    <header className={styles.experienceBar}>
      <span>0 xp</span>
      <div>
        <div style={{ width: `${percentToNextLevel}%` }} />

        <span className={styles.currentExperience} style={{ left: `${percentToNextLevel}%` }}>
          {currentExperience} xp
        </span>
      </div>
      <span>{experienceToNextLevel} xp</span>
    </header>
  )
};