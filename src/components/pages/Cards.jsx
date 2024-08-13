import React from 'react';
import { Pencil, Heart, Trash2, CirclePlus } from 'lucide-react';

const Cards = ({ onAddClick }) => {
  const data = [
    {
      title: 'Update Website Content',
      desc: 'Review and refresh the existing website content to ensure it is up-to-date, relevant, and aligned with our brand voice.',
      status: "Incomplete"
    },
    {
      title: 'Fix Broken Links',
      desc: 'Conduct a thorough audit of the website to identify and fix any broken links. Ensure all internal and external links are functional to enhance user experience and improve SEO.',
      status: "Completed"
    },
    {
      title: 'Optimize Page Load Speed',
      desc: 'Analyze the website performance and identify areas for improvement to optimize page load speed. This may involve compressing images, minifying CSS/JavaScript, and leveraging browser caching.',
      status: "Completed"
    },
    {
      title: 'Test Website Responsiveness',
      desc: 'Test the website on various devices and screen sizes to ensure it is fully responsive. Report any layout issues or user experience problems that need to be addressed for mobile and tablet users.',
      status: "Incomplete"
    },
  ];

  return (
    <div className='grid grid-cols-3 gap-6 p-6'>
      {data && data.map((item, i) => (
        <div key={i} className='flex-col justify-between bg-black border-2 border-gray-400 rounded-lg p-4'>
          <div>
            <h3 className='text-xl font-semibold text-white'>{item.title}</h3>
            <p className='text-sm text-gray-100 my-1 '>{item.desc}</p>
          </div>
          <div className='mt-4 w-full flex items-center'>
            <button className={`${item.status === "Incomplete" ? "bg-red-500" : "bg-green-800"} text-black p-1 rounded w-2/6`}>
              {item.status}
            </button>
            <div className='text-white px-4 w-4/6 text-2xl font-semibold flex justify-end gap-2 transition-all duration-300'>
              <button><Heart /></button>
              <button><Pencil /></button>
              <button><Trash2 /></button>
            </div>
          </div>
        </div>
      ))}
      <div onClick={onAddClick} className='flex flex-col justify-center items-center bg-gray-700 rounded-sm p-4 text-gray-300 hover:scale-105 hover:cursor-pointer'>
        <CirclePlus className='text-xl'/>
        <h1 className='text-2xl mt-4'>Add Task</h1>
      </div>
    </div>
  );
};
export default Cards;