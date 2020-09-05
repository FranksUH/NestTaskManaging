import { Controller, Get, Post, Body, Param, Delete, Put, Query, UsePipes, ValidationPipe, UseGuards, Req } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './tasks.entity';
import { CreateTaskDTO } from './dto/createTaskDTO';
import { UpdateDTO } from './dto/updateDTO';
import { SearchTaskDTO } from './dto/searchTaskDTO';
import { SearchTaskResultDTO } from './dto/searchTaskResultDTO';
import { TaskStatusValidatorPipe } from './pipes/statusValidatorPipe';
import { AuthGuard } from '@nestjs/passport';
import { GetUsername } from 'src/auth/getUserName.decorator';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController 
{
    constructor(private taskService: TasksService){}
    
    @Get()
    @UsePipes(ValidationPipe)
    async searchTasks(
        @Query(TaskStatusValidatorPipe) filterData: SearchTaskDTO,
        @Req() req: any
        ): Promise<SearchTaskResultDTO>
    {
        return await this.taskService.searchTask(filterData, req.user?.userId);
    }

    @Get('/:id')
    async findById(@Param('id') id: string, @Req() req: any): Promise<Task>
    {
        return await this.taskService.findById(id, req.user?.userId);
    }

    @Get()
    async getAllTasks(): Promise<Task[]>
    {
        console.log("All...")
        return await this.taskService.getAllTasks();
    }

    @Post()
    @UsePipes(ValidationPipe)
    async createTask(@Body() createDto: CreateTaskDTO, @Req() req): Promise<Task>
    {
        return await this.taskService.createTask(createDto, req.user?.userId);
    }

    @Delete('/:id')
    async deleteTask(@Param('id') id: string, @Req() req: any): Promise<void>
    {
       await this.taskService.deleteTask(id, req.user?.userId);
    }

    @Put()
    @UsePipes(ValidationPipe)
    async updateTask(@Body(TaskStatusValidatorPipe) updateDto: UpdateDTO, @Req() req: any): Promise<Task>
    {
        return await this.taskService.updateTask(updateDto, req.user?.userId);
    }    
}
