import { Box, Button } from '@mui/material';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getCalendars, getEvents, ICalendar, IEvent } from '../backend';
import Calendar, { ICalendarCell } from './Calendar';
import CalendarHeader from './CalendarHeader';
import CalendarList from './CalendarList';
import { getToday } from './dateUtils';
import EventDialog, { IOpenEvent } from './EventDialog';

function CalendarPage() {
  const { month = '' } = useParams<{ month: string }>();

  const [calendars, setCalendars] = useState<ICalendar[]>([]);
  const [selectedCalendars, setSelectedCalendars] = useState<boolean[]>([]);
  const [events, setEvents] = useState<IEvent[]>([]);
  const [openEvent, setOpenEvent] = useState<IOpenEvent | null>(null);

  const weeks = generateCalendar(
    month + '-01',
    events,
    calendars,
    selectedCalendars
  );

  const startDate = weeks[0][0].date;
  const endDate = weeks[weeks.length - 1][6].date;

  useEffect(() => {
    (async () => {
      const calendars = await getCalendars();
      setSelectedCalendars(calendars.map(() => true));
      setCalendars(calendars);
      setEvents(await getEvents(startDate, endDate));
    })();
  }, [startDate, endDate]);

  function toggleCalendar(index: number) {
    const newCalendar = [...selectedCalendars];
    newCalendar[index] = !newCalendar[index];
    setSelectedCalendars(newCalendar);
  }

  function handleOpenEvent() {
    setOpenEvent({
      date: getToday(),
      desc: '',
      calendarId: calendars[0].id,
    });
  }

  return (
    <Box display={'flex'} height={'100%'} alignItems='stretch'>
      <Box
        borderRight={'1px solid rgba(224,224,224,1)'}
        width={'16em'}
        padding={'8px 16px'}
      >
        <h2>React Calendar</h2>
        <Button variant='contained' onClick={handleOpenEvent}>
          New event
        </Button>
        <CalendarList
          calendars={calendars}
          selectedCalendars={selectedCalendars}
          toggleCalendar={toggleCalendar}
        />
      </Box>
      <Box flex={1} display={'flex'} flexDirection={'column'}>
        <CalendarHeader month={month} />
        <Calendar weeks={weeks} />
      </Box>
      <EventDialog
        event={openEvent}
        calendars={calendars}
        handleClose={() => setOpenEvent(null)}
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
