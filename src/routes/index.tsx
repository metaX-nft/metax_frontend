import { Suspense } from 'react';
import { Navigate, RouteObject } from 'react-router-dom';
import MainLayout from '@pages/MainLayout';
import LoginPage from '@pages/Login';
import Galley from '@pages/Galley/index';
import Winjoy from '@pages/Winjoy';
import Vault from '@pages/Vault';
import Ranking from '@pages/Ranking';
import Demo from '@pages/Demo';
const Routes: RouteObject[] = [
  {
    path: '/',
    element: (
      <Suspense fallback={<div>loading ....</div>}>
        <MainLayout />
      </Suspense>
    ),
    children: [
      { path: 'galley', element: <Galley /> },
      { path: 'Stake', element: <Vault /> },
      { path: 'winjoy', element: <Winjoy /> },
      // { path: 'ranking', element: <Ranking /> },
      // { path: 'demo', element: <Demo /> },
      // {
      //   index: true,
      //   element: <Navigate to="/galley" replace />,
      // },
    ],
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  { path: '*', element: <Navigate to="/404" /> },
];

export default Routes;
