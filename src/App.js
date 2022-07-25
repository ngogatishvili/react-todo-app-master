import React from 'react';
import { Provider } from 'react-redux';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import HomePage from './pages/HomePage';
import PrivateRoute from './components/PrivateRoute';

import store from './redux/store';
import SettingsPage from './pages/SettingsPage';

function App() {
  return (
    <Provider store={store}>
      <Routes>
        <Route
          path="/"
          element={(
            <PrivateRoute>
              <HomePage />
            </PrivateRoute>
          )}
        />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/settings"
          element={(
            <PrivateRoute>
              <SettingsPage />
            </PrivateRoute>
          )}
        />
      </Routes>
    </Provider>
  );
}

export default App;
