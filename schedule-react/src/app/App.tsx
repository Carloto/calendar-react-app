import React, { useEffect } from 'react';
import { getEvents, IEvent } from '../backend';
import './App.css';
import CalendarPage from './CalendarPage';

function App() {
  useEffect(() => {
    (async function loadData() {
      const events: IEvent[] = await getEvents();
      for (const event of events) {
        console.log(event);
      }
    })();
  }, []);

  return <CalendarPage />;
}

export default App;
