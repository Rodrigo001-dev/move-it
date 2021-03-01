import Head from 'next/head';
import { GetServerSideProps } from 'next';

import { CompletedChallenges } from '../components/CompletedChallenges';
import { Countdown } from '../components/Countdown';
import { ExperienceBar } from '../components/ExperienceBar';
import { Profile } from '../components/Profile';
import { ChallengeBox } from '../components/ChallengeBox';

import { CountdownProvider } from '../contexts/CountdownContext';
import { ChallengesProvider } from '../contexts/ChallengesContext';

import styles from '../styles/pages/Home.module.css';

interface userGitHub {
  name: string;
  avatar_url: string;
}

interface HomeProps {
  user: userGitHub
  level: number;
  currentExperience: number;
  challengesCompleted: number;
};

// do meu componente eu posso acessar as props que estãod sendo retornadas
// da função getServerSideProps passado um parâmetro chamda props
export default function Home(props: HomeProps) {
  return (
    <ChallengesProvider
      level={props.level}
      currentExperience={props.currentExperience}
      challengesCompleted={props.challengesCompleted}
    >
        <div className={styles.container}>
        <Head>
          <title>Move.It</title>
        </Head>

        <ExperienceBar />

        {
          /* 
            eu coloquei o contexto de Countdown aqui e não no _app.tsx porque
            se eu tivesse colocado no _app.tsx eu estaria dizendo que todas as
            páginas da minha aplicação pode ter acesso ao contexto de Countdown
            mas esse contexto aparenta que não vai ser utilizando em outras 
            páginas por isso coloquei somente na minha página index da aplicação
          */
        }
        <CountdownProvider>
          <section>
            <div>
              <Profile { ...props.user } />
              <CompletedChallenges />
              <Countdown />
            </div>

            <div>
              <ChallengeBox />
            </div>
          </section>
        </CountdownProvider>
      </div>
    </ChallengesProvider>

  )
}

// o Next.js trabalha com três camadas:
// a camada do Back-end que está rodando o servidor
// a camada intermediária do Next.js que está rodando um servidor Node.js e é 
// nessa camada que está rodando o servidor Front-end e essa camada vai ser 
// responsável por construir a interface que o usuário vai acessar
// e tem a camada do Front-end(React)

// quando eu declaro a função getServerSideProps dentro de alguma página da
// aplicação eu consigo manipular quais dados são repassados da camada
// intermediária no Next.js(que está rodado um servidor Node) para a camada 
// Front-end(React), ou seja, eu consigo manipular quais dados são repassados do
// servidor Next(Node) back-end para o meu cliente(Front-end) que roda em React
// por exemplo dentro dessa função getServerSideProps eu posso fazer uma chamada
// a API que busca alguns dados para eu preencher esses dados na interface
// a diferença entre fazer uma chamada a API dentro da função getServerSideProps
// e fazer dnetro do próprio componente é que tudo o que eu fizer de chamada para
// serviço externo, tudo o que é assíncrono que eu fizer dentro do meu componente
// não vai estar disponível na minha tela quando um motor de busca como o google
// por exemplo for acessar a minha aplicação porque o motor de busca do google 
// não vai aguardar essa chamada ser finalizado porque essa chamada vai rodar
// no browser então toda chamada a API ou algun serviço que eu esteja chamando
// que for colocada dentro do componente em si é uma chamada que vai acontecer
// somente pelo browser, mas se eu faço a chamada ou o acesso ao serviço externo
// no método getServerSideProps o que o Next.js vai fazer é o seguinte: antes
//  de construir a interface, antes da interface estar visível em tela, antes de
// finalizar o carregamento da tela ele vai fazer a chamada a API, vai pegar os
// dados, vai repassar para o meu componente os dados já prontos e aí meu 
// componente mostra aqueles dados em tela, então tudo o que eu passar aqui
// nesse componente getServerSideProps vai estar rodando dentro da camada 
// intermediária(servidor Node do Next)
// o Next nasceu dessa função(getServerSideProps) que antes se chamava
// getInitialProps
export const getServerSideProps: GetServerSideProps = async (ctx) => {
  // nessa função é recebido um parâmetro chamado contexto(ctx)
  const { username } = ctx.params;
  const response = await fetch(`https://api.github.com/users/${username}`);
  const user = await response.json();

  // eu estou pegando todas as informações que estão sendo salvas dentro dos
  // cookies
  const { level, currentExperience, challengesCompleted } = ctx.req.cookies;

  return {
    props: {
      user,
      // estou convertendo todas as informações que estão vido dos cookies para
      // number porque todas as informações que estão dentro dos cookies são
      // strings
      level: Number(level),
      currentExperience: Number(currentExperience),
      challengesCompleted: Number(challengesCompleted),
    }
  };
};
