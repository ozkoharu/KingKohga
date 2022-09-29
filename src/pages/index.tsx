import { LatLng } from 'leaflet';
import type { NextPage } from 'next'
import dynamic from 'next/dynamic'
import React, { createContext, useState } from 'react';
import BaseMap from '../component/map/BaseMap'
import WelcomePage from './WelcomePage';

const DynamicMap = dynamic(() => {
  return import('../component/map/BaseMap')
},
  { ssr: false }
);

//Providerの設定はここ
//ダイナミックインポートは少しの間ここに置かせてくだ際

export const LocationPointContext = createContext({} as {
  point: LatLng[]
  setPoint: React.Dispatch<React.SetStateAction<LatLng[]>>
  poly: LatLng[][]
  setPoly: React.Dispatch<React.SetStateAction<LatLng[][]>>
})
const Home: NextPage = () => {
  const [point, setPoint] = useState<LatLng[]>([]);
  const [poly, setPoly] = useState<LatLng[][]>([[]]);

  return (
    <>
      <LocationPointContext.Provider value={{ point, setPoint, poly, setPoly }}>
        <WelcomePage />
      </LocationPointContext.Provider>
    </>
  )
}

export default Home
