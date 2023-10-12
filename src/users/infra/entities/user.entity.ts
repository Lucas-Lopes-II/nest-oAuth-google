import { Column, Entity, PrimaryColumn } from 'typeorm';
import { IUserEntity } from '../../domain/user-entity.interface';

@Entity('users')
export class UserEntity implements IUserEntity {
  @PrimaryColumn()
  id: string;

  @Column({ nullable: false, width: 100 })
  name: string;

  @Column({ nullable: false, unique: true, width: 100 })
  email: string;
}
