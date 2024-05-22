import React, { useState } from 'react';
import Button from '../../ui-components/button';
import './segmentedControl.css';
const SegmentedControl = ({ segments, onSegmentChange, activeStyle }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleClick = (index) => {
    setActiveIndex(index);
    if (onSegmentChange) {
      onSegmentChange(index);
    }
  };

  const activeClass = activeStyle === 'order' ? 'button--active--order' : 'button--active--buy';

  return (
    <div className="segmented-control">
      {segments.map((segment, index) => (
        <Button
          key={index}
          onClick={() => handleClick(index)}
          className={`button--segment ${index === activeIndex ? activeClass : ''}`}
        >
          {segment}
        </Button>
      ))}
    </div>
  );
};

export default SegmentedControl;