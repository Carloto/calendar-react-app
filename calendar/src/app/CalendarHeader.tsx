import { Box, Icon, IconButton } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import { addMonth, monthToString } from './dateUtils';
import UserMenu from './UserMenu';

interface ICalendarHeaderProps {
  month: string;
}

const CalendarHeader = React.memo(function ({ month }: ICalendarHeaderProps) {
  return (
    <Box display={'flex'} alignItems={'center'} padding={'8px 16px'}>
      <Box>
        <IconButton
          aria-label='Previous month'
          component={Link}
          to={`/calendar/${addMonth(month, -1)}`}
        >
          <Icon>chevron_left</Icon>
        </IconButton>
        <IconButton
          aria-label='Next month'
          component={Link}
          to={`/calendar/${addMonth(month, 1)}`}
        >
          <Icon>chevron_right</Icon>
        </IconButton>
      </Box>
      <Box flex={1} component={'h3'} marginLeft={'16px'}>
        {monthToString(month)}
      </Box>
      <UserMenu />
    </Box>
  );
});

export default CalendarHeader;
