import styles from '../styles/components/ChanllengeBox.module.css';

export function ChanllengeBox() {
  const hasActiveChanllenge = true;
  
  return (
    <div className={styles.chanllengeBoxContainer}>
      { hasActiveChanllenge ? (
        <div className={styles.chanllengeActive}>
          <header>Ganhe 400 xp</header>

          <main>
            <img src="icons/body.svg" />
            <strong>Nodo desafio</strong>
            <p>Levante e faça uma caminhada de 3 minutos.</p>
          </main>

          <footer>
            <button 
              type="button"
              className={styles.chanllengeFailedButton}
            >
              Falhei
            </button>
            <button 
              type="button"
              className={styles.chanllengeSucceededButton}
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