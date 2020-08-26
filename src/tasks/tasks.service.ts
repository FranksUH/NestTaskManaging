import { Injectable, NotFoundException, Options } from '@nestjs/common';
import { Task } from './tasks.entity';
import { TaskStatus } from './task-status.enum';
import { CreateTaskDTO } from './dto/createTaskDTO';
import { UpdateDTO } from './dto/updateDTO';
import { SearchTaskDTO } from './dto/searchTaskDTO';
import { SearchTaskResultDTO } from './dto/searchTaskResultDTO';
import * as uuid from 'uuid';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskRepository } from './tasks.repository';
import { QueryBuilder } from 'typeorm';

@Injectable()
export class TasksService 
{
    constructor(
        @InjectRepository(TaskRepository)
        private taskRepository: TaskRepository 
    )
    {}

    async getAllTasks(): Promise<Task[]>
    {
        return await this.taskRepository.find();        
    }

    async findById(id: string): Promise<Task>
    {
        const found = await this.taskRepository.findOne(id);
        if(!found)
            throw new NotFoundException("Can't find task with Id ",id);
        return found;
    }

    async createTask(createDto: CreateTaskDTO): Promise<Task>
    {        
        return await this.taskRepository.CreateTask(createDto);
    }

    async deleteTask(id: string): Promise<void>
    {
        const toDelete = await this.findById(id);
        await this.taskRepository.remove(toDelete);
    }

    async updateTask(updateDto: UpdateDTO): Promise<Task>
    {
        let toChange = await this.findById(updateDto.id);
        if(updateDto.description)
            toChange.description = updateDto.description;
        if(updateDto.title)
            toChange.title = updateDto.title;
        if(updateDto.status)
            toChange.status = updateDto.status;
        
        return await this.taskRepository.save(toChange);
    }

    async searchTask(searchDto: SearchTaskDTO): Promise<SearchTaskResultDTO>
    {
        return await this.taskRepository.FilterTasks(searchDto);
    }
}
