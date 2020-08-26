import { TasksModule } from './tasks/tasks.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfig } from './configs/typeOrm.config';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
        TypeOrmModule.forRoot(TypeOrmConfig),
        TasksModule,
        AuthModule
      ],
  controllers: [
    
  ],
  providers: [
    
  ]
})
export class AppModule {}
