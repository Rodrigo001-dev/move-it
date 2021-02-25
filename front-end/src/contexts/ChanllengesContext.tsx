import { createContext, useState, ReactNode } from 'react';

// o contexto é utilizado para passar informações de um componente para outro
// nesse caso estou utilizando o Context API do React.
// contexto é uma forma de ter acesso a um informação de diversos lugares

interface ChanllengesContextData {
  level: number;
  currentExperience: number;
  chanllengesCompleted: number;
  levelUp: () => void;
  startNewChanllenge: () => void;
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

  function levelUp() {
    setLevel(level + 1)
  };

  function startNewChanllenge() {
    console.log('OPA!!!!!!!!!!!!!');
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
        chanllengesCompleted,
        levelUp,
        startNewChanllenge
      }}
    >
      {children}
    </ChanllengesContext.Provider>
  );
};