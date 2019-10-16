import { TodoCalendarService } from '../..';

export interface CommandDetail {
  action: string,
  input: string,
}

export interface ExecutionContext {
  service: TodoCalendarService,
  start: Date,
  end: Date,
}

export class CommandExecutor {
  service: TodoCalendarService;
  constructor(service: TodoCalendarService) {
    this.service = service;
  }

  async exec(range: { start: Date, end: Date }, detail: CommandDetail) {
    const action = detail.action;
    try {
      const importedModule = await import('./command/' + action);
      const execution = importedModule[action];
      return execution({
        service: this.service,
        start: range.start,
        end: range.end,
      }, detail);
    } catch (error) {
      alert(`The command "${action}" is not implemented yet`);
    }
  }
};
