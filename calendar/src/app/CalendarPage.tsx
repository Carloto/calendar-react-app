import { Box, Button } from '@mui/material';
import { useCallback } from 'react';
import { useParams } from 'react-router-dom';
import Calendar from './Calendar';
import CalendarHeader from './CalendarHeader';
import CalendarList from './CalendarList';
import { useCalendarPage } from './calendarPageHook';
import { getToday } from './dateUtils';
import EventDialog from './EventDialog';

function CalendarPage() {
  const { month = '' } = useParams<{ month: string }>();

  const {
    calendars,
    weeks,
    selectedCalendars,
    dispatch,
    openEvent,
    handleSave,
  } = useCalendarPage(month);

  const handleCloseEvent = useCallback(
    function () {
      dispatch({ type: 'close' });
    },
    [dispatch]
  );

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
        handleSave={() => {
          handleSave();
          handleCloseEvent();
        }}
      />
    </Box>
  );
}

export default CalendarPage;
