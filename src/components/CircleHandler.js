import React, { useState } from 'react';
import './CircleHandler.css';

const CircleHandler = () => {
  const [circles, setCircles] = useState([]);
  const [isIntersecting, setIsIntersecting] = useState(false);

  const handleClick = (e) => {
    const rect = e.target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const radius = Math.floor(Math.random() * (200 - 20 + 1)) + 20; // Random radius [20px, 200px]

    const newCircle = { x, y, radius };
    const updatedCircles = [...circles, newCircle];

    if (updatedCircles.length > 2) {
      setCircles([]);
      setIsIntersecting(false);
    } else {
      setCircles(updatedCircles);
      checkIntersection(updatedCircles);
    }
  };

  const checkIntersection = (circles) => {
    if (circles.length < 2) {
      setIsIntersecting(false);
      return;
    }

    const [circle1, circle2] = circles;
    const dx = circle1.x - circle2.x;
    const dy = circle1.y - circle2.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < circle1.radius + circle2.radius) {
      setIsIntersecting(true);
    } else {
      setIsIntersecting(false);
    }
  };

  return (
    <div
      className="viewport"
      onClick={handleClick}
      style={{ backgroundColor: isIntersecting ? 'lightcoral' : 'lightblue' }}
    >
      {circles.map((circle, index) => (
        <div
          key={index}
          className="circle"
          style={{
            width: circle.radius * 2,
            height: circle.radius * 2,
            left: circle.x - circle.radius,
            top: circle.y - circle.radius,
          }}
        ></div>
      ))}
    </div>
  );
};

export default CircleHandler;
