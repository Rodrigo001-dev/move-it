import { createContext, useState, ReactNode, useEffect } from 'react';
import Cookies from 'js-cookie';
import challenges from '../../challenges.json';

// o contexto é utilizado para passar informações de um componente para outro
// nesse caso estou utilizando o Context API do React.
// contexto é uma forma de ter acesso a um informação de diversos lugares

interface Challenge {
  type: 'body' | 'eye'; // o valor do type ou é body ou é eye
  description: string;
  amount: number;
}

interface ChallengesContextData {
  level: number;
  currentExperience: number;
  experienceToNextLevel: number;
  challengesCompleted: number;
  activeChallenge: Challenge
  levelUp: () => void;
  startNewChallenge: () => void;
  resetChallenge: () => void;
  completeChallenge: () => void;
};

interface ChallengesProviderProps {
  // o ReactNode vai aceitar qualquer elemento filho como children
  children: ReactNode;
};

export const ChallengesContext = createContext({} as ChallengesContextData);

export function ChallengesProvider({ children }: ChallengesProviderProps) {
  const [level, setLevel] = useState(1);
  const [currentExperience, setCurrentExperience] = useState(0);
  const [challengesCompleted, setChallengesCompleted] = useState(0);

  const [activeChallenge, setActiveChallenge] = useState(null);

  // o math.pow vai fazer um calculo em potência.
  // vai ser um calculo na potência 2 e level + 1 porque eu queor saber o proximo
  // level vezes 4, o quetro é o fator de experiência que pode aumentar ou 
  // diminuir basiado se vai deixar mais difícil ou mais facíl
  const experienceToNextLevel = Math.pow((level + 1) * 4, 2);

  // quando passa um array vazio no useEffect ele vai executar a função uma 
  // unica vez quando o componente for exibido em tela
  useEffect(() => {
    // pedeindo permissão para mostrar notificações
    Notification.requestPermission();
  }, []);

  useEffect(() => {
    // estou salvando o level dentro dos cookies e como ele só aceita String e o
    // level é um Number eu estou convertendo ele para String
    Cookies.set('level', String(level));
    //salvando a experiência atual do usuário nos cookies
    Cookies.set('currentExperience', String(currentExperience));
    // salvando os desafios concluidos do usuário nos cookies
    Cookies.set('challengesCompleted', String(challengesCompleted));
    // eu estou colocando essas três informações no array de dependências do 
    // useEffect porque eu quero disparar uma função assim que esses valores
    // mudarem e salvar eles no cookies
  }, [level, currentExperience, challengesCompleted]);

  function levelUp() {
    setLevel(level + 1)
  };

  function startNewChallenge() {
    // o Math.floor é para arredondar os números para baixo.
    // para gerar um número aleatório de 0 a 1 utiliza o Math.random()
    // mas para gerar qualquer número aleatório eu preciso falar o que é esse
    // aleatório(* challenges.length) e nesse caso é o número de chanllenges
    // que eu tenho no arquivo json chanllenges.json
    const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
    // agora e tenho o desafio dentro do chanllenge
    const challenge = challenges[randomChallengeIndex];

    setActiveChallenge(challenge);

    // executando o audio de notificação
    new Audio('/notification.mp3').play();

    // se o usuário deu permissões para eu enviar notificações para ele 
    if (Notification.permission === 'granted') {
      new Notification('Novo desafio 💪', {
        body: `Valendo ${challenge.amount}xp!`
      });
    };
  };

  function resetChallenge() {
    // quado o usuário falhar no desafio
    setActiveChallenge(null);
  };

  function completeChallenge() {
    // essa função não pode ser chamada se o usuário se o usuário não tiver com
    // um chanllenge ativo por isso está fazendo a validação se não está com 
    // chanllenge ativo então retorne nada
    if (!activeChallenge) {
      return;
    }

    // estou pegando a quantidade de experiência que o desafio dá
    const { amount } = activeChallenge;

    // estou somando a experiência atual do usuário com o valor de experiência
    // que o desafio dá
    let finalExperience = currentExperience + amount;

    // se o valor final de experiência for maior ou igual a experiência que o 
    // usuário precisa para passar de level, eu vou upar o usuáriode
    // level(levelUp()) e vou falar que a experiência final do usuário é igual
    // ao total que ele ficou no final menos a quantidade de experiência que ele
    // precisava para passar de level
    if (finalExperience >= experienceToNextLevel) {
      finalExperience = finalExperience - experienceToNextLevel;
      levelUp();
    }

    setCurrentExperience(finalExperience);
    setActiveChallenge(null);
    // atualizando o numero de desafios completados
    setChallengesCompleted(challengesCompleted + 1);
  };

  return (
    // o  ChallengesContext.Provider vai fazer com que todos os elementos
    // dentro do provider vão ter acesso aos dados daquele contexto, todos os
    // dados que for armazenados dentro do contexto, ou seja, toda a minha
    // aplicação vai ter acesso ao contexto de ChallengesContext
    // o Provider recebe um a propriedade chamada value que é o que eu quero
    // enviar de informação 

    <ChallengesContext.Provider 
      value={{ 
        level, 
        currentExperience,
        experienceToNextLevel,
        challengesCompleted,
        activeChallenge,
        levelUp,
        startNewChallenge,
        resetChallenge,
        completeChallenge
      }}
    >
      {children}
    </ChallengesContext.Provider>
  );
};