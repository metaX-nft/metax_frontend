import { Suspense } from 'react';
import { Navigate, RouteObject } from 'react-router-dom';
import MainLayout from '@pages/MainLayout';
import Galley from '@pages/Galley';
import Winjoy from '@pages/Winjoy';
import Vault from '@pages/Vault';
import Ranking from '@pages/Ranking';

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
    { path: '/galley', element: <Galley /> },
    { path: '/winjoy', element: <Winjoy /> },
    { path: '/vault', element: <Vault /> },
    { path: '/ranking', element: <Ranking /> },
  ],
};

Routes.push(mainRoutes);
export default Routes;
