import { Repository, EntityRepository } from "typeorm";
import { Task } from "./tasks.entity";
import { CreateTaskDTO } from "./dto/createTaskDTO";
import { TaskStatus } from "./task-status.enum";
import { SearchTaskDTO } from "./dto/searchTaskDTO";
import { SearchTaskResultDTO } from "./dto/searchTaskResultDTO";

@EntityRepository(Task)
export class TaskRepository extends Repository<Task>
{
    async CreateTask(taskDto: CreateTaskDTO): Promise<Task>
    {
        const task = new Task();
        task.description = taskDto.description;
        task.title = taskDto.title;
        task.status = TaskStatus.OPEN

        await task.save();
        return task;
    }

    async FilterTasks(searchDto: SearchTaskDTO): Promise<SearchTaskResultDTO>
    {
        const { filterText, status, skip, top } = searchDto;
        const query = this.createQueryBuilder('task');

        if(filterText)
            query.andWhere('task.description LIKE :filterText OR task.title LIKE :filterText',{filterText: `%${filterText}%`});
        if(status)
            query.andWhere('task.status = :status',{status});


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