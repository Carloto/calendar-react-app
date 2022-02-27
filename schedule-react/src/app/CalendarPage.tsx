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
import * as React from 'react';

const weekDays = ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sab'];

function CalendarPage() {
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
          <FormControlLabel
            control={<Checkbox defaultChecked />}
            label='Personal'
          />
        </Box>
        <FormControlLabel control={<Checkbox />} label='Work' />
      </Box>
      <TableContainer component={'div'}>
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
            February 2022
          </Box>

          <IconButton aria-label='User account'>
            <Avatar>
              <Icon>person</Icon>
            </Avatar>
          </IconButton>
        </Box>
        <Table
          sx={{
            minHeight: '100%',
            borderTop: '1px solid rgba(224,224,224,1)',
            '& td ~ td, & th ~ th': {
              borderLeft: '1px solid rgba(224,224,224,1)',
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
            <TableRow>
              {weekDays.map((day, i) => (
                <TableCell key={day} align='center'>
                  {i}
                </TableCell>
              ))}
            </TableRow>
            <TableRow>
              {weekDays.map((day, i) => (
                <TableCell key={day} align='center'>
                  {i}
                </TableCell>
              ))}
            </TableRow>
            <TableRow>
              {weekDays.map((day, i) => (
                <TableCell key={day} align='center'>
                  {i}
                </TableCell>
              ))}
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default CalendarPage;
