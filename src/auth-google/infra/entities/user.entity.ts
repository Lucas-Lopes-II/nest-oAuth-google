import { Column, Entity, PrimaryColumn } from 'typeorm';
import { IUserEntity } from './../../domain/user-entity.interface';

@Entity('users')
export class UserEntity implements IUserEntity {
  @PrimaryColumn()
  id: string;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false, unique: true })
  email: string;
}
