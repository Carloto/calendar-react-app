import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import { useEffect, useState } from 'react';
import { ICalendar } from '../backend';

export interface IOpenEvent {
  id?: number;
  date: string;
  time?: string;
  desc: string;
  calendarId: number;
}

interface IEventDialogProps {
  event: IOpenEvent | null;
  calendars: ICalendar[];
  handleClose: () => void;
}

function EventDialog({ event, calendars, handleClose }: IEventDialogProps) {
  const [openEvent, setOpenEvent] = useState<IOpenEvent | null>(event);

  useEffect(() => {
    setOpenEvent(event);
  }, [event]);

  return (
    <div>
      <Dialog open={!!openEvent} onClose={handleClose}>
        <DialogTitle>New openEvent</DialogTitle>
        <DialogContent>
          {!!openEvent && (
            <>
              <TextField
                InputLabelProps={{ shrink: true }}
                margin='normal'
                label='Date'
                type='date'
                fullWidth
                variant='standard'
                value={openEvent.date}
                onChange={(e) =>
                  setOpenEvent({ ...openEvent, date: e.target.value })
                }
              />
              <TextField
                autoFocus
                margin='normal'
                label='Description'
                type='text'
                fullWidth
                variant='standard'
                value={openEvent.desc}
                onChange={(e) =>
                  setOpenEvent({ ...openEvent, desc: e.target.value })
                }
              />
              <TextField
                InputLabelProps={{ shrink: true }}
                margin='normal'
                label='Time'
                type='time'
                fullWidth
                variant='standard'
                onChange={(e) =>
                  setOpenEvent({ ...openEvent, time: e.target.value })
                }
              />
              <FormControl fullWidth variant='standard' margin='normal'>
                <InputLabel id='select-calendar'>Calendar</InputLabel>
                <Select
                  labelId='select-calendar'
                  value={openEvent.calendarId}
                  label='Calendar'
                  onChange={(e) =>
                    setOpenEvent({
                      ...openEvent,
                      calendarId: e.target.value as number,
                    })
                  }
                >
                  {calendars.map((calendar) => (
                    <MenuItem key={calendar.id} value={calendar.id}>
                      {calendar.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Subscribe</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default EventDialog;
