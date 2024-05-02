
import React, { useState, useEffect } from 'react';

interface ListItem {
  id: number;
  content: string;
  number: number;
}

const LotteryList: React.FC<{ items: ListItem[] }> = ({ items }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % items.length);
    }, 500); 

    return () => clearInterval(interval);
  }, [items.length]);

  return (
    <div className="overflow-y-hidden w-96 h-52 m-auto scrollbar-hide">
      <div className="flex flex-col animate-scroll" style={{ transform: `translateY(-${index * 32}px)` }}>
        {items.map((item) => (
          <div key={item.id} className="flex">
            <div className="flex-grow px-4 py-2">{item.id}</div>
            <div className="flex-grow px-4 py-2">{item.content}</div>
            <div className="flex-grow px-4 py-2">{item.number}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default LotteryList;
