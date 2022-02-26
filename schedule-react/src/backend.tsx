export interface ICalendar {
  id: number;
  name: string;
  color: string;
}

export interface IEvent {
  id: number;
  date: string;
  time?: string;
  desc: string;
  calendarId: number;
}

export async function getCalendars(): Promise<ICalendar[]> {
  const res = await fetch("http://localhost:8080/calendars");
  return await res.json();
}

export async function getEvents(): Promise<IEvent[]> {
  const res = await fetch("http://localhost:8080/events");
  return await res.json();
}
