import { TaskPriority } from '@core/enums/task-priority.enum';
import { TaskStatus } from '@core/enums/task-status.enum';
import { TaskType } from '@core/enums/task-type.enum';
import { User } from '@core/interfaces/user.interface';


export interface Task {
    id: string;
    title: string;
    description: string;
    status: TaskStatus;
    assign?: User;
    type: TaskType;
    priority?: TaskPriority;
    dueDate?: Date;
    completedAt?: Date;
    createdAt?: Date;
    updatedAt?: Date;
}


