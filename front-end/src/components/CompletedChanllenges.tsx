import { useContext } from 'react';
import { ChanllengesContext } from '../contexts/ChanllengesContext';

import styles from '../styles/components/CompletedChanllenges.module.css';

export function CompletedChanllenges() {
  const { chanllengesCompleted } = useContext(ChanllengesContext);

  return (
    <div className={styles.completedChanllengesContainer}>
      <span>Desafios completos</span>
      <span>{chanllengesCompleted}</span>
    </div>
  );
};