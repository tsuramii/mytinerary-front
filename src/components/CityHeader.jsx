import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CityHeader = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isChanging, setIsChanging] = useState(false);
  const [headerPlaces, setHeaderPlaces] = useState([]);

  const fetchHeaderData = async () => {
    try {
      const response = await axios.get('https://mytinerary-deploy.onrender.com/api/places');
      setHeaderPlaces(response.data); 
    } catch (error) {
      console.error('Error fetching header data:', error);
    }
  };

  useEffect(() => {
    fetchHeaderData();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsChanging(true);
      setTimeout(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % headerPlaces.length);
        setIsChanging(false);
      }, 300);
    }, 7000); // 7 seconds

    return () => clearInterval(interval);
  }, [headerPlaces]);

  return (
    <div className="relative flex flex-col justify-center items-center min-h-[40vh] bg-cover bg-left" style={{ backgroundImage: headerPlaces.length === 0 ? "" : `url('${headerPlaces[currentImageIndex].image_url}')` }}>
      <div className={`absolute inset-0 bg-black transition-opacity duration-300 ${isChanging ? "opacity-75" : "opacity-50"}`}></div>
      <h1 className='text-white text-5xl md:text-7xl font-bold relative z-10'>Cities</h1>
      <h3 className='text-white md:text-xl font-light m-3 relative z-10'>
        <span className='font-bold text-accent'>Explore</span> the world and discover the best places to visit.
      </h3>
    </div>
  );
}

export default CityHeader;