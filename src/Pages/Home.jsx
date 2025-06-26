
import Landing from './Landing.jsx'
import Aboutus from './Aboutus.jsx'
import Booking from './Booking.jsx'
import Footer from './Footer.jsx'
import Content from './Content.jsx'
import { projectData } from './data.js'
import { trendingData } from './data.js'
import VideoCompareCard from '../components/VideoCompareCard.jsx'
function Home() {
  return (
    <>
      <Landing />
      <VideoCompareCard/>
      <Content projectData={projectData} />
      <Content projectData={trendingData} />
      <Aboutus />
      <Booking />
      <Footer />
    </>
  )
}

export default Home