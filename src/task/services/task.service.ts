import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, LessThan, MoreThan, Repository } from 'typeorm';
import { Task } from '../entities/task.entity';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
  ) {}

  async findAll(): Promise<Task[]> {
    return await this.taskRepository.find();
  }

  async findByOrder(order: number): Promise<Task> {
    const task = await this.taskRepository.findOne({
      where: {
        order,
      },
    });

    if (!task)
      throw new HttpException('Task não encontrada!', HttpStatus.NOT_FOUND);

    return task;
  }

  async findByHighestPriority(order: number): Promise<Task[]> {
    const task = await this.taskRepository.find({
      where: {
        order: MoreThan(order),
      },
    });

    if (!task)
      throw new HttpException('Tasks não encontradas!', HttpStatus.NOT_FOUND);

    return task;
  }

  async findByLowestPriority(order: number): Promise<Task[]> {
    const task = await this.taskRepository.find({
      where: {
        order: LessThan(order),
      },
    });

    if (!task)
      throw new HttpException('Tasks não encontradas!', HttpStatus.NOT_FOUND);

    return task;
  }

  async findByDescription(description: string): Promise<Task[]> {
    if (description.trim() === '') {
      throw new HttpException(
        'Description cannot be empty',
        HttpStatus.BAD_REQUEST,
      );
    }

    return await this.taskRepository.find({
      where: {
        description: ILike(`%${description}%`),
      },
    });
  }

  async create(task: Task): Promise<Task> {
    return await this.taskRepository.save(task);
  }
}
