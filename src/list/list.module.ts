import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Lists } from './entities/list.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Lists])],
  providers: [],
  controllers: [],
  exports: [TypeOrmModule],
})
export class ListsModule {}
