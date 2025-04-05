import React, { memo } from 'react'
import HeroSection from '../components/homecomponents/Homeherosection'
import Homecatergories from '../components/homecomponents/Homecatergories'
import Homefeaturedproducts from '../components/homecomponents/Homefeaturedproducts'
import Homebeautytips from '../components/homecomponents/Homebeautytips'
import Footer from '../components/Footer'
export default memo(function Home() {
  return (
    <div>
      <HeroSection />
      <Homecatergories />
      <Homefeaturedproducts/>
      <Homebeautytips />
      <Footer />

    </div>
  )
})
