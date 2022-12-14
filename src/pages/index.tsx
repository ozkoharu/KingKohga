import { LatLng } from 'leaflet';
import type { NextPage } from 'next'
import { type } from 'os';
import React, { createContext, ReactEventHandler, useEffect, useState } from 'react';
import { Urltonumber } from '../component/onClickSetState/onClickSetState';
import { newPoint } from './AddRoutePage';
import OriginPage from './Originpage';


export type LatLngRadius = {
  Position: LatLng;
  radius: number;
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
  viewcircle: LatLngRadius[]
  setViewCircle: React.Dispatch<React.SetStateAction<LatLngRadius[]>>
  viewRadius: number
  setViewRadius: React.Dispatch<React.SetStateAction<number>>
})

export const UserIdContext = createContext({} as {
  userId: string
  setUserId: React.Dispatch<React.SetStateAction<string>>
})

export const PageStateContext = createContext({} as {
  page: number
  setPage: React.Dispatch<React.SetStateAction<number>>
});
export const ExistsToAddRouteContext = createContext({} as {
  goRoute: boolean
  setGoRoute: React.Dispatch<React.SetStateAction<boolean>>
})
export const ChangeShortCut = createContext({} as {
  firstPage: boolean;
  setFirstPage: React.Dispatch<React.SetStateAction<boolean>>;
  secondPage: boolean;
  setSecondPage: React.Dispatch<React.SetStateAction<boolean>>;
  thirdPage: boolean;
  setThirdPage: React.Dispatch<React.SetStateAction<boolean>>;
})

const Home: NextPage = () => {
  const [point, setPoint] = useState<LatLng[]>([]);
  const [middle, setMiddle] = useState<newPoint[]>([]);
  const [newMiddle, setNewMiddle] = useState<LatLng[]>([]);
  const [temp, setTemp] = useState<number>(0);
  const [poly, setPoly] = useState<LatLng[][]>([[]]);
  const [page, setPage] = useState<number>(0);
  const [radius, setRadius] = useState<number>(0);
  const [circle, setCircle] = useState<LatLngRadius[]>([]);
  const [viewcircle, setViewCircle] = useState<LatLngRadius[]>([]);
  const [viewRadius, setViewRadius] = useState<number>(0);
  const [userId, setUserId] = useState<string>('');
  const [pointFlag, setPointFlag] = useState<boolean>(false);
  const [relayFlag, setRelayFlag] = useState<boolean[]>([]);
  const [newPoint, setNewPoint] = useState<newPoint[]>([]);
  const [goRoute, setGoRoute] = useState<boolean>(false);
  const [firstPage, setFirstPage] = useState<boolean>(false);
  const [secondPage, setSecondPage] = useState<boolean>(false);
  const [thirdPage, setThirdPage] = useState<boolean>(false);

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
            <ExistsToAddRouteContext.Provider value={{ goRoute, setGoRoute }}>
              <CircleContext.Provider value={{
                circle,
                setCircle,
                radius,
                setRadius,
                viewcircle,
                setViewCircle,
                viewRadius,
                setViewRadius
              }}>
                <UserIdContext.Provider value={{ userId, setUserId }}>
                  <ChangeShortCut.Provider value={{
                    firstPage,
                    setFirstPage,
                    secondPage,
                    setSecondPage,
                    thirdPage,
                    setThirdPage
                  }}>
                    <OriginPage />
                  </ChangeShortCut.Provider>
                </UserIdContext.Provider>
              </CircleContext.Provider>
            </ExistsToAddRouteContext.Provider>
          </PageStateContext.Provider>
        </NewPointContext.Provider>
      </LocationPointContext.Provider>
    </>
  )
}

export default Home
