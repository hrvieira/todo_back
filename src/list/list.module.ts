import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Lists } from './entities/list.entity';
import { ListsService } from './services/list.service';
import { ListsController } from './controllers/list.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Lists])],
  providers: [ListsService],
  controllers: [ListsController],
  exports: [TypeOrmModule],
})
export class ListsModule {}
