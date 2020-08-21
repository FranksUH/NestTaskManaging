import { Controller, Get, Post, Body, Param, Delete, Put, Query } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './tasks.model';
import { CreateTaskDTO } from './dto/createTaskDTO';
import { UpdateDTO } from './dto/updateDTO';
import { SearchTaskDTO } from './dto/searchTaskDTO';
import { SearchTaskResultDTO } from './dto/searchTaskResultDTO';

@Controller('tasks')
export class TasksController 
{
    constructor(private taskService: TasksService){}

    @Get()
    getAllTasks(): Task[]
    {
        return this.taskService.getAllTasks();
    }

    @Get('/:id')
    findById(@Param('id') id: string): Task
    {
        return this.taskService.findById(id);
    }

    @Post()
    createTask(@Body() createDto: CreateTaskDTO): Task
    {
        return this.taskService.createTask(createDto);
    }

    @Delete('/:id')
    deleteTask(@Param('id') id: string): void
    {
        this.taskService.deleteTask(id);
    }

    @Put()
    updateTask(@Body() updateDto: UpdateDTO): Task
    {
        return this.updateTask(updateDto);
    }

    @Get('/:skip/:top/search')
    searchTasks(
        @Query() filterData: SearchTaskDTO,
        @Param('skip') skip: number,
        @Param('top') top: number): SearchTaskResultDTO
    {
        return this.searchTasks(filterData, skip, top);
    }
}
