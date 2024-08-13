import React from 'react';
import heroImage from '../../assets/images/hero.png';
import about from "../../assets/images/abouting.png";
import { LuTwitter } from 'react-icons/lu';
import { FaFacebook } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { CarouselPlugin } from '../ui/CarouselPlugin';
import '../../assets/css/styles.css';
import PulsatingButton from '../ui/pulsating-button';
import Carouselhome from '../ui/Carouselhome';
import MarqueeDemo from '../pages/MarqueeDemo';
import { useNavigate } from 'react-router-dom';
import timesplitting from '../../assets/images/timesplitting.png'
// import { CircleCheck } from 'lucide-react';
import StarRating from './StarRating';
import { useState } from 'react';
import ReviewForm from './Reviewform';
import Footer from '../shared/Footer';
  
  
  const Home = () => {
    const navigate = useNavigate();
    const [rating, setRating] = useState(0);
  
    const handleNavigate = () => {
      navigate('/Register'); // Update the URL to your sign-in page
    };
    return (
    <>
      <div className="relative flex items-center justify-center h-screen bg-black">
  <div className="w-5/6 h-2/3 flex flex-row items-center p-10 bg-gray-800 justify-between border border-gray-300 shadow-lg hover:shadow-2xl hover:border-gray-400 hover:transform hover:translate-y-[-10px] transition-all duration-300 rounded-md">
    <div className="flex flex-col items-start mr-10">
      <h1 className="text-white text-7xl font-oswald mt-4">Hey,</h1>
      <h2 className="text-white text-3xl font-oswald mt-2">Welcome to</h2>
      <h2 className="text-white text-3xl font-oswald mt-2">
        <span className="text-green-700 font-extrabold">VOID TASKS ...</span>
        <span className="text-green-700">Fill your schedule with success...</span>
      </h2>
      <p className="text-xl text-white font-playwrite mt-4">
        Plans are nothing; planning is everything.
      </p>
      <div className="mt-6">
              <PulsatingButton onClick={handleNavigate} />
      </div>
    </div>
    <div className="w-1/2 flex justify-center">
      <img className="w-2/3" src={heroImage} alt="Hero" />
    </div>
  </div>
</div>

    {/* Carousel Component */}
    <div >
        <Carouselhome />
      </div>
   
    {/* 2nd division */}
    {/* <div className='border-t border-green-700'></div>  */}
    <div className='flex bg-black'>
    <div className='w-1/2 p-4'>
        <img className='h-400 object-cover rounded-lg shadow-lg' src={about} alt="About Us" />
    </div>
    <div className='w-1/2 flex justify-center p-4'>
        <div className='flex flex-col justify-center'>
            <h1 className='text-4xl text-green-700 border-b-4 mb-5 ml-5 w-[160px] font-bold transition-colors duration-300 hover:text-green-400'>
                About Us
            </h1>
            <p className='text-white font-oswald mr-5 ml-5 text-2xl leading-relaxed'>
                Welcome to our Task Management Website, your ultimate solution for efficient and seamless project management.
                Our platform is designed to streamline the process of assigning, tracking, and completing tasks within your team. Whether you're a project manager overseeing a large project or a team member working on specific tasks, 
                our website offers a user-friendly interface to keep everyone on the same page.
            </p>
        </div>
       
    </div>
</div>


  
  <div className='flex px-5 py-32 bg-black justify-center '>
      <div className='flex flex-col p-2'>

        <div className="p-5">
          <h1 className="text-xl font-semibold mb-4 text-white">Rate Us</h1>
          <StarRating rating={rating} onRatingChange={setRating} />
          <p className="mt-2 text-white">Your rating: {rating}</p>
        </div>
        <ReviewForm/>
      </div>
      <div className='w-1/2 flex justify-center'>
      <MarqueeDemo/>
      </div>
   
    </div>


    <Footer/>

    </>
  );
}

export default Home;