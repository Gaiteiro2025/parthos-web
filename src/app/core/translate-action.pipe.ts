import { Pipe, PipeTransform } from '@angular/core';
import { TaskHistoryAction } from './enums/task-history-action.enum';

@Pipe({ name: 'translateAction' })
export class TranslateActionPipe implements PipeTransform {
  transform(action: TaskHistoryAction): string {
    const actionsMap = {
      [TaskHistoryAction.CREATED]: 'tarefa criada',
      [TaskHistoryAction.UPDATED]: 'tarefa atualizada',
      [TaskHistoryAction.UPDATED_MANY]: 'tarefa atualizada',
      [TaskHistoryAction.DELETED]: 'tarefa removida',
      [TaskHistoryAction.MESSAGE_ADDED]: 'escreveu uma mensage',
    };
    return actionsMap[action] || action;
  }
}
