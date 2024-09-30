import styled from '@emotion/styled';
import { useState } from 'react';

const Button = styled.button`
  background-color: transparent;
  border: none;
  outline: none;
  cursor: pointer;
  font-size: 23px;
  &.on {
    color: #e96e3f;
  }
  &.off {
    color: #ccc;
  }
`;

export default function ClickableStarRating({ onRatingSelect }) {
  const [hover, setHover] = useState(0);
  const [rating, setRating] = useState(0);

  const handleClick = (index) => {
    setRating(index); // Update local state
    if (onRatingSelect) {
      onRatingSelect(index); // Call the parent callback function with the selected rating
    }
  };
  // const clearRating = () => {
  //   setRating(() => 0);
  // };
  return (
    <div className="star-rating">
      {[...Array(5)].map((star, index) => {
        index += 1;
        return (
          <Button
            type="button"
            key={index}
            className={index <= (hover || rating) ? 'on' : 'off'}
            onClick={() => handleClick(index)} // Pass selected rating to parent
            onMouseEnter={() => setHover(index)}
            onMouseLeave={() => setHover(rating)}
          >
            <span className="star">&#9733;</span>
          </Button>
        );
      })}
    </div>
  );
}
