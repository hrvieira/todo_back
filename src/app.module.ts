import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './task/entities/task.entity';
import { TaskModule } from './task/task.module';
import { Lists } from './list/entities/list.entity';
import { ListsModule } from './list/list.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'db_todolist',
      entities: [Task, Lists],
      synchronize: true

    }),
    TaskModule,
    ListsModule

  ],
  controllers: [],
  providers: [],
  
})
export class AppModule {}
