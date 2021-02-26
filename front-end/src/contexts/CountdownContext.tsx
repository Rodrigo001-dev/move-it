import { createContext, ReactNode, useContext, useState, useEffect } from 'react';

import { ChanllengesContext } from './ChanllengesContext';

interface CountdownContextData {
  minutes: number;
  seconds: number;
  hasFinished: boolean;
  isActive: boolean;
  startCountdown: () => void;
  resetCountdown: () => void;
};

interface CountdownProviderProps {
  children: ReactNode;
};

export const CountdownContext = createContext({} as CountdownContextData);

let countdownTimeout: NodeJS.Timeout;

export function CountdownProvider({ children }: CountdownProviderProps) {
  const { startNewChanllenge } = useContext(ChanllengesContext);

  // 25 * 60 representa 25 minutos em segundos
  const [time, setTime] = useState(25 * 60);
  // o active vai armazenar se o countdown esta ativo ou pausado e pausado é
  // como ele inicia
  const [isActive, setIsActive] = useState(false);
  const [hasFinished, setHasFinished] = useState(false);

  // fazendo time / 60 vai fazer com que eu tenha o número em minutos e o
  // Math.floor vai arredondar o número para baxio, ou seja, quando eu tiver
  // um número 24:59 vai arredondar para 24 minutos porque é o número de 
  // minutos totais que eu tenho 
  const minutes = Math.floor(time / 60);
  // o time % 60 vai pegar o resto da divisão, se for 24:59 o resto que não
  // coube na divisão foi os 59 minutos porque eu pedi para ele arredondar
  const seconds = time % 60;

  function startCountdown() {
    setIsActive(true);
  };

  function resetCountdown() {
    // clearTimeout(countdownTimeout) => eu estou cancelando a execução do
    // timeout porque mesmo colocando o isActive como false ele ainda vai
    // executar o timeout
    clearTimeout(countdownTimeout);
    setIsActive(false);
    setHasFinished(false);
    // voltanto o time para o valor inicial para voltar para 25 minutos
    setTime(25 * 60);
  };

  // o useEffect é um Hook, uma função para disparar efeitos colaterais.
  // efeitos colaterais são quando algo mudar ao quando algo acontecer, eu 
  // quero disparar algun efeito colateral.
  // o primeiro parâmetro dele é o que eu quero executar e sempre vai ser uma
  // função, o segundo parâmetro é quando eu quero executar, sempre é colocado
  // no array de dependências.
  // eu quero executar uma função sempre que o valor do active e do time mudar
  // para ele diminuir o tempo do count
  useEffect(() => {
    // se o active estiver true e o time for maior que 0
    if (isActive && time > 0) {
      // setTimeout quer dizer que eu quero executar algo depois de um tempo
      // nesse caso eu vou executar uma função depois de 1 segundo
      countdownTimeout = setTimeout(() => {
        // depois de 1 segundo eu vou reduzir o time para 1 segundo
        setTime(time - 1);
      }, 1000);
    } else if (isActive && time === 0) {
      setHasFinished(true);
      setIsActive(false);
      startNewChanllenge();
    }
  }, [isActive, time]);
  
  return (
    <CountdownContext.Provider value={{
      minutes,
      seconds,
      hasFinished,
      isActive,
      startCountdown,
      resetCountdown
    }}>
      {children}
    </CountdownContext.Provider>
  );
};