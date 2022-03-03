import { Avatar, Box, Icon, IconButton } from '@mui/material';
import { Link } from 'react-router-dom';
import { addMonth, monthToString } from './dateUtils';

interface ICalendarHeaderProps {
  month: string;
}

function CalendarHeader({ month }: ICalendarHeaderProps) {
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
      <IconButton aria-label='User account'>
        <Avatar>
          <Icon>person</Icon>
        </Avatar>
      </IconButton>
    </Box>
  );
}

export default CalendarHeader;
