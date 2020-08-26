import { Controller, Get, Post, Body, Param, Delete, Put, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './tasks.model';
import { CreateTaskDTO } from './dto/createTaskDTO';
import { UpdateDTO } from './dto/updateDTO';
import { SearchTaskDTO } from './dto/searchTaskDTO';
import { SearchTaskResultDTO } from './dto/searchTaskResultDTO';
import { TaskStatusValidatorPipe } from './pipes/statusValidatorPipe';

@Controller('tasks')
export class TasksController 
{
    constructor(private taskService: TasksService){}

    
    @Get()
    @UsePipes(ValidationPipe)
    searchTasks(@Query(TaskStatusValidatorPipe) filterData: SearchTaskDTO
        ): SearchTaskResultDTO
    {
        console.log("Searching...")
        return this.taskService.searchTask(filterData);
    }

    @Get('/:id')
    findById(@Param('id') id: string): Task
    {
        return this.taskService.findById(id);
    }

    @Get()
    getAllTasks(): Task[]
    {
        console.log("All...")
        return this.taskService.getAllTasks();
    }

    @Post()
    @UsePipes(ValidationPipe)
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
    @UsePipes(ValidationPipe)
    updateTask(@Body(TaskStatusValidatorPipe) updateDto: UpdateDTO): Task
    {
        return this.taskService.updateTask(updateDto);
    }    
}
