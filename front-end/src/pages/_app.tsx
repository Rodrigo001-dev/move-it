import '../styles/global.css';

import { ChanllengesProvider } from '../contexts/ChanllengesContext';

function MyApp({ Component, pageProps }) {
  return (
    <ChanllengesProvider>
      <Component {...pageProps} />
    </ChanllengesProvider>
  )
}

export default MyApp
