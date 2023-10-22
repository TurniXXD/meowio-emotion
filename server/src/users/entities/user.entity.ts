import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { BaseEntity } from '@database/base.entity';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  avatar_id: string;

  @Column()
  username: string;

  @Column({ unique: true, nullable: true })
  email: string | null;

  @Column()
  password: string;

  constructor(user: Partial<User>) {
    super();
    Object.assign(this, user);
  }
}
