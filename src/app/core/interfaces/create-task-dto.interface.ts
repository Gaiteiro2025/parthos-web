import { TaskStatus } from '@core/enums/task-status.enum';
import { TaskType } from '@core/enums/task-type.enum';


export interface CreateTaskDto {
    title: string;
    description: string;
    assign?: string;
    type: TaskType;
    status: TaskStatus;
    dueDate: Date;
    completedAt: Date;
    createdAt: Date;
    updatedAt: Date;

}
