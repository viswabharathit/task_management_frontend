import React from 'react'
import Navbar from '@/components/shared/Navbar';
import { Outlet } from 'react-router-dom';

const Weblayout = () => {
  return (
    <div>
         <Navbar/>
        <Outlet/>
        
    </div>
  )
}

export default Weblayout; 