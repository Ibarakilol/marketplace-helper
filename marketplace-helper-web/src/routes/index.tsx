import { Route } from 'react-router-dom';

import MainLayout from '@/layouts/main-layout';
import LoginPage from '@/pages/login-page';
import MainPage from '@/pages/main-page';
import RegisterPage from '@/pages/register-page';

import { AppRoute } from '@/constants';

const MAIN_ROUTES = [
  {
    path: AppRoute.WILDBERRIES,
    component: MainPage,
    title: 'Wildberries',
  },
];

const AUTH_ROUTES = [
  {
    path: AppRoute.LOGIN,
    component: LoginPage,
  },
  {
    path: AppRoute.REGISTER,
    component: RegisterPage,
  },
];

export const MainRoutes = () => {
  return MAIN_ROUTES.map(({ path, component: Component, title }) => (
    <Route
      key={path}
      element={
        <MainLayout title={title}>
          <Component />
        </MainLayout>
      }
      path={path}
    />
  ));
};

export const AuthRoutes = () => {
  return AUTH_ROUTES.map(({ path, component: Component }) => (
    <Route key={path} element={<Component />} path={path} />
  ));
};
