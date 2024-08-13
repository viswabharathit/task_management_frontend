import React, { useState, useEffect } from 'react';
import '../.././assets/css/carouselhome.css';
import task1 from '../../assets/images/task1.jpg';
import task2 from '../../assets/images/task2.jpg';
import task3 from '../../assets/images/task3.jpg';
import task5 from '../../assets/images/task5.png';
import task6 from '../../assets/images/task6.jpg';

const Carouselhome = () => {
  const cards = [
    { name: 'Task Prioritization', description: 'Helps individuals and teams prioritize tasks, ensuring that the most important and urgent tasks are completed first.', href: '#', background: '#000000', imgsrc: task1 },
    { name: 'Workflow Organization', description: 'Organizes tasks in a logical sequence, preventing bottlenecks and ensuring a smooth workflow.', href: '#', background: '#000000', imgsrc: task2 },
    { name: 'Task Assignment', description: 'Assigns specific tasks to individuals, making it clear who is responsible for what.', href: '#', background: '#000000', imgsrc: task3 },
    { name: 'User Collaboration', description: 'Using task management tools enables team members to collaborate more effectively by sharing updates, files, and comments.', href: '#', background: '#000000', imgsrc: task1 },
    { name: 'Stress Reduction', description: 'Reduces the chaos and stress associated with disorganized work by providing a clear structure and plan.', href: '#', background: '#000000', imgsrc: task5 },
    { name: 'Performance Analytics', description: 'Provides data on task completion times, bottlenecks, and resource usage, which can inform better decision-making and process improvements.', href: '#', background: '#000000', imgsrc: task6 }
  ];

  return (
    <div className="carousel-container bg-black text-white p-4 rounded-lg">
      <div className="carousel-grid">
        {cards.concat(cards).map((card, index) => (
          <div
            key={index}
            className="card hover:scale-105 transition-transform duration-300 p-4 border border-gray-500"
            style={{ background: card.background }}
          >
            <img src={card.imgsrc} alt={card.name} className="card-image"/>
            <h3 className="text-lg font-bold text-green-600 pb-3">{card.name}</h3>
            <p>{card.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Carouselhome;
