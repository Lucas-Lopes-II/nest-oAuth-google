import { Equal, Repository } from 'typeorm';
import { IUserRepository } from '../user-repository.interface';
import { UserEntity } from '../../../../users/infra/entities/user.entity';

export class UserRepository implements IUserRepository<UserEntity> {
  public static instance: UserRepository | null = null;

  private constructor(
    protected readonly entityRepository: Repository<UserEntity>,
  ) {}

  public static createInstance(
    entityRepository: Repository<UserEntity>,
  ): UserRepository {
    if (!UserRepository.instance) {
      UserRepository.instance = new UserRepository(entityRepository);
    }

    return this.instance;
  }

  public async create(createEntityData: UserEntity): Promise<UserEntity> {
    const entity = this.entityRepository.create({
      ...createEntityData,
    });

    return this.entityRepository.save(entity);
  }

  public findByEmail(email: string): Promise<UserEntity | Partial<UserEntity>> {
    return this.entityRepository.findOne({
      where: { email: Equal(email.toLowerCase()) },
    });
  }

  public async emailExists(email: string): Promise<boolean> {
    const entity = await this.entityRepository.findOne({
      where: { email: Equal(email.toLowerCase()) },
    });

    return !!entity;
  }
}
