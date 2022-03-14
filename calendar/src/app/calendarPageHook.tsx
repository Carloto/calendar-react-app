import { useEffect, useMemo, useReducer } from 'react';
import { getCalendars, getEvents, ICalendar, IEvent } from '../backend';
import { ICalendarCell } from './Calendar';
import { reducer } from './calendarPageReducer';

export function useCalendarPage(month: string) {
  const [state, dispatch] = useReducer(reducer, {
    calendars: [],
    selectedCalendars: [],
    events: [],
    openEvent: null,
  });

  const { calendars, selectedCalendars, events, openEvent } = state;

  const weeks = useMemo(() => {
    return generateCalendar(
      month + '-01',
      events,
      calendars,
      selectedCalendars
    );
  }, [month, events, calendars, selectedCalendars]);

  const startDate = weeks[0][0].date;
  const endDate = weeks[weeks.length - 1][6].date;

  useEffect(() => {
    (async () => {
      try {
        dispatch({
          type: 'load',
          payload: {
            calendars: await getCalendars(),
            events: await getEvents(startDate, endDate),
          },
        });
      } catch (e) {
        console.error(e);
      }
    })();
  }, [startDate, endDate]);

  async function handleSave() {
    dispatch({
      type: 'load',
      payload: { events: await getEvents(startDate, endDate) },
    });
  }

  return {
    calendars,
    weeks,
    selectedCalendars,
    openEvent,
    handleSave,
    dispatch,
  };
}

function generateCalendar(
  date: string,
  allEvents: IEvent[],
  calendars: ICalendar[],
  selectedCalendars: boolean[]
): ICalendarCell[][] {
  const weeks: ICalendarCell[][] = [];
  const today = new Date(date + 'T12:00:00');
  const currMonth = today.getMonth();

  const currDay = new Date(today.valueOf());
  currDay.setDate(1);
  const dayOfWeek = currDay.getDay();
  currDay.setDate(1 - dayOfWeek);

  do {
    const week: ICalendarCell[] = [];
    for (let i = 0; i < 7; i++) {
      const isoDate = `${currDay.getFullYear()}-${(currDay.getMonth() + 1)
        .toString()
        .padStart(2, '0')}-${currDay.getDate().toString().padStart(2, '0')}`;

      week.push({
        date: isoDate,
        dayOfMonth: currDay.getDate(),
        events: allEvents
          .filter(
            (e) =>
              e.date === isoDate &&
              selectedCalendars[
                calendars.findIndex(({ id }) => id === e.calendarId)
              ]
          )
          .map((e) => ({
            ...e,
            calendar: calendars.find(({ id }, i) => id === e.calendarId)!,
          })),
      });
      currDay.setDate(currDay.getDate() + 1);
    }
    weeks.push(week);
  } while (currDay.getMonth() === currMonth);

  return weeks;
}
