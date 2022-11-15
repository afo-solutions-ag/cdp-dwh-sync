import { Injectable } from '@nestjs/common';
import { SNSService } from '../sns/sns.service';
import { GraphQLService } from '../graphql/graphql.service';
import {
  RedshiftConfigurationDto,
  SystemAdminDto,
  SystemDto,
  UnitDto,
  UnitUserDto,
  UserDto,
} from './trigger-hook.dtos';
import { GlobalAdminDto } from './trigger-hook.dtos/global-admin.dtos';

const tidyUpUser = (user: UserDto): UserDto => ({
  id: user.id,
  email: user.email,
  first_name: user.first_name,
  last_name: user.last_name,
});

const tidyUpUnitUser = (unitUser: UnitUserDto): UnitUserDto => ({
  unit_id: unitUser.unit_id,
  user_id: unitUser.user_id,
});

const tidyUpSystemAdmin = (systemAdmin: SystemAdminDto): SystemAdminDto => ({
  user_id: systemAdmin.user_id,
  system_id: systemAdmin.system_id,
});

const tidyUpGlobalAdmin = (globalAdmin: GlobalAdminDto): GlobalAdminDto => ({
  user_id: globalAdmin.user_id,
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
  constructor(
    private readonly snsService: SNSService,
    private readonly graphQLService: GraphQLService,
  ) {}

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
    const oldSystemIds = await this.graphQLService.getUserSystemIds(oldUser.id);
    const newSystemIds = await this.graphQLService.getUserSystemIds(newUser.id);
    const systemIds = Array.from(new Set([...oldSystemIds, ...newSystemIds]));

    await Promise.all(
      systemIds.map(async (systemId) => {
        await this.snsService.sendMessage({ systemId }, 'USER');
      }),
    );
  }

  async deleteUser(oldUser: UserDto) {
    oldUser = tidyUpUser(oldUser);

    console.log('Delete user triggered with', JSON.stringify(oldUser, null, 2));
    const systemIds = await this.graphQLService.getSystemIds();

    await Promise.all(
      systemIds.map(async (systemId) => {
        await this.snsService.sendMessage({ systemId }, 'USER');
      }),
    );
  }

  async createUnitUser(newUnitUser: UnitUserDto) {
    newUnitUser = tidyUpUnitUser(newUnitUser);

    console.log(
      'Create unit user triggered with',
      JSON.stringify(newUnitUser, null, 2),
    );
    const systemId = await this.graphQLService.getUnitSystemId(
      newUnitUser.unit_id,
    );
    if (systemId === undefined) {
      throw new Error(`No system found for unit ${newUnitUser.unit_id}`);
    }
    await this.snsService.sendMessage({ systemId }, 'USER');
  }

  async updateUnitUser(oldUnitUser: UnitUserDto, newUnitUser: UnitUserDto) {
    oldUnitUser = tidyUpUnitUser(oldUnitUser);
    newUnitUser = tidyUpUnitUser(newUnitUser);

    console.log(
      'Update unit user triggered with',
      JSON.stringify(oldUnitUser, null, 2),
      JSON.stringify(newUnitUser, null, 2),
    );
    const oldSystemId = await this.graphQLService.getUnitSystemId(
      oldUnitUser.unit_id,
    );
    const newSystemId = await this.graphQLService.getUnitSystemId(
      newUnitUser.unit_id,
    );
    if (oldSystemId === undefined || newSystemId === undefined) {
      throw new Error(
        `No system found for unit ${oldUnitUser.unit_id} or ${newUnitUser.unit_id}`,
      );
    }
    await this.snsService.sendMessage({ systemId: oldSystemId }, 'USER');
    if (oldSystemId !== newSystemId) {
      await this.snsService.sendMessage({ systemId: newSystemId }, 'USER');
    }
  }

  async deleteUnitUser(oldUnitUser: UnitUserDto) {
    oldUnitUser = tidyUpUnitUser(oldUnitUser);

    console.log(
      'Delete unit user triggered with',
      JSON.stringify(oldUnitUser, null, 2),
    );
    const systemId = await this.graphQLService.getUnitSystemId(
      oldUnitUser.unit_id,
    );
    if (systemId === undefined) {
      throw new Error(`No system found for unit ${oldUnitUser.unit_id}`);
    }
    await this.snsService.sendMessage({ systemId }, 'USER');
  }

  async createSystemAdmin(newSystemAdmin: SystemAdminDto) {
    newSystemAdmin = tidyUpSystemAdmin(newSystemAdmin);

    console.log(
      'Create system admin triggered with',
      JSON.stringify(newSystemAdmin, null, 2),
    );
    await this.snsService.sendMessage(
      { systemId: newSystemAdmin.system_id },
      'USER',
    );
  }

  async updateSystemAdmin(
    oldSystemAdmin: SystemAdminDto,
    newSystemAdmin: SystemAdminDto,
  ) {
    oldSystemAdmin = tidyUpSystemAdmin(oldSystemAdmin);

    console.log(
      'Update system admin triggered with',
      JSON.stringify(oldSystemAdmin, null, 2),
      JSON.stringify(newSystemAdmin, null, 2),
    );
    await this.snsService.sendMessage(
      { systemId: oldSystemAdmin.system_id },
      'USER',
    );
    if (oldSystemAdmin.system_id !== newSystemAdmin.system_id) {
      await this.snsService.sendMessage(
        { systemId: newSystemAdmin.system_id },
        'USER',
      );
    }
  }

  async deleteSystemAdmin(oldSystemAdmin: SystemAdminDto) {
    oldSystemAdmin = tidyUpSystemAdmin(oldSystemAdmin);

    console.log(
      'Delete system admin triggered with',
      JSON.stringify(oldSystemAdmin, null, 2),
    );
    await this.snsService.sendMessage(
      { systemId: oldSystemAdmin.system_id },
      'USER',
    );
  }

  async createGlobalAdmin(newGlobalAdmin: GlobalAdminDto) {
    newGlobalAdmin = tidyUpGlobalAdmin(newGlobalAdmin);

    console.log(
      'Create global admin triggered with',
      JSON.stringify(newGlobalAdmin, null, 2),
    );
    const systemIds = await this.graphQLService.getSystemIds();

    await Promise.all(
      systemIds.map(async (systemId) => {
        await this.snsService.sendMessage({ systemId }, 'USER');
      }),
    );
  }

  async updateGlobalAdmin(
    oldGlobalAdmin: GlobalAdminDto,
    newGlobalAdmin: GlobalAdminDto,
  ) {
    oldGlobalAdmin = tidyUpGlobalAdmin(oldGlobalAdmin);
    newGlobalAdmin = tidyUpGlobalAdmin(newGlobalAdmin);

    console.log(
      'Update global admin triggered with',
      JSON.stringify(oldGlobalAdmin, null, 2),
      JSON.stringify(newGlobalAdmin, null, 2),
    );
    const systemIds = await this.graphQLService.getSystemIds();

    await Promise.all(
      systemIds.map(async (systemId) => {
        await this.snsService.sendMessage({ systemId }, 'USER');
      }),
    );
  }

  async deleteGlobalAdmin(oldGlobalAdmin: GlobalAdminDto) {
    oldGlobalAdmin = tidyUpGlobalAdmin(oldGlobalAdmin);

    console.log(
      'Delete global admin triggered with',
      JSON.stringify(oldGlobalAdmin, null, 2),
    );
    const systemIds = await this.graphQLService.getSystemIds();

    await Promise.all(
      systemIds.map(async (systemId) => {
        await this.snsService.sendMessage({ systemId }, 'USER');
      }),
    );
  }

  async createUnit(newUnit: UnitDto) {
    newUnit = tidyUpUnit(newUnit);

    console.log('Create unit triggered with', JSON.stringify(newUnit, null, 2));
    await this.snsService.sendMessage({ systemId: newUnit.system_id }, 'UNIT');
  }

  async updateUnit(oldUnit: UnitDto, newUnit: UnitDto) {
    oldUnit = tidyUpUnit(oldUnit);
    newUnit = tidyUpUnit(newUnit);

    console.log(
      'Update unit triggered with',
      JSON.stringify(oldUnit, null, 2),
      JSON.stringify(newUnit, null, 2),
    );
    await this.snsService.sendMessage({ systemId: oldUnit.system_id }, 'UNIT');
    if (oldUnit.system_id !== newUnit.system_id) {
      await this.snsService.sendMessage(
        { systemId: newUnit.system_id },
        'UNIT',
      );
    }
  }

  async deleteUnit(oldUnit: UnitDto) {
    oldUnit = tidyUpUnit(oldUnit);

    console.log('Delete unit triggered with', JSON.stringify(oldUnit, null, 2));
    await this.snsService.sendMessage({ systemId: oldUnit.system_id }, 'UNIT');
  }

  async createSystem(newSystem: SystemDto) {
    newSystem = tidyUpSystem(newSystem);

    console.log(
      'Create system triggered with',
      JSON.stringify(newSystem, null, 2),
    );
    await this.snsService.sendMessage({ systemId: newSystem.id }, 'SYSTEM');
  }

  async updateSystem(oldSystem: SystemDto, newSystem: SystemDto) {
    oldSystem = tidyUpSystem(oldSystem);
    newSystem = tidyUpSystem(newSystem);

    console.log(
      'Update system triggered with',
      JSON.stringify(oldSystem, null, 2),
      JSON.stringify(newSystem, null, 2),
    );
    await this.snsService.sendMessage({ systemId: oldSystem.id }, 'SYSTEM');
    if (oldSystem.id !== newSystem.id) {
      await this.snsService.sendMessage({ systemId: newSystem.id }, 'SYSTEM');
    }
  }

  async deleteSystem(oldSystem: SystemDto) {
    oldSystem = tidyUpSystem(oldSystem);

    console.log(
      'Delete system triggered with',
      JSON.stringify(oldSystem, null, 2),
    );
    await this.snsService.sendMessage({ systemId: oldSystem.id }, 'SYSTEM');
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
    await this.snsService.sendMessage(
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
    await this.snsService.sendMessage(
      { systemId: oldRedshiftConfiguration.system_id },
      'REDSHIFT_CONFIGURATION',
    );
    if (
      oldRedshiftConfiguration.system_id !== newRedshiftConfiguration.system_id
    ) {
      await this.snsService.sendMessage(
        { systemId: newRedshiftConfiguration.system_id },
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
    await this.snsService.sendMessage(
      { systemId: oldRedshiftConfiguration.system_id },
      'REDSHIFT_CONFIGURATION',
    );
  }
}
