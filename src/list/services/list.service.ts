import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, ILike, Repository } from 'typeorm';
import { Lists } from '../entities/list.entity';

@Injectable()
export class ListsService {
  constructor(
    @InjectRepository(Lists)
    private listsRepository: Repository<Lists>,
  ) {}

  async findAll(): Promise<Lists[]> {
    return await this.listsRepository.find({
      relations: {
        task: true,
      },
    });
  }

  async findById(id: number): Promise<Lists> {
    const list = await this.listsRepository.findOne({
      where: {
        id,
      },
      relations: {
        task: true,
      },
    });

    if (!list)
      throw new HttpException('Lista não encontrada!', HttpStatus.NOT_FOUND);

    return list;
  }

  async findByTitle(title: string): Promise<Lists[]> {
    return await this.listsRepository.find({
      where: {
        title: ILike(`%${title}%`),
      },
      relations: {
        task: true,
      },
    });
  }

  async create(lists: Lists): Promise<Lists> {
    return await this.listsRepository.save(lists);
  }

  async update(lists: Lists): Promise<Lists> {
    let findList = await this.findById(lists.id);

    if (!findList || !lists.id)
      throw new HttpException('Tema não encontrado!', HttpStatus.NOT_FOUND);

    return await this.listsRepository.save(lists);
  }

  async delete(id: number): Promise<DeleteResult> {
    let findList = await this.findById(id);

    if (!findList)
      throw new HttpException('Tema não encontrado!', HttpStatus.NOT_FOUND);

    return await this.listsRepository.delete(id);
  }
}
