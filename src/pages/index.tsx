import type { NextPage } from 'next'
import dynamic from 'next/dynamic'
import BaseMap from '../component/map/BaseMap'

const DynamicMap = dynamic(() => {
  return import('../component/map/BaseMap')
},
  { ssr: false }
);

const Home: NextPage = () => {
  return (
    <>
      <DynamicMap />
    </>
  )
}

export default Home
