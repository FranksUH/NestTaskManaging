import {TypeOrmModuleOptions} from '@nestjs/typeorm'
import { Task } from 'src/tasks/tasks.entity'
import { User } from 'src/auth/auth.entity'

export const TypeOrmConfig: TypeOrmModuleOptions =
{
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'Smiguel@96',
    database: 'taskManagement',
    entities: [Task, User],
    synchronize: true
}