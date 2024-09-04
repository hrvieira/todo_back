import { IsNotEmpty } from "class-validator";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Lists } from "../../list/entities/list.entity";

@Entity({ name: 'tb_task' })
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty()
  @Column({ length: 255, nullable: false })
  description: string;

  @IsNotEmpty()
  @Column({ nullable: false })
  order: number;

  @UpdateDateColumn()
  date: Date;

  @ManyToOne(() => Lists, (list) => list.task, {
    onDelete: "CASCADE"
  })
  list: Lists;
}