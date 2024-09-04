import { Controller, Get, HttpCode, HttpStatus } from "@nestjs/common";
import { TaskService } from "../services/task.service";
import { Task } from "../entities/task.entity";

@Controller('/tasks')
export class TaskController {
     constructor(private readonly taskService: TaskService) { }

     @Get()
     @HttpCode(HttpStatus.OK)
     findAll(): Promise<Task[]> {
          return this.taskService.findAll();
     }

}