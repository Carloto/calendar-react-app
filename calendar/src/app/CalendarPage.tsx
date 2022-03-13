import { Box, Button } from '@mui/material';
import { useCallback, useEffect, useMemo, useReducer } from 'react';
import { useParams } from 'react-router-dom';
import { getCalendars, getEvents, ICalendar, IEvent } from '../backend';
import Calendar, { ICalendarCell } from './Calendar';
import CalendarHeader from './CalendarHeader';
import CalendarList from './CalendarList';
import { reducer } from './calendarPageReducer';
import { getToday } from './dateUtils';
import EventDialog from './EventDialog';

function CalendarPage() {
  const { month = '' } = useParams<{ month: string }>();

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

  const handleCloseEvent = useCallback(function () {
    dispatch({ type: 'close' });
  }, []);

  async function handleSave() {
    dispatch({
      type: 'load',
      payload: { events: await getEvents(startDate, endDate) },
    });
    handleCloseEvent();
  }

  return (
    <Box display={'flex'} height={'100%'} alignItems='stretch'>
      <Box
        borderRight={'1px solid rgba(224,224,224,1)'}
        width={'16em'}
        padding={'8px 16px'}
      >
        <h2>React Calendar</h2>
        <Button
          variant='contained'
          onClick={() =>
            dispatch({ type: 'new', payload: { date: getToday() } })
          }
        >
          New event
        </Button>
        <CalendarList
          calendars={calendars}
          selectedCalendars={selectedCalendars}
          dispatch={dispatch}
        />
      </Box>
      <Box flex={1} display={'flex'} flexDirection={'column'}>
        <CalendarHeader month={month} />
        <Calendar weeks={weeks} dispatch={dispatch} />
      </Box>
      <EventDialog
        event={openEvent}
        calendars={calendars}
        handleClose={handleCloseEvent}
        handleSave={handleSave}
      />
    </Box>
  );
}

export default CalendarPage;

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
