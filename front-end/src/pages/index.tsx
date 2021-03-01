import React, {  FormEvent, useCallback, useRef, useState } from 'react';

import { useRouter } from 'next/router';
import { FiGithub, FiLogIn } from 'react-icons/fi';

import styles from '../styles/pages/Login.module.css';
import Head from 'next/head';

export default function Profile() {
  const inputRef = useRef<HTMLInputElement>(null);

  const { push } = useRouter();
  const [username, setUsername] = useState('');

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (username) {
      push(`/${username}`);
    }
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Move.It</title>
      </Head>
      <div className={styles.content}>
        <img src="logo.svg" alt="Logo" />
        <strong>Bem-vindo</strong>

        <div className={styles.title}>
          <FiGithub size={36} />
          <span>Faça login com seu GitHub para iniciar.</span>
        </div>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Digite seu username"
            onChange={(event) => setUsername(event.target.value)}
            ref={inputRef}
          />
          <button type="submit">
            <FiLogIn size={36} />
          </button>
        </form>
      </div>
    </div>
  );
}