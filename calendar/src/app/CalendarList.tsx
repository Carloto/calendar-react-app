import { Box } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import React from 'react';
import { ICalendar } from '../backend';
import { ICalendarPageAction } from './calendarPageReducer';

interface ICalendarListProps {
  calendars: ICalendar[];
  selectedCalendars: boolean[];
  dispatch: React.Dispatch<ICalendarPageAction>;
}

const CalendarList = React.memo(function ({
  calendars,
  selectedCalendars,
  dispatch,
}: ICalendarListProps) {
  return (
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
              onChange={() =>
                dispatch({ type: 'toggle', payload: { index: i } })
              }
            />
          }
          label={calendar.name}
        />
      ))}
    </Box>
  );
});

export default CalendarList;
