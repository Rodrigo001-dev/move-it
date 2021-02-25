import Head from 'next/head';

import { CompletedChanllenges } from '../components/CompletedChanllenges';
import { Countdown } from '../components/Countdown';
import { ExperienceBar } from '../components/ExperienceBar';
import { Profile } from '../components/Profile';
import { ChanllengeBox } from '../components/ChallengeBox';


import styles from '../styles/pages/Home.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Move.It</title>
      </Head>

      <ExperienceBar />

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
    </div>

  )
}
