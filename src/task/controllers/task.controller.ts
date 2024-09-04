import { Controller, Get, HttpCode, HttpStatus, Param, ParseIntPipe } from "@nestjs/common";
import { TaskService } from "../services/task.service";
import { Task } from "../entities/task.entity";

@Controller('/tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(): Promise<Task[]> {
    return this.taskService.findAll();
  }

  @Get('/:order')
  @HttpCode(HttpStatus.OK)
  findByOrder(@Param('order', ParseIntPipe) order: number): Promise<Task> {
    return this.taskService.findByOrder(order);
  }

  @Get('/:task')
  @HttpCode(HttpStatus.OK)
  findByTask(@Param('task', ParseIntPipe) task: string): Promise<Task[]> {
    return this.taskService.findByTask(task);
  }
}