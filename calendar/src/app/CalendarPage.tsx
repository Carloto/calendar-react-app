import { Avatar, Box, Button, IconButton } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Icon from '@mui/material/Icon';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useEffect, useState } from 'react';
import { getCalendars, getEvents, ICalendar, IEvent } from '../backend';

/**
 * TODO
 * - render calendars list
 * - change calendars on click
 */

const weekDays = ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sab'];

function CalendarPage() {
  const [calendars, setCalendars] = useState<ICalendar[]>([]);
  const [selectedCalendars, setSelectedCalendars] = useState<boolean[]>([]);
  const [events, setEvents] = useState<IEvent[]>([]);
  const weeks = generateCalendar(
    getToday(),
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

  return (
    <Box display={'flex'} height={'100%'} alignItems='stretch'>
      <Box
        borderRight={'1px solid rgba(224,224,224,1)'}
        width={'16em'}
        padding={'8px 16px'}
      >
        <h2>React Calendar</h2>
        <Button variant='contained'>New event</Button>
        <Box marginTop={'64px'}>
          <h3>Calendars</h3>
          {calendars.map((calendar, i) => (
            <FormControlLabel
              sx={{ display: 'block' }}
              key={calendar.id}
              control={
                <Checkbox
                  style={{ color: calendar.color }}
                  checked={selectedCalendars[i]}
                  onChange={() => toggleCalendar(i)}
                />
              }
              label={calendar.name}
            />
          ))}
        </Box>
      </Box>
      <Box flex={1} display={'flex'} flexDirection={'column'}>
        <Box display={'flex'} alignItems={'center'} padding={'8px 16px'}>
          <Box>
            <IconButton aria-label='Previous month'>
              <Icon>chevron_left</Icon>
            </IconButton>
            <IconButton aria-label='Next month'>
              <Icon>chevron_right</Icon>
            </IconButton>
          </Box>
          <Box flex={1} component={'h3'} marginLeft={'16px'}>
            June 2021
          </Box>
          <IconButton aria-label='User account'>
            <Avatar>
              <Icon>person</Icon>
            </Avatar>
          </IconButton>
        </Box>
        <TableContainer style={{ flex: 1 }} component={'div'}>
          <Table
            sx={{
              tableLayout: 'fixed',
              minHeight: '100%',
              borderTop: '1px solid rgba(224,224,224,1)',
              '& td ~ td, & th ~ th': {
                borderLeft: '1px solid rgba(224,224,224,1)',
              },
              '& td': {
                verticalAlign: 'top',
                overflowX: 'hidden',
                padding: '8px 5px',
              },
            }}
            aria-label='simple table'
          >
            <TableHead>
              <TableRow>
                {weekDays.map((day) => (
                  <TableCell key={day} align='center'>
                    {day.toUpperCase()}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {weeks.map((week, i) => (
                <TableRow key={i}>
                  {week.map((cell) => (
                    <TableCell key={cell.date} align='center'>
                      <Box
                        component={'div'}
                        sx={{
                          fontWeight: 500,
                          marginBottom: '4px',
                        }}
                      >
                        {cell.dayOfMonth}
                      </Box>
                      {cell.events.map((event, j) => {
                        const color = event.calendar?.color;
                        return (
                          <Box
                            key={event.id}
                            component={'button'}
                            sx={{
                              margin: '4px 0',
                              display: 'flex',
                              alignItems: 'center',
                              background: 'none',
                              border: 'none',
                              cursor: 'pointer',
                              textAlign: 'left',
                              whiteSpace: 'nowrap',
                            }}
                          >
                            {event.time && (
                              <>
                                <Icon style={{ color }} fontSize={'inherit'}>
                                  watch_later
                                </Icon>
                                <Box component={'span'} margin='0 4px'>
                                  {event.time}
                                </Box>
                              </>
                            )}
                            {event.time ? (
                              <span>{event.desc}</span>
                            ) : (
                              <Box
                                component={'div'}
                                sx={{
                                  display: 'inline-block',
                                  backgroundColor: color,
                                  color: 'white',
                                  padding: '2px 4px',
                                  borderRadius: '4px',
                                }}
                              >
                                {event.desc}
                              </Box>
                            )}
                          </Box>
                        );
                      })}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
}

export default CalendarPage;

type IEventCalendar = IEvent & { calendar: ICalendar };

interface ICalendarCell {
  date: string;
  dayOfMonth: number;
  events: IEventCalendar[];
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
    for (let i = 0; i < weekDays.length; i++) {
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

function getToday() {
  return '2021-06-17';
}
