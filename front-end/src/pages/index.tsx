import Head from 'next/head';

import { CompletedChanllenges } from '../components/CompletedChanllenges';
import { Countdown } from '../components/Countdown';
import { ExperienceBar } from '../components/ExperienceBar';
import { Profile } from '../components/Profile';
import { ChanllengeBox } from '../components/ChallengeBox';

import { CountdownProvider } from '../contexts/CountdownContext';

import styles from '../styles/pages/Home.module.css';

export default function Home() {
  return (
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
            <Profile />
            <CompletedChanllenges />
            <Countdown />
          </div>

          <div>
            <ChanllengeBox />
          </div>
        </section>
      </CountdownProvider>
    </div>

  )
}
