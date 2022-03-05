export interface ICalendar {
  id: number;
  name: string;
  color: string;
}

export interface IOpenEvent {
  id?: number;
  date: string;
  time?: string;
  desc: string;
  calendarId: number;
}

export interface IEvent extends IOpenEvent {
  id: number;
}

export async function getCalendars(): Promise<ICalendar[]> {
  const res = await fetch('http://localhost:8080/calendars');
  return await res.json();
}

export async function getEvents(from: string, to: string): Promise<IEvent[]> {
  const res = await fetch(
    `http://localhost:8080/events?date_gte=${from}&date_lte${to}&_sort=date,time`
  );
  return await res.json();
}

export async function createEvent(event: IOpenEvent): Promise<IEvent[]> {
  const res = await fetch(`http://localhost:8080/events`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(event),
  });
  return await res.json();
}
