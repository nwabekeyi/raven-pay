import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// Use React Lazy to import components lazily
const Gravatar= lazy(() => import('./components/dashboard-components/gravatar.jsx/index.jsx'));
const AuthPage = lazy(() => import('./components/page/authPage/index.jsx'));
const Dashboard = lazy(() => import('./components/page/dashbord/dashbaord.jsx'));

const AppRoutes = () => {
  return (
    <Router>
      <div className="App">
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<AuthPage />} />
            <Route path="/gravatar" element={<Gravatar />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </Suspense>
      </div>
    </Router>
  );
}

export default AppRoutes;
