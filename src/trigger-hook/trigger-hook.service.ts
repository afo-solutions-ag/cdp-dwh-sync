import { Injectable } from '@nestjs/common';
import { SQSService } from 'src/sqs/sqs.service';
import {
  RedshiftConfigurationDto,
  SystemDto,
  UnitDto,
  UserDto,
} from './trigger-hook.dtos';

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
    newUser = tidyUpUser(newUser);

    console.log('Create user triggered with', JSON.stringify(newUser, null, 2));
  }

  async updateUser(oldUser: UserDto, newUser: UserDto) {
    oldUser = tidyUpUser(oldUser);
    newUser = tidyUpUser(newUser);

    console.log(
      'Update user triggered with',
      JSON.stringify(oldUser, null, 2),
      JSON.stringify(newUser, null, 2),
    );

    // TODO get respective system ids
    // old.unit_access.unit.system_id + new.unit_access.unit.system_id
    // TODO send messages with system ids
  }

  async deleteUser(oldUser: UserDto) {
    oldUser = tidyUpUser(oldUser);

    // TODO get all system
    // TODO send messages with system ids
  }

  async createUnit(newUnit: UnitDto) {
    newUnit = tidyUpUnit(newUnit);

    console.log('Create unit triggered with', JSON.stringify(newUnit, null, 2));
    await this.sqsService.sendMessage({ systemId: newUnit.system_id }, 'UNIT');
  }

  async updateUnit(oldUnit: UnitDto, newUnit: UnitDto) {
    oldUnit = tidyUpUnit(oldUnit);
    newUnit = tidyUpUnit(newUnit);

    console.log(
      'Update unit triggered with',
      JSON.stringify(oldUnit, null, 2),
      JSON.stringify(newUnit, null, 2),
    );
    const oldSystemId = oldUnit.system_id;
    const newSystemId = newUnit.system_id;
    await this.sqsService.sendMessage({ systemId: oldSystemId }, 'UNIT');
    if (oldSystemId !== newSystemId) {
      await this.sqsService.sendMessage({ systemId: newSystemId }, 'UNIT');
    }
  }

  async deleteUnit(oldUnit: UnitDto) {
    oldUnit = tidyUpUnit(oldUnit);

    console.log('Delete unit triggered with', JSON.stringify(oldUnit, null, 2));
    await this.sqsService.sendMessage({ systemId: oldUnit.system_id }, 'UNIT');
  }

  async createSystem(newSystem: SystemDto) {
    newSystem = tidyUpSystem(newSystem);

    console.log(
      'Create system triggered with',
      JSON.stringify(newSystem, null, 2),
    );
    await this.sqsService.sendMessage({ systemId: newSystem.id }, 'SYSTEM');
  }

  async updateSystem(oldSystem: SystemDto, newSystem: SystemDto) {
    oldSystem = tidyUpSystem(oldSystem);
    newSystem = tidyUpSystem(newSystem);

    console.log(
      'Update system triggered with',
      JSON.stringify(oldSystem, null, 2),
      JSON.stringify(newSystem, null, 2),
    );
    const oldSystemId = oldSystem.id;
    const newSystemId = newSystem.id;
    await this.sqsService.sendMessage({ systemId: oldSystemId }, 'SYSTEM');
    if (oldSystemId !== newSystemId) {
      await this.sqsService.sendMessage({ systemId: newSystemId }, 'SYSTEM');
    }
  }

  async deleteSystem(oldSystem: SystemDto) {
    oldSystem = tidyUpSystem(oldSystem);

    console.log(
      'Delete system triggered with',
      JSON.stringify(oldSystem, null, 2),
    );
    await this.sqsService.sendMessage({ systemId: oldSystem.id }, 'SYSTEM');
  }

  async createRedshiftConfiguration(
    newRedshiftConfiguration: RedshiftConfigurationDto,
  ) {
    newRedshiftConfiguration = tidyUpRedshiftConfiguration(
      newRedshiftConfiguration,
    );

    console.log(
      'Create redshift configuration triggered with',
      JSON.stringify(newRedshiftConfiguration, null, 2),
    );
    await this.sqsService.sendMessage(
      { systemId: newRedshiftConfiguration.system_id },
      'REDSHIFT_CONFIGURATION',
    );
  }

  async updateRedshiftConfiguration(
    oldRedshiftConfiguration: RedshiftConfigurationDto,
    newRedshiftConfiguration: RedshiftConfigurationDto,
  ) {
    oldRedshiftConfiguration = tidyUpRedshiftConfiguration(
      oldRedshiftConfiguration,
    );
    newRedshiftConfiguration = tidyUpRedshiftConfiguration(
      newRedshiftConfiguration,
    );

    console.log(
      'Update redshift configuration triggered with',
      JSON.stringify(oldRedshiftConfiguration, null, 2),
      JSON.stringify(newRedshiftConfiguration, null, 2),
    );
    const oldSystemId = oldRedshiftConfiguration.system_id;
    const newSystemId = newRedshiftConfiguration.system_id;
    await this.sqsService.sendMessage(
      { systemId: oldSystemId },
      'REDSHIFT_CONFIGURATION',
    );
    if (oldSystemId !== newSystemId) {
      await this.sqsService.sendMessage(
        { systemId: newSystemId },
        'REDSHIFT_CONFIGURATION',
      );
    }
  }

  async deleteRedshiftConfiguration(
    oldRedshiftConfiguration: RedshiftConfigurationDto,
  ) {
    oldRedshiftConfiguration = tidyUpRedshiftConfiguration(
      oldRedshiftConfiguration,
    );

    console.log(
      'Delete redshift configuration triggered with',
      JSON.stringify(oldRedshiftConfiguration, null, 2),
    );
    await this.sqsService.sendMessage(
      { systemId: oldRedshiftConfiguration.system_id },
      'REDSHIFT_CONFIGURATION',
    );
  }
}
