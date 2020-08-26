import { Injectable, NotFoundException } from '@nestjs/common';
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
        const found = this.tasks.find(t=> t.id === id);
        if(!found)
            throw new NotFoundException("Can't find task with Id ",id);
        return found;
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
        const toDelete = this.findById(id);
        this.tasks = this.tasks.filter(t=> t.id !== toDelete.id);
    }

    updateTask(updateDto: UpdateDTO): Task
    {
        let toChange = this.findById(updateDto.id);
        toChange = updateDto;
        return toChange;
    }

    searchTask(searchDto: SearchTaskDTO): SearchTaskResultDTO
    {
        const {description, title, status} = searchDto;
        let result: Task[];

        if(description || title)
            result = this.tasks.filter(t=> (t.description.includes(description) || 
                                         t.title.includes(title)) &&
                                         t.status === status);
        else
            result = this.tasks.filter(t=> searchDto.status || t.status === status);

        if(searchDto.skip && searchDto.top)
           result = result.slice(searchDto.skip, searchDto.skip + searchDto.top + 1);    

        return {
            tasks: result,
            resultCount: result.length
        };
    }
}
