import { createContext, useState, ReactNode } from 'react';
import chanllenges from '../../challenges.json';

// o contexto é utilizado para passar informações de um componente para outro
// nesse caso estou utilizando o Context API do React.
// contexto é uma forma de ter acesso a um informação de diversos lugares

interface Chanllenge {
  type: 'body' | 'eye'; // o valor do type ou é body ou é eye
  description: string;
  amount: number;
}

interface ChanllengesContextData {
  level: number;
  currentExperience: number;
  experienceToNextLevel: number;
  chanllengesCompleted: number;
  activeChanllenge: Chanllenge
  levelUp: () => void;
  startNewChanllenge: () => void;
  resetChanllenge: () => void;
};

interface ChanllengesProviderProps {
  // o ReactNode vai aceitar qualquer elemento filho como children
  children: ReactNode;
};

export const ChanllengesContext = createContext({} as ChanllengesContextData);

export function ChanllengesProvider({ children }: ChanllengesProviderProps) {
  const [level, setLevel] = useState(1);
  const [currentExperience, setCurrentExperience] = useState(0);
  const [chanllengesCompleted, setChanllengesCompleted] = useState(0);

  const [activeChanllenge, setActiveChanllenge] = useState(null);

  // o math.pow vai fazer um calculo em potência.
  // vai ser um calculo na potência 2 e level + 1 porque eu queor saber o proximo
  // level vezes 4, o quetro é o fator de experiência que pode aumentar ou 
  // diminuir basiado se vai deixar mais difícil ou mais facíl
  const experienceToNextLevel = Math.pow((level + 1) * 4, 2);

  function levelUp() {
    setLevel(level + 1)
  };

  function startNewChanllenge() {
    // o Math.floor é para arredondar os números para baixo.
    // para gerar um número aleatório de 0 a 1 utiliza o Math.random()
    // mas para gerar qualquer número aleatório eu preciso falar o que é esse
    // aleatório(* chanllenges.length) e nesse caso é o número de chanllenges
    // que eu tenho no arquivo json chanllenges.json
    const randomChanllengeIndex = Math.floor(Math.random() * chanllenges.length);
    // agora e tenho o desafio dentro do chanllenge
    const chanllenge = chanllenges[randomChanllengeIndex];

    setActiveChanllenge(chanllenge);
  };

  function resetChanllenge() {
    // quado o usuário falhar no desafio
    setActiveChanllenge(null);
  };

  return (
    // o  ChanllengesContext.Provider vai fazer com que todos os elementos
    // dentro do provider vão ter acesso aos dados daquele contexto, todos os
    // dados que for armazenados dentro do contexto, ou seja, toda a minha
    // aplicação vai ter acesso ao contexto de ChanllengesContext
    // o Provider recebe um a propriedade chamada value que é o que eu quero
    // enviar de informação 

    <ChanllengesContext.Provider 
      value={{ 
        level, 
        currentExperience,
        experienceToNextLevel,
        chanllengesCompleted,
        activeChanllenge,
        levelUp,
        startNewChanllenge,
        resetChanllenge
      }}
    >
      {children}
    </ChanllengesContext.Provider>
  );
};