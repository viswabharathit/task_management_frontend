import React, { useState } from 'react';

const StarRating = ({ rating = 0, onRatingChange }) => {
  const [hoveredRating, setHoveredRating] = useState(null);

  const handleClick = (value) => {
    onRatingChange(value);
  };

  const handleMouseEnter = (value) => {
    setHoveredRating(value);
  };

  const handleMouseLeave = () => {
    setHoveredRating(null);
  };

  return (
    <div className="flex space-x-2">
      {[...Array(5)].map((_, index) => {
        const starRating = index + 1;
        const isFilled = starRating <= (hoveredRating || rating);

        return (
          <svg
            key={index}
            xmlns="http://www.w3.org/2000/svg"
            className={`w-8 h-12 cursor-pointer ${isFilled ? 'text-green-500' : 'text-gray-300'}`}
            fill={isFilled ? 'currentColor' : 'none'}
            viewBox="0 0 36 36"
            stroke="currentColor"
            strokeWidth={2}
            onClick={() => handleClick(starRating)}
            onMouseEnter={() => handleMouseEnter(starRating)}
            onMouseLeave={handleMouseLeave}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M11.049 2.927c.3-.921 1.604-.921 1.904 0l2.201 6.748a1 1 0 00.95.69h7.088c.969 0 1.371 1.24.588 1.81l-5.556 4.061a1 1 0 00-.364 1.118l2.201 6.748c.3.921-.755 1.688-1.54 1.118l-5.556-4.061a1 1 0 00-1.175 0l-5.556 4.061c-.784.57-1.838-.197-1.54-1.118l2.201-6.748a1 1 0 00-.364-1.118L1.023 11.176c-.783-.57-.381-1.81.588-1.81h7.088a1 1 0 00.95-.69l2.201-6.748z"
            />
          </svg>
        );
      })}
    </div>
  );
};

export default StarRating;
