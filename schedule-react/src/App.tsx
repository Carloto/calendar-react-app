import React, { useEffect } from "react";
// import logo from './logo.svg';
import "./App.css";
import { getEvents, IEvent } from "./backend";

function App() {
  useEffect(() => {
    (async function loadData() {
      const events: IEvent[] = await getEvents();
      for (const event of events) {
        console.log(event);
      }
    })();
  }, []);

  return <div>yo</div>;
}

export default App;
