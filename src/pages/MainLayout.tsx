import React from 'react';
import { Outlet } from 'react-router-dom';

const MainLayout = () => {
  return (
    <div className="app">
      <div className="relative text-[1rem]">
        <Outlet />
      </div>
    </div>
  );
};
export default React.memo(MainLayout);
