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

export interface IUser {
  name: string;
  email: string;
}

export interface IEvent extends IOpenEvent {
  id: number;
}

export async function getCalendars(): Promise<ICalendar[]> {
  const res = await fetch('http://localhost:8080/calendars', {
    credentials: 'include',
  });
  return handleResponse(res);
}

export async function getEvents(from: string, to: string): Promise<IEvent[]> {
  const res = await fetch(
    `http://localhost:8080/events?date_gte=${from}&date_lte${to}&_sort=date,time`,
    { credentials: 'include' }
  );
  return handleResponse(res);
}

export async function createEvent(event: IOpenEvent): Promise<IEvent[]> {
  const res = await fetch(`http://localhost:8080/events`, {
    credentials: 'include',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(event),
  });
  return handleResponse(res);
}

export async function updateEvent(event: IOpenEvent): Promise<IEvent[]> {
  const res = await fetch(`http://localhost:8080/events/${event.id}`, {
    credentials: 'include',
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(event),
  });
  return handleResponse(res);
}

export async function deleteEvent(id: number): Promise<void> {
  const res = await fetch(`http://localhost:8080/events/${id}`, {
    credentials: 'include',
    method: 'DELETE',
  });
  return handleResponse(res);
}

export async function getUser(): Promise<IUser> {
  const res = await fetch(`http://localhost:8080/auth/user`, {
    credentials: 'include',
  });
  return handleResponse(res);
}

export async function signInUser(
  email: string,
  password: string
): Promise<IUser> {
  const res = await fetch(`http://localhost:8080/auth/login`, {
    credentials: 'include',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });
  return handleResponse(res);
}

export async function logoutUser(): Promise<IUser> {
  const res = await fetch(`http://localhost:8080/auth/logout`, {
    credentials: 'include',
    method: 'POST',
  });
  return handleResponse(res);
}

async function handleResponse<Type>(res: Response): Promise<Type> {
  if (res.ok) {
    return await res.json();
  } else {
    throw new Error(res.statusText);
  }
}
