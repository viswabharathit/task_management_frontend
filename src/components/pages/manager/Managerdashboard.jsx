import React from 'react';
import { Briefcase, CheckSquare, Users } from 'lucide-react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { useNavigate } from 'react-router-dom';

ChartJS.register(ArcElement, Tooltip, Legend);

const Managerdashboard = () => {
  return (
    <div className="p-8 bg-black text-white min-h-screen">
      <h1 className="text-4xl font-bold mb-6 hover:text-green-700">Manager Dashboard</h1>
      
      {/* Summary Cards Section */}
      <div className="grid grid-cols-3 gap-6 mb-6">
        <SummaryCard title="Total Projects" count="12" icon={Briefcase} route="/manager" />
        <SummaryCard title="Total Tasks" count="34" icon={CheckSquare} route="/tasks" />
        <SummaryCard title="Total Team Members" count="8" icon={Users} route="/members" />
      </div>
      
      {/* Project Status Carousel */}
      <div className="mb-6">
        <ProjectStatusCarousel />
      </div>
      
      {/* Task Overview Section */}
      <div className="grid grid-cols-2 gap-6 mb-6">
        <TaskProgress />
        <TaskPriority />
      </div>
      
      {/* Team Members Activity Marquee */}
      <div className="mb-6 border-gray border-t-2 border-b-2 py-4">
        <MarqueeActivity />
      </div>
      
    </div>
  );
};

// Component for Summary Cards
const SummaryCard = ({ title, count, icon: Icon, route }) => {
  const navigate = useNavigate();

  return (
    <div className=" p-6 rounded-lg border border-gray transform hover:scale-105 transition-transform duration-300">
      <Icon className="text-green-500 w-8 h-8 mb-4" />
      <h2 className="text-2xl font-bold">{count}</h2>
      <p className="text-gray-400">{title}</p>
      <button
        className="mt-4 bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition-colors duration-300"
        onClick={() => navigate(route)}
      >
        View {title.split(' ')[1]}
      </button>
    </div>
  );
};

// Component for Carousel
const ProjectStatusCarousel = () => (
  <Carousel
    additionalTransfrom={0}
    autoPlay
    autoPlaySpeed={2000}
    infinite
    keyBoardControl
    responsive={{
      desktop: { breakpoint: { max: 3000, min: 1024 }, items: 3 },
      tablet: { breakpoint: { max: 1024, min: 464 }, items: 2 },
      mobile: { breakpoint: { max: 464, min: 0 }, items: 1 },
    }}
    slidesToSlide={1}
    itemClass="carousel-item-padding-40-px mr-4"
  >
    <StatusCard status="In Progress" description="5 tasks ongoing" />
    <StatusCard status="Completed" description="15 tasks done" />
    <StatusCard status="On Hold" description="3 tasks paused" />
  </Carousel>
);

const StatusCard = ({ status, description }) => (
  <div className="p-6 rounded-lg border border-gray text-center transform hover:scale-105 transition-transform duration-300">
    <h3 className="text-xl font-bold">{status}</h3>
    <p className="text-gray-400">{description}</p>
  </div>
);

// Component for Task Progress
const TaskProgress = () => (
  <div className="p-6  rounded-lg border border-gray">
    <h3 className="text-xl font-bold mb-4">Task Progress</h3>
    <div className="w-full bg-gray-700 rounded-full h-4 mb-4 overflow-hidden">
      <div className="bg-green-500 h-4 rounded-full animate-progress" style={{ width: '70%' }}></div>
    </div>
    <p>70% of tasks completed</p>
  </div>
);

// Component for Task Priority with Interactive Pie Chart
const TaskPriority = () => {
  const data = {
    labels: ['High Priority', 'Medium Priority', 'Low Priority'],
    datasets: [
      {
        data: [10, 15, 5],
        data: [10, 15, 5],
        backgroundColor: ['#1E5631', '#2C6D49', '#4CAF50'],
        hoverBackgroundColor: ['#1E5631', '#2C6D49', '#4CAF50'],
  
      },
    ],
  };

  return (
    <div className="p-6  rounded-lg border border-gray">
      <h3 className="text-xl font-bold mb-4">Task Priority</h3>
      <div className="w-full h-64 rounded-lg flex justify-center items-center">
        <Pie data={data} />
      </div>
    </div>
  );
};

// Component for Marquee Activity with Hover Effect
const MarqueeActivity = () => (
  <div className="text-gray-400 overflow-hidden">
    <marquee behavior="scroll" direction="left" scrollamount="5" onMouseOver="this.stop();" onMouseOut="this.start();">
      Team Member John completed task "Design Homepage". Team Member Jane updated task "Create API".
    </marquee>
  </div>
);

export default Managerdashboard;
