import { IUserEntity } from '../../../users/domain/user-entity.interface';

export abstract class IUserRepository<Entity extends IUserEntity> {
  abstract create(createEntityData: Entity): Promise<Entity>;
  abstract findByEmail(email: string): Promise<Entity | Partial<Entity>>;
}
