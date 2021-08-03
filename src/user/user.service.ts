import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RoleService } from '../role/role.service';
import { Repository, UpdateResult } from 'typeorm';
import { RegisterRequest } from '../authentication/dto/register.request.dto';
import { User } from './user.entity';
import { DEFAULT_ROLE_ID } from '../common/constant';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly roleService: RoleService,
  ) {}

  async create(data: RegisterRequest): Promise<User> {
    const user = await this.userRepository.create(data);
    const role = await this.roleService.findOne(DEFAULT_ROLE_ID);
    user.roles = [role];
    return this.userRepository.save(user);
  }

  async findOne(condition): Promise<User> {
    return this.userRepository.findOne({ email: condition.email });
  }

  async findOneOrFail(
    condition,
    options = { relations: ['roles', 'roles.permissions'] },
  ): Promise<User> {
    return this.userRepository.findOneOrFail(condition, options);
  }

  async setCurrentRefreshToken(
    currentHashedRefreshToken: string,
    userId: number,
  ): Promise<boolean> {
    await this.userRepository.update(userId, {
      currentHashedRefreshToken,
    });

    return true;
  }

  async getById(id: number) {
    const user = await this.userRepository.findOne({ id });
    if (user) {
      return user;
    }
    throw new NotFoundException('user does not exit!');
  }

  resetPassword(id: number, newHashedPassword: string): Promise<UpdateResult> {
    return this.userRepository.update(id, { password: newHashedPassword });
  }

}
