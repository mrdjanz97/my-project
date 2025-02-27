import React from 'react';

const DislikeIcon = ({ alreadyReacted = false }: { alreadyReacted: boolean }) => {
  return (
    <svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M12.6667 8.50001L12.6667 0.500009L15.3334 0.50001L15.3334 8.50001L12.6667 8.50001ZM10 0.500009C10.3537 0.500009 10.6928 0.640485 10.9429 0.890534C11.1929 1.14058 11.3334 1.47972 11.3334 1.83334L11.3334 8.50001C11.3334 8.86668 11.1867 9.20001 10.94 9.44001L6.55337 13.8333L5.84671 13.1267C5.66671 12.9467 5.55337 12.7 5.55337 12.4267L5.57337 12.2133L6.20671 9.16668L2.00004 9.16668C1.64642 9.16668 1.30728 9.0262 1.05723 8.77615C0.807184 8.5261 0.666708 8.18696 0.666708 7.83334L0.666708 6.50001C0.666708 6.32668 0.700041 6.16668 0.760041 6.01334L2.77337 1.31334C2.97337 0.833341 3.44671 0.500008 4.00004 0.500009L10 0.500009ZM10 1.83334L3.98004 1.83334L2.00004 6.50001L2.00004 7.83334L7.86004 7.83334L7.10671 11.38L10 8.48001L10 1.83334Z"
        fill={`${alreadyReacted ? '#4285F4' : '#303030'} `}
      />
    </svg>
  );
};

export default DislikeIcon;
