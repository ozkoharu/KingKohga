import { LatLng } from 'leaflet';
import type { NextPage } from 'next'
import React, { createContext, useEffect, useState } from 'react';
import { Urltonumber } from '../component/onClickSetState/onClickSetState';
import OriginPage from './Originpage';



export const LocationPointContext = createContext({} as {
  point: LatLng[]
  setPoint: React.Dispatch<React.SetStateAction<LatLng[]>>
  poly: LatLng[][]
  setPoly: React.Dispatch<React.SetStateAction<LatLng[][]>>
});


export const PageStateContext = createContext({} as {
  page: number
  setPage: React.Dispatch<React.SetStateAction<number>>
});
const Home: NextPage = () => {
  const [point, setPoint] = useState<LatLng[]>([]);
  const [poly, setPoly] = useState<LatLng[][]>([[]]);
  const [page, setPage] = useState<number>(0);



  useEffect(() => window.addEventListener('popstate', () => setPage(Urltonumber(window.location.pathname))), [])
  return (
    <>
      <LocationPointContext.Provider value={{ point, setPoint, poly, setPoly }}>
        <PageStateContext.Provider value={{ page, setPage }}>
          <OriginPage />
        </PageStateContext.Provider>
      </LocationPointContext.Provider>
    </>
  )
}

export default Home
