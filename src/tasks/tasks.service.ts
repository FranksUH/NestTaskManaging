import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './tasks.model';
import { CreateTaskDTO } from './dto/createTaskDTO';
import { UpdateDTO } from './dto/updateDTO';
import { SearchTaskDTO } from './dto/searchTaskDTO';
import { SearchTaskResultDTO } from './dto/searchTaskResultDTO';
import * as uuid from 'uuid';

@Injectable()
export class TasksService 
{
    private tasks: Task[] = [];

    getAllTasks(): Task[]
    {
        return this.tasks;        
    }

    findById(id: string):Task
    {
        return this.tasks.find(t=> t.id === id);
    }

    createTask(createDto: CreateTaskDTO): Task
    {
        const {title, description} = createDto;

        const newTask: Task = {
            title,
            description,
            status: TaskStatus.OPEN,
            id: uuid.v1()
        }
        this.tasks.push(newTask);
        return newTask;
    }

    deleteTask(id: string): void
    {
        this.tasks = this.tasks.filter(t=> t.id !== id);
    }

    updateTask(updateDto: UpdateDTO): Task
    {
        let toChange = this.findById(updateDto.id);
        toChange = updateDto;
        return toChange;
    }

    searchTask(searchDto: SearchTaskDTO, skip: number, top: number): SearchTaskResultDTO
    {
        const {description, title, status} = searchDto;
        let result: Task[];

        if(description || title)
            result = this.tasks.filter(t=> (t.description.includes(description) || 
                                         t.title.includes(title)) &&
                                         t.status === status).slice(skip, skip+top+1);
        else
            result = this.tasks.filter(t=> (t.description.includes(description) || 
                                         t.title.includes(title)) &&
                                         t.status === status).slice(skip, skip+top+1);

        return {
            tasks: result,
            resultCount: result.length
        };
    }
}
