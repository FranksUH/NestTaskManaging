import { Repository, EntityRepository } from "typeorm";
import { Task } from "./tasks.entity";
import { CreateTaskDTO } from "./dto/createTaskDTO";
import { TaskStatus } from "./task-status.enum";
import { SearchTaskDTO } from "./dto/searchTaskDTO";
import { SearchTaskResultDTO } from "./dto/searchTaskResultDTO";
import { User } from "src/auth/auth.entity";

@EntityRepository(Task)
export class TaskRepository extends Repository<Task>
{
    async CreateTask(taskDto: CreateTaskDTO, user: string): Promise<Task>
    {
        const task = new Task();
        task.description = taskDto.description;
        task.title = taskDto.title;
        task.status = TaskStatus.OPEN;
        task.userId = user

        await task.save();
        delete task.userId;
        
        return task;
    }

    async FilterTasks(searchDto: SearchTaskDTO, userId: string): Promise<SearchTaskResultDTO>
    {
        const { filterText, status, skip, top } = searchDto;
        const query = this.createQueryBuilder('task');

        if(filterText)
            query.andWhere('task.description LIKE :filterText OR task.title LIKE :filterText',{filterText: `%${filterText}%`});
        if(status)
            query.andWhere('task.status = :status',{status});


        query.andWhere('task.userId = :userId', {userId});

        const length = await query.getCount();
        if(skip)
            query.skip(skip);
        if(top)
            query.limit(top);

        return {
            tasks: await query.getMany(),
            resultCount: length
        }
    }
}