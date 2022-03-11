import React, { useEffect, useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { getUser, IUser } from '../backend';
import './App.css';
import CalendarPage from './CalendarPage';
import { getToday } from './dateUtils';
import LoginPage from './LoginPage';

function App() {
  const [user, setUser] = useState<IUser | null>(null);

  useEffect(() => {
    (async function () {
      try {
        setUser(await getUser());
      } catch (e) {
        setUser(null);
      }
    })();
  }, []);

  if (user)
    return (
      <BrowserRouter>
        <Routes>
          <Route
            path='/'
            element={
              <Navigate to={`/calendar/${getToday().substring(0, 7)}`} />
            }
          />
          <Route
            path='/calendar/:month'
            element={
              <CalendarPage user={user} onLogout={() => setUser(null)} />
            }
          />
        </Routes>
      </BrowserRouter>
    );

  return <LoginPage onSignIn={(user) => setUser(user)} />;
}

export default App;
