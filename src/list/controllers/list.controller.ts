import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { ListsService } from '../services/list.service';
import { Lists } from '../entities/list.entity';

@Controller('/lists')
export class ListsController {
  constructor(private readonly listsService: ListsService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(): Promise<Lists[]> {
    return this.listsService.findAll();
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  findById(@Param('id', ParseIntPipe) id: number): Promise<Lists> {
    return this.listsService.findById(id);
  }

  @Get('/title/:title')
  @HttpCode(HttpStatus.OK)
  findByTitle(@Param('title') title: string): Promise<Lists[]> {
    return this.listsService.findByTitle(title);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() tema: Lists): Promise<Lists> {
    return this.listsService.create(tema);
  }

  @Put()
  @HttpCode(HttpStatus.OK)
  update(@Body() list: Lists): Promise<Lists> {
    return this.listsService.update(list);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.listsService.delete(id);
  }
}
