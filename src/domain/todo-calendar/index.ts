import { InjectionKey } from '@vue/composition-api';
import { CalendarEventsAPI } from './api/calendar-events';
import { Google } from '~/domain/google/api';

export const TodoCalendarServiceKey: InjectionKey<TodoCalendarService> = Symbol('TodoCalendarServiceKey');

export interface TodoCalendarServiceConstructorOption {
  google: {
    apiKey: string
    clientId: string
    discoveryDocs?: string[],
    scope?: string,
  }
}

export class TodoCalendarService {
  private service: Google.APIService
  events: CalendarEventsAPI;

  constructor(option: TodoCalendarServiceConstructorOption) {
    this.service = new Google.APIService({
      // Array of API discovery doc URLs for APIs used by the quickstart
      discoveryDocs: [
        'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest',
        'https://www.googleapis.com/discovery/v1/apis/tasks/v1/rest'
      ],
      // Authorization scopes required by the API; multiple scopes can be
      // included, separated by spaces.
      scope: [
        'https://www.googleapis.com/auth/calendar.readonly',
        'https://www.googleapis.com/auth/calendar',
        'https://www.googleapis.com/auth/tasks.readonly',
        'https://www.googleapis.com/auth/tasks'
      ].join(' '),
      ...option.google,
    });

    this.events = new CalendarEventsAPI(this.service);
  }
}
