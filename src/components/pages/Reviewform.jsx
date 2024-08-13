import React, { useState } from 'react';

const ReviewForm = () => {
  const [review, setReview] = useState('');

  const handleChange = (event) => {
    setReview(event.target.value);
  };

  const handleSubmit = () => {
    // Handle review submission logic here
    console.log('Review submitted:', review);
    setReview(''); // Clear the text box after submission
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <textarea
        value={review}
        onChange={handleChange}
        placeholder="Enter your review"
        className="w-full h-32 p-2 border border-gray-300 rounded-md text-black placeholder-white resize-none"
      />
      <button
        onClick={handleSubmit}
        className="mt-2 px-4 py-2 bg-green-500 text-white font-bold rounded-md hover:bg-green-600"
      >
        Add Review
      </button>
    </div>
  );
};

export default ReviewForm;