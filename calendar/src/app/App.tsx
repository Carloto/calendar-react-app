import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import CalendarPage from './CalendarPage';
import { getToday } from './dateUtils';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path='/'
          element={<Navigate to={`/calendar/${getToday().substring(0, 7)}`} />}
        />
        <Route path='/calendar/:month' element={<CalendarPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
