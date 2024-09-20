import React from 'react';

interface StarRatingProps {
  rating: number;
}

const StarRating: React.FC<StarRatingProps> = ({ rating }) => {
  return (
    <div className="flex justify-center mt-2 mb-2">
      {Array.from({ length: 5 }, (_, i) => (
        <span
          key={i}
          className={`text-yellow-400 ${i < rating ? 'text-yellow-500' : 'text-gray-300'}`}
        >
          {i < rating ? '★' : '☆'}
        </span>
      ))}
    </div>
  );
};

export default StarRating;