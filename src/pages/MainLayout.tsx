import * as React from 'react';
import Nav from '@components/Nav';
import { Outlet } from 'react-router-dom';

const MainLayout = () => {
  return (
    <div className="app">
      <Nav />
      <div className="relative text-[1rem]">
        <Outlet />
      </div>
    </div>
  );
};
export default React.memo(MainLayout);
