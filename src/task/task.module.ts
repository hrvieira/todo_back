import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Task } from "./entities/task.entity";
import { TaskService } from "./services/task.service";
import { TaskController } from "./controllers/task.controller";

@Module({
     imports: [TypeOrmModule.forFeature([Task])],
     providers: [TaskService],
     controllers: [TaskController],
     exports: [TypeOrmModule]

})
export class TaskModule {}
