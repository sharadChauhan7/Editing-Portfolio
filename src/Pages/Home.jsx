// Home.jsx
import { Suspense, lazy } from 'react'

const Landing = lazy(() => import('./Landing'))
const Aboutus = lazy(() => import('./Aboutus'))
const Booking = lazy(() => import('./Booking'))
const Footer = lazy(() => import('./Footer'))
const Content = lazy(() => import('./Content'))
const VideoCompareCard = lazy(() => import('../components/VideoCompareCard'))
const EditingCompareCard = lazy(() => import('../components/EditingCompareCard'))

import { projectData } from './data'
import { trendingData } from './data'

function Home() {
  return (
    <div className='relative w-full  bg-[#1C1F20] text-[#D3D0C9] overflow-hidden'>
      <Suspense
        fallback={
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#1C1F20]">
            <div className="relative px-6 py-5 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md text-[#D3D0C9] shadow-[0_0_40px_#ffffff10] animate-pulse max-w-[90%] sm:max-w-md text-center">
              <span className="text-base sm:text-lg md:text-xl font-light">
                Loading, please wait...
              </span>
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-white/10 blur-2xl opacity-10 rounded-2xl z-0" />
            </div>
          </div>
        }
      >
        <Landing />
        <EditingCompareCard />
        <VideoCompareCard />
        <Content projectData={projectData} />
        <Content projectData={trendingData} />
        <Aboutus />
        <Booking />
        <Footer />
      </Suspense>
    </div>
  )
}

export default Home
