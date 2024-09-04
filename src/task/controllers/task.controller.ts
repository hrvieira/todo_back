import { Body, Controller, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post } from "@nestjs/common";
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

  @Get('/description/:description')
  @HttpCode(HttpStatus.OK)
  findByDescription(
    @Param('description') description: string,
  ): Promise<Task[]> {
    return this.taskService.findByDescription(description);
  }

  @Get('/order/:order')
  @HttpCode(HttpStatus.OK)
  findByOrder(@Param('order', ParseIntPipe) order: number): Promise<Task> {
    return this.taskService.findByOrder(order);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() task: Task): Promise<Task> {
    return this.taskService.create(task);
  }
  
}