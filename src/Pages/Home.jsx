
import Landing from './Landing.jsx'
import Aboutus from './Aboutus.jsx'
import Booking from './Booking.jsx'
import Footer from './Footer.jsx'
import Content from './Content.jsx'
import { projectData } from './data.js'
import { trendingData } from './data.js'
import VideoCompareCard from '../components/VideoCompareCard.jsx'
import EditingCompareCard from '../components/EditingCompareCard.jsx'
function Home() {
  return (
    <> 
      <div className='bg-[#1C1F20] text-[#D3D0C9]'>

      <Landing />
      <EditingCompareCard/>
      <VideoCompareCard/>
      <Content projectData={projectData} />
      <Content projectData={trendingData} />
      <Aboutus />
      <Booking />
      <Footer />
      </div>
    </>
  )
}

export default Home