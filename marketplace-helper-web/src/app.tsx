import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

import PrivateRoute from '@/components/common/private-route';
import { Toaster } from '@/components/ui/toaster';

import globalAppStore from '@/stores/global-app-store';

import { AppRoute } from '@/constants';
import { AuthRoutes, MainRoutes } from '@/routes';

import '@/index.css';

globalAppStore.init();

const App = observer(() => {
  const { token } = globalAppStore;

  return (
    <div className="min-h-screen">
      <Router>
        <Routes>
          {!token && AuthRoutes()}
          <Route element={<PrivateRoute isRedirect={!token} />}>{MainRoutes()}</Route>
          <Route element={<Navigate replace to={AppRoute.WILDBERRIES} />} path="*" />
        </Routes>
      </Router>
      <Toaster />
    </div>
  );
});

export default App;
