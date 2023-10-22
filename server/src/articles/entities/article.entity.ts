import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { BaseEntity } from '@database/base.entity';
import { Field } from '@nestjs/graphql';

@Entity()
export class Article extends BaseEntity {
  @Field({
    description: 'The ID of the article.',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  image_id: string;

  @Column()
  title: string;

  @Column()
  perex: string;

  @Column()
  content: string;

  constructor(item: Partial<Article>) {
    super();
    Object.assign(this, item);
  }
}
