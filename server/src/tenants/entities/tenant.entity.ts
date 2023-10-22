import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  Generated,
} from 'typeorm';
import { BaseEntity } from '@database/base.entity';
import { User } from '@users/entities/user.entity';

@Entity()
export class Tenant extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  @Generated('uuid')
  api_key: string;

  @Column({ unique: true })
  name: string;

  @Column()
  password: string;

  @OneToOne(() => User, (user) => user.id)
  @JoinColumn({ name: 'user_id' })
  user_id: string;

  constructor(item: Partial<Tenant>) {
    super();
    Object.assign(this, item);
  }
}
