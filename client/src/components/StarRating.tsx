import React from 'react';
import './StarRating.css';

interface StarRatingProps {
  value: number | '';
  onChange: (value: number) => void;
  idPrefix?: string;
}

const StarRating: React.FC<StarRatingProps> = ({ value, onChange, idPrefix = 'rating' }) => {
  const stars = [5, 4, 3, 2, 1];
  return (
    <div className="rating">
      {stars.map((star) => (
        <React.Fragment key={star}>
          <input
            type="radio"
            id={`${idPrefix}-star${star}`}
            name={idPrefix}
            value={star}
            checked={value === star}
            onChange={() => onChange(star)}
          />
          <label htmlFor={`${idPrefix}-star${star}`}></label>
        </React.Fragment>
      ))}
    </div>
  );
};

export default StarRating;
