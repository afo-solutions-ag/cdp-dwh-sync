import { Injectable } from '@nestjs/common';
import { SQSService } from 'src/sqs/sqs.service';
import { DWHConnectionDto, SystemDto, UnitDto, UserDto } from './trigger-hook.dtos';

type CreateMessage<T = object> = { new: T };
type UpdateMessage<T = object> = { old: T; new: T };
type DeleteMessage<T = object> = { old: T };

const tidyUpUser = (user: UserDto): UserDto => ({
  id: user.id,
  email: user.email,
  first_name: user.first_name,
  last_name: user.last_name,
});

const tidyUpUnit = (unit: UnitDto): UnitDto => ({
  id: unit.id,
  name: unit.name,
  system_id: unit.system_id,
});

const tidyUpSystem = (system: SystemDto): SystemDto => ({
  id: system.id,
  name: system.name,
});

const tidyUpDWHConnection = (
  dwhConnection: DWHConnectionDto,
): DWHConnectionDto => ({
  id: dwhConnection.id,
  host: dwhConnection.host,
  database: dwhConnection.database,
  user: dwhConnection.user,
  system_id: dwhConnection.system_id,
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

  async createUnit(newUnit: UnitDto) {
    const message: CreateMessage<UnitDto> = { new: tidyUpUnit(newUnit) };
    await this.sqsService.sendCreateMessage(message, 'unit');
  }

  async updateUnit(oldUnit: UnitDto, newUnit: UnitDto) {
    const message: UpdateMessage<UnitDto> = {
      old: tidyUpUnit(oldUnit),
      new: tidyUpUnit(newUnit),
    };
    await this.sqsService.sendUpdateMessage(message, 'unit');
  }

  async deleteUnit(oldUnit: UnitDto) {
    const message: DeleteMessage<UnitDto> = { old: tidyUpUnit(oldUnit) };
    await this.sqsService.sendDeleteMessage(message, 'unit');
  }

  async createSystem(newSystem: SystemDto) {
    const message: CreateMessage<SystemDto> = {
      new: tidyUpSystem(newSystem),
    };
    await this.sqsService.sendCreateMessage(message, 'system');
  }

  async updateSystem(oldSystem: SystemDto, newSystem: SystemDto) {
    const message: UpdateMessage<SystemDto> = {
      old: tidyUpSystem(oldSystem),
      new: tidyUpSystem(newSystem),
    };
    await this.sqsService.sendUpdateMessage(message, 'system');
  }

  async deleteSystem(oldSystem: SystemDto) {
    const message: DeleteMessage<SystemDto> = {
      old: tidyUpSystem(oldSystem),
    };
    await this.sqsService.sendDeleteMessage(message, 'system');
  }

  async createDWHConnection(newDWHConnection: DWHConnectionDto) {
    const message: CreateMessage<DWHConnectionDto> = {
      new: tidyUpDWHConnection(newDWHConnection),
    };
    await this.sqsService.sendCreateMessage(message, 'dwh_connection');
  }

  async updateDWHConnection(
    oldDWHConnection: DWHConnectionDto,
    newDWHConnection: DWHConnectionDto,
  ) {
    const message: UpdateMessage<DWHConnectionDto> = {
      old: tidyUpDWHConnection(oldDWHConnection),
      new: tidyUpDWHConnection(newDWHConnection),
    };
    await this.sqsService.sendUpdateMessage(message, 'dwh_connection');
  }

  async deleteDWHConnection(oldDWHConnection: DWHConnectionDto) {
    const message: DeleteMessage<DWHConnectionDto> = {
      old: tidyUpDWHConnection(oldDWHConnection),
    };
    await this.sqsService.sendDeleteMessage(message, 'dwh_connection');
  }
}
