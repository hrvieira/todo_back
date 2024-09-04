import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, ILike, LessThan, MoreThan, Repository } from 'typeorm';
import { Task } from '../entities/task.entity';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
  ) {}

  async findAll(): Promise<Task[]> {
    return await this.taskRepository.find({
            relations:{
                list: true
            }
        });
  }

  async findById(id: number): Promise<Task> {
    let task = await this.taskRepository.findOne({
      where: {
        id,
      },
      relations: {
        list: true,
      },
    });

    if (!task)
      throw new HttpException('Task não encontrada!', HttpStatus.NOT_FOUND);

    return task;
  }

  async findByOrder(order: number): Promise<Task> {
    const task = await this.taskRepository.findOne({
      where: {
        order,
      },
      relations: {
        list: true,
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
      relations: {
        list: true,
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
      relations: {
        list: true,
      },
    });

    if (!task)
      throw new HttpException('Tasks não encontradas!', HttpStatus.NOT_FOUND);

    return task;
  }

  async findByDescription(description: string): Promise<Task[]> {
    if (description.trim() === '') {
      throw new HttpException(
        'Descrição não encontrada!',
        HttpStatus.BAD_REQUEST,
      );
    }

    return await this.taskRepository.find({
      where: {
        description: ILike(`%${description}%`),
      },
      relations: {
        list: true,
      },
    });
  }

  async create(task: Task): Promise<Task> {
    return await this.taskRepository.save(task);
  }

  async update(task: Task): Promise<Task> {
    const findTask: Task = await this.findById(task.id);

    if (!findTask || !task.id)
      throw new HttpException('Task não encontrada!', HttpStatus.NOT_FOUND);

    return await this.taskRepository.save(task);
  }

  async delete(id: number): Promise<DeleteResult> {
    const findTask: Task = await this.findById(id);

    if (!findTask)
      throw new HttpException('Tema não foi encontrado!', HttpStatus.NOT_FOUND);

    return await this.taskRepository.delete(id);
  }
  
}
