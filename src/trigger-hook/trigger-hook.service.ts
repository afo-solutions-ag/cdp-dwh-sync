import { Injectable } from '@nestjs/common';
import { SQSService } from 'src/sqs/sqs.service';
import {
  RedshiftConfigurationDto,
  SystemDto,
  UnitDto,
  UserDto,
} from './trigger-hook.dtos';

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

const tidyUpRedshiftConfiguration = (
  redshiftConfiguration: RedshiftConfigurationDto,
): RedshiftConfigurationDto => ({
  id: redshiftConfiguration.id,
  host: redshiftConfiguration.host,
  database: redshiftConfiguration.database,
  user: redshiftConfiguration.user,
  system_id: redshiftConfiguration.system_id,
});

@Injectable()
export class TriggerHookService {
  constructor(private readonly sqsService: SQSService) {}

  async createUser(newUser: UserDto) {
    const message: CreateMessage<UserDto> = { new: tidyUpUser(newUser) };
    await this.sqsService.sendCreateMessage(message, 'USER');
  }

  async updateUser(oldUser: UserDto, newUser: UserDto) {
    const message: UpdateMessage<UserDto> = {
      old: tidyUpUser(oldUser),
      new: tidyUpUser(newUser),
    };
    await this.sqsService.sendUpdateMessage(message, 'USER');
  }

  async deleteUser(oldUser: UserDto) {
    const message: DeleteMessage<UserDto> = { old: tidyUpUser(oldUser) };
    await this.sqsService.sendDeleteMessage(message, 'USER');
  }

  async createUnit(newUnit: UnitDto) {
    const message: CreateMessage<UnitDto> = { new: tidyUpUnit(newUnit) };
    await this.sqsService.sendCreateMessage(message, 'UNIT');
  }

  async updateUnit(oldUnit: UnitDto, newUnit: UnitDto) {
    const message: UpdateMessage<UnitDto> = {
      old: tidyUpUnit(oldUnit),
      new: tidyUpUnit(newUnit),
    };
    await this.sqsService.sendUpdateMessage(message, 'UNIT');
  }

  async deleteUnit(oldUnit: UnitDto) {
    const message: DeleteMessage<UnitDto> = { old: tidyUpUnit(oldUnit) };
    await this.sqsService.sendDeleteMessage(message, 'UNIT');
  }

  async createSystem(newSystem: SystemDto) {
    const message: CreateMessage<SystemDto> = {
      new: tidyUpSystem(newSystem),
    };
    await this.sqsService.sendCreateMessage(message, 'SYSTEM');
  }

  async updateSystem(oldSystem: SystemDto, newSystem: SystemDto) {
    const message: UpdateMessage<SystemDto> = {
      old: tidyUpSystem(oldSystem),
      new: tidyUpSystem(newSystem),
    };
    await this.sqsService.sendUpdateMessage(message, 'SYSTEM');
  }

  async deleteSystem(oldSystem: SystemDto) {
    const message: DeleteMessage<SystemDto> = {
      old: tidyUpSystem(oldSystem),
    };
    await this.sqsService.sendDeleteMessage(message, 'SYSTEM');
  }

  async createRedshiftConfiguration(
    newRedshiftConfiguration: RedshiftConfigurationDto,
  ) {
    const message: CreateMessage<RedshiftConfigurationDto> = {
      new: tidyUpRedshiftConfiguration(newRedshiftConfiguration),
    };
    await this.sqsService.sendCreateMessage(message, 'DWH_CONNECTION');
  }

  async updateRedshiftConfiguration(
    oldRedshiftConfiguration: RedshiftConfigurationDto,
    newRedshiftConfiguration: RedshiftConfigurationDto,
  ) {
    const message: UpdateMessage<RedshiftConfigurationDto> = {
      old: tidyUpRedshiftConfiguration(oldRedshiftConfiguration),
      new: tidyUpRedshiftConfiguration(newRedshiftConfiguration),
    };
    await this.sqsService.sendUpdateMessage(message, 'DWH_CONNECTION');
  }

  async deleteRedshiftConfiguration(
    oldRedshiftConfiguration: RedshiftConfigurationDto,
  ) {
    const message: DeleteMessage<RedshiftConfigurationDto> = {
      old: tidyUpRedshiftConfiguration(oldRedshiftConfiguration),
    };
    await this.sqsService.sendDeleteMessage(message, 'DWH_CONNECTION');
  }
}
