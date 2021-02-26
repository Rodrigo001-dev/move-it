import { useContext } from 'react';
import { ChanllengesContext } from '../contexts/ChanllengesContext';
import { CountdownContext } from '../contexts/CountdownContext';

import styles from '../styles/components/ChanllengeBox.module.css';

export function ChanllengeBox() {
  const { 
    activeChanllenge, 
    resetChanllenge, 
    completeChanllenge 
  } = useContext(ChanllengesContext);

  const { resetCountdown } = useContext(CountdownContext);

  function handleChallengeSucceeded() {
    completeChanllenge();
    resetCountdown();
  };

  function handleChallengeFailed() {
    resetChanllenge();
    resetCountdown();
  };
  
  return (
    <div className={styles.chanllengeBoxContainer}>
      { activeChanllenge ? (
        <div className={styles.chanllengeActive}>
          <header>Ganhe {activeChanllenge.amount} xp</header>

          <main>
            <img src={`icons/${activeChanllenge.type}.svg`} />
            <strong>Nodo desafio</strong>
            <p>{activeChanllenge.description}</p>
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