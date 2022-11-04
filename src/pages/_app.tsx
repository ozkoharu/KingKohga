import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { createContext, useState } from 'react';
import { PageLoading } from '../component/hooks/pageLoading';
import '../styles/modal.css'
import '../styles/video.css'

export const LoadingContext = createContext({} as {
  pageLoading: boolean,
  setPageLoading: React.Dispatch<React.SetStateAction<boolean>>
});

function MyApp({ Component, pageProps }: AppProps) {
  const [pageLoading, setPageLoading] = useState<boolean>(false);
  return (
    <>
      <PageLoading isShow={pageLoading} />
      <LoadingContext.Provider value={{ pageLoading, setPageLoading }}>
        <Component {...pageProps} />
      </LoadingContext.Provider>
    </>
  )

}

export default MyApp
