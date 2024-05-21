declare interface Window {
  ethereum: any;
}

declare module '@rumess/react-flip-countdown' {
  import * as React from 'react';

  interface FlipCountdownProps {
    endAt: string | Date; // 可以是字符串或 Date 对象
    hideYear?: boolean;
    hideMonth?: boolean;
    hideDay?: boolean;
    hideHour?: boolean;
    hideMinute?: boolean;
    hideSecond?: boolean;
    className?: string;
    theme?: string;
    titlePosition?: string;
    style?: React.CSSProperties;
    onComplete?: () => void;
  }

  const FlipCountdown: React.FC<FlipCountdownProps>;

  export default FlipCountdown;
}
declare module '@rumess/react-flip-countdown'