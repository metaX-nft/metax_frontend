import { Suspense } from 'react';
import { Navigate, RouteObject } from 'react-router-dom';
import MainLayout from '@pages/MainLayout';
import LoginPage from '@pages/Login';
import Galley from '@pages/Galley';
import Winjoy from '@pages/Winjoy';
import Vault from '@pages/Vault';
import Ranking from '@pages/Ranking';

const Routes: RouteObject[] = [
  {
    path: '/',
    element: (
      <Suspense>
        <MainLayout />
      </Suspense>
    ),
    children: [
      { path: 'galley', index: true, element: <Galley /> },
      { path: 'winjoy', element: <Winjoy /> },
      { path: 'vault', element: <Vault /> },
      { path: 'ranking', element: <Ranking /> },
      {
        index: true,
        element: <Navigate to="/galley" replace />,
      },
    ],
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  { path: '*', element: <Navigate to="/404" /> },
];

export default Routes;
