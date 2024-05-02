import {FC, useState, useEffect } from 'react';

const Countdown: FC<{ initialCount: number }> = ({ initialCount }) => {
  const [count, setCount] = useState(initialCount);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const id = setInterval(() => {
      setCount((prevCount) => prevCount - 1);
    }, 1000);

    setIntervalId(id);

    // 在组件销毁时清除定时器
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (count === 0 && intervalId) {
      clearInterval(intervalId);
    }
  }, [count, intervalId]); // count 和 intervalId 是依赖项

  const formatTime = (time: number) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;
    return `${hours} hours ${minutes} minutes ${seconds} seconds`;
  };

  return (
    <div style={{visibility:count ? 'visible' : 'hidden'}}>
      CountDown: {formatTime(count)}
    </div>
  );
};

const CountdownPage: FC<{initialCount: number}> = ({initialCount}) => {
  return (
    <div>
      <Countdown initialCount={initialCount} />
    </div>
  );
};

export default CountdownPage;
