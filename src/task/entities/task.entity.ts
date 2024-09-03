import { IsNotEmpty } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({name: 'tb_task'})
export class Task {

     @PrimaryGeneratedColumn()
     id: number;

     @IsNotEmpty()
     @Column({length: 255, nullable: false})
     task: string;
     
     @IsNotEmpty()
     @Column({nullable: false})
     order: number;

     @UpdateDateColumn()
     date: Date;
     
}