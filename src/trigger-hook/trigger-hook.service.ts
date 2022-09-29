import { Injectable } from '@nestjs/common';
import { SQSService } from 'src/sqs/sqs.service';
import { UserDto } from './trigger-hook.dtos';

type CreateMessage<T = object> = { new: T };
type UpdateMessage<T = object> = { old: T; new: T };
type DeleteMessage<T = object> = { old: T };

const tidyUpUser = (user: UserDto): UserDto => ({
  id: user.id,
  email: user.email,
  first_name: user.first_name,
  last_name: user.last_name,
});

@Injectable()
export class TriggerHookService {
  constructor(private readonly sqsService: SQSService) {}
  async createUser(newUser: UserDto) {
    const message: CreateMessage<UserDto> = { new: tidyUpUser(newUser) };
    await this.sqsService.sendCreateMessage(message, 'user');
  }

  async updateUser(oldUser: UserDto, newUser: UserDto) {
    const message: UpdateMessage<UserDto> = {
      old: tidyUpUser(oldUser),
      new: tidyUpUser(newUser),
    };
    await this.sqsService.sendUpdateMessage(message, 'user');
  }

  async deleteUser(oldUser: UserDto) {
    const message: DeleteMessage<UserDto> = { old: tidyUpUser(oldUser) };
    await this.sqsService.sendDeleteMessage(message, 'user');
  }
}
