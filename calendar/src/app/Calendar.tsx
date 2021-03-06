import { Box } from '@mui/material';
import Icon from '@mui/material/Icon';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import React from 'react';
import { ICalendar, IEvent } from '../backend';
import { ICalendarPageAction } from './calendarPageReducer';
import { getToday } from './dateUtils';

const weekDays = ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sab'];

interface ICalendarProps {
  weeks: ICalendarCell[][];
  dispatch: React.Dispatch<ICalendarPageAction>;
}

const Calendar = React.memo(function ({ weeks, dispatch }: ICalendarProps) {
  function handleClick(e: React.MouseEvent, date: string) {
    if (e.target === e.currentTarget) {
      dispatch({ type: 'new', payload: { date } });
    }
  }

  return (
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
                <TableCell
                  key={cell.date}
                  onClick={(e) => handleClick(e, cell.date)}
                  align='center'
                >
                  <Box
                    component={'div'}
                    sx={{
                      display: 'inline-block',
                      width: '24px',
                      lineHeight: '24px',
                      fontWeight: 500,
                      marginBottom: '4px',
                      borderRadius: '50%',
                      backgroundColor:
                        cell.date === getToday() ? '#3f51b5' : 'unset',
                      color: cell.date === getToday() ? 'white' : 'unset',
                    }}
                  >
                    {cell.dayOfMonth}
                  </Box>
                  {cell.events.map((event, j) => {
                    const color = event.calendar?.color;
                    return (
                      <Box
                        onClick={() =>
                          dispatch({ type: 'edit', payload: { event } })
                        }
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
  );
});

export default Calendar;

type IEventCalendar = IEvent & { calendar: ICalendar };

export interface ICalendarCell {
  date: string;
  dayOfMonth: number;
  events: IEventCalendar[];
}
