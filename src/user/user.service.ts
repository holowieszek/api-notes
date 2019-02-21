import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { Repository } from 'typeorm';
import { UserDTO } from './user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>
  ) {}

  async register(data: UserDTO): Promise<any> {
    const { username } = data;
    let user = await this.userRepository.findOne({ where: { username }});

    if (user) {
      // return 'This users exists!';
      throw new HttpException('This user exists!', HttpStatus.BAD_REQUEST);
    }

    user = await this.userRepository.save(data);

    return user;
  }
}
