import { Suspense } from 'react';
import { Navigate, RouteObject } from 'react-router-dom';
import MainLayout from '@pages/MainLayout';
import Home from '@pages/Home';

const Layout = () => (
  <Suspense>
    <MainLayout />
  </Suspense>
);

const Routes: RouteObject[] = [];

const mainRoutes = {
  path: '/',
  element: <Layout />,
  children: [
    { path: '*', element: <Navigate to="/404" /> },
    { path: '/', element: <Home /> },
  ],
};

Routes.push(mainRoutes);
export default Routes;
