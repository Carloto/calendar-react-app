import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import React, { useEffect, useRef, useState } from 'react';
import { createEvent, ICalendar, IOpenEvent } from '../backend';

interface IEventDialogProps {
  event: IOpenEvent | null;
  calendars: ICalendar[];
  handleClose: () => void;
  handleSave: () => void;
}

interface IFormErrors {
  [field: string]: string;
}

function EventDialog({
  event,
  calendars,
  handleClose,
  handleSave,
}: IEventDialogProps) {
  const [openEvent, setOpenEvent] = useState<IOpenEvent | null>(event);
  const [errors, setErrors] = useState<IFormErrors>({});
  const inputDate = useRef<HTMLInputElement | null>();
  const inputDesc = useRef<HTMLInputElement | null>();

  useEffect(() => {
    setOpenEvent(event);
    setErrors({});
  }, [event]);

  function validate(): boolean {
    if (openEvent) {
      const currErrors: IFormErrors = {};
      if (!openEvent.date) {
        currErrors['date'] = 'Date cannot be empty';
        inputDate.current?.focus();
      }
      if (!openEvent.desc) {
        currErrors['desc'] = 'Description cannot be empty';
        inputDesc.current?.focus();
      }
      setErrors(currErrors);
      return Object.keys(currErrors).length === 0;
    }
    return false;
  }

  async function saveEvent(e: React.FormEvent) {
    e.preventDefault();
    if (openEvent && validate()) {
      await createEvent(openEvent);
      handleSave();
      handleClose();
    }
  }

  return (
    <div>
      <Dialog open={!!openEvent} onClose={handleClose}>
        <DialogTitle>New openEvent</DialogTitle>
        <form onSubmit={saveEvent}>
          <DialogContent>
            {!!openEvent && (
              <>
                <TextField
                  inputRef={inputDate}
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
                  error={!!errors.date}
                  helperText={errors.date}
                />
                <TextField
                  inputRef={inputDesc}
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
                  error={!!errors.desc}
                  helperText={errors.desc}
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
            <Button type='button' onClick={handleClose}>
              Cancel
            </Button>
            <Button type='submit'>Save</Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}

export default EventDialog;
