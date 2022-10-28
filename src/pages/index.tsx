import { LatLng } from 'leaflet';
import type { NextPage } from 'next'
import { type } from 'os';
import React, { createContext, ReactEventHandler, useEffect, useState } from 'react';
import { Urltonumber } from '../component/onClickSetState/onClickSetState';
import { newPoint } from './AddRoutePage';
import OriginPage from './Originpage';


export type LatLngRadius = {
  pos: LatLng;
  r: number;
}

export const LocationPointContext = createContext({} as {
  point: LatLng[]
  setPoint: React.Dispatch<React.SetStateAction<LatLng[]>>
  poly: LatLng[][]
  setPoly: React.Dispatch<React.SetStateAction<LatLng[][]>>
  temp: number,
  setTemp: React.Dispatch<React.SetStateAction<number>>
  pointFlag: boolean
  setPointFlag: React.Dispatch<React.SetStateAction<boolean>>
  relayFlag: boolean[]
  setRelayFlag: React.Dispatch<React.SetStateAction<boolean[]>>
});
export const NewPointContext = createContext({} as {
  newPoint: newPoint[]
  setNewPoint: React.Dispatch<React.SetStateAction<newPoint[]>>
  middle: newPoint[]
  setMiddle: React.Dispatch<React.SetStateAction<newPoint[]>>
  newMiddle: LatLng[]
  setNewMiddle: React.Dispatch<React.SetStateAction<LatLng[]>>
})

export const CircleContext = createContext({} as {
  circle: LatLngRadius[]
  setCircle: React.Dispatch<React.SetStateAction<LatLngRadius[]>>
  radius: number
  setRadius: React.Dispatch<React.SetStateAction<number>>
})

export const UserIdContext = createContext({} as {
  userId: string
  setUserId: React.Dispatch<React.SetStateAction<string>>
})

export const PageStateContext = createContext({} as {
  page: number
  setPage: React.Dispatch<React.SetStateAction<number>>
});


const Home: NextPage = () => {
  const [point, setPoint] = useState<LatLng[]>([]);
  const [middle, setMiddle] = useState<newPoint[]>([]);
  const [newMiddle, setNewMiddle] = useState<LatLng[]>([]);
  const [temp, setTemp] = useState<number>(0);
  const [poly, setPoly] = useState<LatLng[][]>([[]]);
  const [page, setPage] = useState<number>(0);
  const [radius, setRadius] = useState<number>(0);
  const [circle, setCircle] = useState<LatLngRadius[]>([]);
  const [userId, setUserId] = useState<string>('');
  const [pointFlag, setPointFlag] = useState<boolean>(false);
  const [relayFlag, setRelayFlag] = useState<boolean[]>([]);
  const [newPoint, setNewPoint] = useState<newPoint[]>([]);

  useEffect(() => window.addEventListener('popstate', () => setPage(Urltonumber(window.location.pathname))), [])
  return (
    <>
      <LocationPointContext.Provider value={{
        point,
        setPoint,
        poly,
        setPoly,
        temp,
        setTemp,
        pointFlag,
        setPointFlag,
        relayFlag,
        setRelayFlag
      }}>
        <NewPointContext.Provider value={{
          newPoint,
          setNewPoint,
          middle,
          setMiddle,
          newMiddle,
          setNewMiddle
        }}>
          <PageStateContext.Provider value={{ page, setPage }}>
            <CircleContext.Provider value={{ circle, setCircle, radius, setRadius }}>
              <UserIdContext.Provider value={{ userId, setUserId }}>
                <OriginPage />
              </UserIdContext.Provider>
            </CircleContext.Provider>
          </PageStateContext.Provider>
        </NewPointContext.Provider>
      </LocationPointContext.Provider>
    </>
  )
}

export default Home
