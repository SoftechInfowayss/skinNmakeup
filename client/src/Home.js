import React, { memo } from 'react'
import HeroSection from './Homeherosection'
import Homecatergories from './Homecatergories'
import Homefeaturedproducts from './Homefeaturedproducts'
import Homebeautytips from './Homebeautytips'
import Footer from './Footer'
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
