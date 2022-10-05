import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { createContext, useState } from 'react';

export const LoadingContext = createContext({} as {
  pageLoading: boolean,
  setPageLoading: React.Dispatch<React.SetStateAction<boolean>>
});

function MyApp({ Component, pageProps }: AppProps) {
  const [pageLoading, setPageLoading] = useState<boolean>(false);
  return (
    <>
      <LoadingContext.Provider value={{ pageLoading, setPageLoading }}>
        <Component {...pageProps} />
      </LoadingContext.Provider>
    </>
  )

}

export default MyApp
