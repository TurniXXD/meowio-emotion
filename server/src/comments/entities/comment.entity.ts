import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import { BaseEntity } from '@database/base.entity';
import { Article } from '@articles/entities/article.entity';
import { User } from '@users/entities/user.entity';

@Entity()
export class Comment extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Article, (article) => article.id)
  @JoinColumn({ name: 'article_id' })
  article_id: string;

  @OneToOne(() => User, (user) => user.id)
  @JoinColumn({ name: 'author_id' })
  author_id: string;

  @Column()
  content: string;

  @Column({ default: 0 })
  score: number;

  constructor(user: Partial<Comment>) {
    super();
    Object.assign(this, user);
  }
}
