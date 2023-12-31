import React from 'react';
import { RouteObject } from 'react-router-dom';
import { LayoutOutlet as Layout } from '@/pages/layout';
import HomePage from '@/pages/home';
import NotFound from '@/pages/404';
import { ROUTE_PATH } from '@/constants/route-path';

export default [
  {
    path: ROUTE_PATH.NOT_FOUND,
    element: <Layout />,
    children: [{ index: true, element: <NotFound /> }],
  },
  {
    path: ROUTE_PATH.HOME,
    element: <Layout />,
    children: [{ index: true, element: <HomePage /> }],
  },
  {
    path: ROUTE_PATH.TIC_TAC_TOE,
    element: <Layout />,
    children: [{ index: true, element: <HomePage /> }],
  },
  {
    path: ROUTE_PATH.GAME_FI,
    element: <Layout />,
    children: [{ index: true, element: <HomePage /> }],
  },
] as RouteObject[];
