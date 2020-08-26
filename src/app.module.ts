import { TasksModule } from './tasks/tasks.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfig } from './configs/typeOrm.config';

@Module({
  imports: [
        TypeOrmModule.forRoot(TypeOrmConfig),
        TasksModule
      ],
  controllers: [
    
  ],
  providers: [
    
  ]
})
export class AppModule {}
