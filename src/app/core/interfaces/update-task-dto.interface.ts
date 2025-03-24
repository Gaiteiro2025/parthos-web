import { TaskStatus } from '@core/enums/task-status.enum';
import { TaskType } from '@core/enums/task-type.enum';


export interface UpdateTaskDto {
    title?: string;
    description?: string;
    assign?: string;
    type?: TaskType;
    status?: TaskStatus;
    dueDate?: Date;
    completedAt?: Date;
    updatedAt?: Date;
}
