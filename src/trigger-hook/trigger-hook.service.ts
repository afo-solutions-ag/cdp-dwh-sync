import { Injectable } from '@nestjs/common';
import { UserDto } from './trigger-hook.dtos/user.dto';

@Injectable()
export class TriggerHookService {
  async createUser(newUser: UserDto) {
    console.log('createUser');
    console.log(newUser);
  }

  async updateUser(oldUser: UserDto, newUser: UserDto) {
    console.log('updateUser');
    console.log(oldUser);
    console.log(newUser);
  }

  async deleteUser(oldUser: UserDto) {
    console.log('deleteUser');
    console.log(oldUser);
  }
}
