import { EntityModel } from '@midwayjs/orm';
import { Column, PrimaryGeneratedColumn } from 'typeorm';

@EntityModel('photo')
export class Photo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 100,
  })
  name: string;

  @Column('text')
  description: string;

  @Column()
  filename: string;

  @Column('double')
  views: number;

  @Column()
  isPublished: boolean;
}
