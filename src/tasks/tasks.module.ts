import { TasksService } from './tasks.service';
import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskRepository } from './tasks.repository';
import { AuthModule } from 'src/auth/auth.module';
import { UserRepository } from 'src/auth/auth.repository';

@Module({
    imports: [
        TypeOrmModule.forFeature([TaskRepository, UserRepository]),
        AuthModule
    ],
    controllers: [
        TasksController,
    ],
    providers: [
        TasksService, 
    ],
})
export class TasksModule {}
