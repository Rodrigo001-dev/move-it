import { useContext } from 'react';
import { ChanllengesContext } from '../contexts/ChanllengesContext';

import styles from '../styles/components/Profile.module.css';

export function Profile() {
  const { level } = useContext(ChanllengesContext);
  
  return (
    <div className={styles.profileContainer}>
      <img src="https://github.com/Rodrigo001-de.png" alt="Rodrigo Rael"/>
      <div>
        <strong>Rodrigo Rael</strong>
        <p>
          <img src="icons/level.svg" alt="Level" />
          Level {level}
        </p>
      </div>
    </div>
  );
};