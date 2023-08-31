import React from 'react'
import FeaturedListings from "../components/HomePageComponents/FeaturedListings";
import DetailedItem from "../components/HomePageComponents/DetailedItems";
import HowItWorks from "../components/HomePageComponents/HowItWorks";
import AddListing from "../components/HomePageComponents/AddListing.jsx";
import Hero from "../components/HomePageComponents/Hero.jsx";

const HomePage = () => {
  return (
    <>
      <Hero />
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '20px',
        margin: '20px 0'
      }}>
        <img src="images/bn1.png" alt="lahan parkir mobil" style={{ width: "400px", borderRadius: "10px"}} />
        <img src="images/bn2.png" alt="lahan parkir mobil" style={{ width: "400px", borderRadius: "10px"}} />
      </div>
      <FeaturedListings />
      <DetailedItem />
      <HowItWorks />
      <AddListing />
    </>
  )
}

export default HomePage;
