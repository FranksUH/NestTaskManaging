import { Controller, Get, Post, Body, Param, Delete, Put, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './tasks.entity';
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
    async searchTasks(@Query(TaskStatusValidatorPipe) filterData: SearchTaskDTO
        ): Promise<SearchTaskResultDTO>
    {
        console.log("Searching...")
        return await this.taskService.searchTask(filterData);
    }

    @Get('/:id')
    async findById(@Param('id') id: string): Promise<Task>
    {
        return await this.taskService.findById(id);
    }

    @Get()
    async getAllTasks(): Promise<Task[]>
    {
        console.log("All...")
        return await this.taskService.getAllTasks();
    }

    @Post()
    @UsePipes(ValidationPipe)
    async createTask(@Body() createDto: CreateTaskDTO): Promise<Task>
    {
        return await this.taskService.createTask(createDto);
    }

    @Delete('/:id')
    async deleteTask(@Param('id') id: string): Promise<void>
    {
       await this.taskService.deleteTask(id);
    }

    @Put()
    @UsePipes(ValidationPipe)
    async updateTask(@Body(TaskStatusValidatorPipe) updateDto: UpdateDTO): Promise<Task>
    {
        return await this.taskService.updateTask(updateDto);
    }    
}
