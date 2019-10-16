import { TodoCalendarService } from '../..';

export interface CommandDetail {
  action: string,
  task: string,
}

export class CommandExecutor {
  service: TodoCalendarService;
  constructor(service: TodoCalendarService) {
    this.service = service;
  }

  exec(detail: CommandDetail) {
    console.log(detail);
  }
};
