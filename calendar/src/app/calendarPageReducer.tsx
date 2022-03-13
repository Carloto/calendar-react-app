import { ICalendar, IEvent, IOpenEvent } from '../backend';

export interface ICalendarPageState {
  calendars: ICalendar[];
  selectedCalendars: boolean[];
  events: IEvent[];
  openEvent: IOpenEvent | null;
}

export type ICalendarPageAction =
  | {
      type: 'load';
      payload: { events: IEvent[]; calendars?: ICalendar[] };
    }
  | {
      type: 'toggle';
      payload: { index: number };
    }
  | {
      type: 'new';
      payload: { date: string };
    }
  | {
      type: 'close';
    }
  | { type: 'edit'; payload: { event: IEvent } };

export function reducer(
  state: ICalendarPageState,
  action: ICalendarPageAction
) {
  switch (action.type) {
    case 'load':
      return {
        ...state,
        calendars: action.payload.calendars ?? state.calendars,
        events: action.payload.events,
        selectedCalendars: action.payload.calendars
          ? action.payload.calendars.map(() => true)
          : state.selectedCalendars,
      };
    case 'toggle':
      const newCalendar = [...state.selectedCalendars];
      newCalendar[action.payload.index] = !newCalendar[action.payload.index];
      return {
        ...state,
        selectedCalendars: newCalendar,
      };
    case 'new':
      return {
        ...state,
        openEvent: {
          date: action.payload.date,
          desc: '',
          calendarId: state.calendars[0].id,
        },
      };
    case 'close':
      return {
        ...state,
        openEvent: null,
      };
    case 'edit':
      return { ...state, openEvent: action.payload.event };
    default:
      return state;
  }
}
