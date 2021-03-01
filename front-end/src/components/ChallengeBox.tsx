import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import { CountdownContext } from '../contexts/CountdownContext';

import styles from '../styles/components/ChanllengeBox.module.css';

export function ChallengeBox() {
  const { 
    activeChallenge, 
    resetChallenge, 
    completeChallenge 
  } = useContext(ChallengesContext);

  const { resetCountdown } = useContext(CountdownContext);

  function handleChallengeSucceeded() {
    completeChallenge();
    resetCountdown();
  };

  function handleChallengeFailed() {
    resetChallenge();
    resetCountdown();
  };
  
  return (
    <div className={styles.chanllengeBoxContainer}>
      { activeChallenge ? (
        <div className={styles.chanllengeActive}>
          <header>Ganhe {activeChallenge.amount} xp</header>

          <main>
            <img src={`icons/${activeChallenge.type}.svg`} />
            <strong>Nodo desafio</strong>
            <p>{activeChallenge.description}</p>
          </main>

          <footer>
            <button 
              type="button"
              className={styles.chanllengeFailedButton}
              onClick={handleChallengeFailed}
            >
              Falhei
            </button>
            <button 
              type="button"
              className={styles.chanllengeSucceededButton}
              onClick={handleChallengeSucceeded}
            >
              Completei
            </button>
          </footer>
        </div>
      ) : (
        <div className={styles.chanllengeNotActive}>
          <strong>Finalize um ciclo para receber um desafio</strong>
          <p>
            <img src="icons/level-up.svg" alt="Level Up" />
            Avance de level completando desafios.
          </p>
        </div>
      ) }
    </div>
  );
};