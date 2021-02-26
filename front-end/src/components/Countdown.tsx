import { useContext } from 'react';
import { CountdownContext } from '../contexts/CountdownContext';

import styles from '../styles/components/Countdown.module.css';

export function Countdown() {
  const { 
    minutes, 
    seconds, 
    hasFinished, 
    isActive,
    startCountdown,
    resetCountdown
  } = useContext(CountdownContext);

  // o padStart vai verificar se a String não tiver 2 caracteres ele vai
  // preencher o restante para a esquerda(padStart => no começo(esquerda, direita))
  // com 0(se for 5 vai colocar '0' e '5')
  // e o split vai dividir cada caracter e retornar no array(se for 25 vai
  // pegar '25' e repartir em duas variáveis '2' e '5')
  // minuteLeft => primeiro caracter do minuto.
  // minuteRight => segundo caracter do minuto.
  // essas duas linhas abaixo não fazem parte da regra de negócio da aplicação
  // essas duas linhas fazem parte da visualização, de como esse componente vai
  // apresenter esses dados em tela
  const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('');
  // fazendo a mesma coisa dos minutos para os segundos
  const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('');

  return (
    <div>
      <div className={styles.countdownContainer}>
        <div>
          <span>{minuteLeft}</span>
          <span>{minuteRight}</span>
        </div>

        <span>:</span>

        <div>
          <span>{secondLeft}</span>
          <span>{secondRight}</span>
        </div>
      </div>

      { hasFinished ? (
        <button
          disabled
          className={styles.countdownButton}
        >
          Ciclo encerrado
        </button>
      ) : (
        <>
          { isActive ? (
            <button
              type="button"
              className={`${styles.countdownButton} ${styles.countdownButtonActive}`}
              onClick={resetCountdown}
            >
              Abandonar ciclo
            </button>
          ) : (
            <button 
              type="button" 
              className={styles.countdownButton}
              onClick={startCountdown}
            >
              Iniciar um ciclo
            </button>
          ) }
        </>
      )}
    </div>
  );
};