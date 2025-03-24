import { TaskHistoryAction } from '../enums/task-history-action.enum';
import { Task } from './task.interface';
import { User } from './user.interface';


export interface TaskHistory {
    id: string;
    task: Task;
    changedBy: User;
    fieldChanged: string;
    oldValue: string;
    newValue: string;
    createdAt: Date;
    action: TaskHistoryAction;
}
