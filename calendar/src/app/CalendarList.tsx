import { Box } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import React from 'react';
import { ICalendar } from '../backend';

interface ICalendarListProps {
  calendars: ICalendar[];
  toggleCalendar: (index: number) => void;
  selectedCalendars: boolean[];
}

const CalendarList = React.memo(function ({
  calendars,
  toggleCalendar,
  selectedCalendars,
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
              onChange={() => toggleCalendar(i)}
            />
          }
          label={calendar.name}
        />
      ))}
    </Box>
  );
});

export default CalendarList;
