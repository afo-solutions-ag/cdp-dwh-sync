import { Body, Controller, Get, HttpException, Post } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import {
  DeleteRedshiftConfigurationPayloadDto,
  DeleteSystemPayloadDto,
  DeleteUnitPayloadDto,
  DeleteUnitUserPayloadDto,
  GenericPayloadDto,
  InsertRedshiftConfigurationPayloadDto,
  InsertSystemPayloadDto,
  InsertUnitPayloadDto,
  InsertUnitUserPayloadDto,
  UpdateRedshiftConfigurationPayloadDto,
  UpdateSystemPayloadDto,
  UpdateUnitPayloadDto,
  UpdateUnitUserPayloadDto,
  DeleteUserPayloadDto,
  InsertUserPayloadDto,
  UpdateUserPayloadDto,
  InsertSystemAdminPayloadDto,
  UpdateSystemAdminPayloadDto,
  DeleteSystemAdminPayloadDto,
} from './trigger-hook.dtos';
import {
  DeleteGlobalAdminPayloadDto,
  InsertGlobalAdminPayloadDto,
  UpdateGlobalAdminPayloadDto,
} from './trigger-hook.dtos/global-admin.dtos';
import { TriggerHookService } from './trigger-hook.service';

type Response = {
  entity:
    | 'user'
    | 'unit_user'
    | 'system_admin'
    | 'global_admin'
    | 'unit'
    | 'system'
    | 'redshift_configuration';
  action: 'insert' | 'update' | 'delete';
};

@Controller('/trigger-hook')
export class TriggerHookController {
  constructor(private readonly triggerHookService: TriggerHookService) {}

  @Get()
  is_up(): { is_up: boolean } {
    return { is_up: true };
  }

  @Post('/user')
  async triggerHookUser(@Body() body: GenericPayloadDto): Promise<Response> {
    const insertUserPayload = plainToClass(InsertUserPayloadDto, body);
    const insertErrors = await validate(insertUserPayload);
    if (insertErrors.length === 0) {
      await this.triggerHookService.createUser(
        insertUserPayload.event.data.new,
      );
      return { entity: 'user', action: 'insert' };
    }

    const updateUserPayload = plainToClass(UpdateUserPayloadDto, body);
    const updateErrors = await validate(updateUserPayload);
    if (updateErrors.length === 0) {
      await this.triggerHookService.updateUser(
        updateUserPayload.event.data.old,
        updateUserPayload.event.data.new,
      );
      return { entity: 'user', action: 'update' };
    }

    const deleteUserPayload = plainToClass(DeleteUserPayloadDto, body);
    const deleteErrors = await validate(deleteUserPayload, {});
    if (deleteErrors.length === 0) {
      await this.triggerHookService.deleteUser(
        deleteUserPayload.event.data.old,
      );
      return { entity: 'user', action: 'delete' };
    }

    throw new HttpException(
      {
        message: 'Invalid payload received',
        insertErrors,
        updateErrors,
        deleteErrors,
      },
      422,
    );
  }

  @Post('/unit_user')
  async triggerHookUnitUser(
    @Body() body: GenericPayloadDto,
  ): Promise<Response> {
    const insertUnitUserPayload = plainToClass(InsertUnitUserPayloadDto, body);
    const insertErrors = await validate(insertUnitUserPayload);
    if (insertErrors.length === 0) {
      await this.triggerHookService.createUnitUser(
        insertUnitUserPayload.event.data.new,
      );
      return { entity: 'unit_user', action: 'insert' };
    }

    const updateUnitUserPayload = plainToClass(UpdateUnitUserPayloadDto, body);
    const updateErrors = await validate(updateUnitUserPayload);
    if (updateErrors.length === 0) {
      await this.triggerHookService.updateUnitUser(
        updateUnitUserPayload.event.data.old,
        updateUnitUserPayload.event.data.new,
      );
      return { entity: 'unit_user', action: 'update' };
    }

    const deleteUnitUserPayload = plainToClass(DeleteUnitUserPayloadDto, body);
    const deleteErrors = await validate(deleteUnitUserPayload, {});
    if (deleteErrors.length === 0) {
      await this.triggerHookService.deleteUnitUser(
        deleteUnitUserPayload.event.data.old,
      );
      return { entity: 'unit_user', action: 'delete' };
    }

    throw new HttpException(
      {
        message: 'Invalid payload received',
        insertErrors,
        updateErrors,
        deleteErrors,
      },
      422,
    );
  }

  @Post('/system_admin')
  async triggerHookSystemAdmin(
    @Body() body: GenericPayloadDto,
  ): Promise<Response> {
    const insertSystemAdminPayload = plainToClass(
      InsertSystemAdminPayloadDto,
      body,
    );
    const insertErrors = await validate(insertSystemAdminPayload);
    if (insertErrors.length === 0) {
      await this.triggerHookService.createSystemAdmin(
        insertSystemAdminPayload.event.data.new,
      );
      return { entity: 'system_admin', action: 'insert' };
    }

    const updateSystemAdminPayload = plainToClass(
      UpdateSystemAdminPayloadDto,
      body,
    );
    const updateErrors = await validate(updateSystemAdminPayload);
    if (updateErrors.length === 0) {
      await this.triggerHookService.updateSystemAdmin(
        updateSystemAdminPayload.event.data.old,
        updateSystemAdminPayload.event.data.new,
      );
      return { entity: 'system_admin', action: 'update' };
    }

    const deleteSystemAdminPayload = plainToClass(
      DeleteSystemAdminPayloadDto,
      body,
    );
    const deleteErrors = await validate(deleteSystemAdminPayload, {});
    if (deleteErrors.length === 0) {
      await this.triggerHookService.deleteSystemAdmin(
        deleteSystemAdminPayload.event.data.old,
      );
      return { entity: 'system_admin', action: 'delete' };
    }

    throw new HttpException(
      {
        message: 'Invalid payload received',
        insertErrors,
        updateErrors,
        deleteErrors,
      },
      422,
    );
  }

  @Post('/global_admin')
  async triggerHookGlobalAdmin(
    @Body() body: GenericPayloadDto,
  ): Promise<Response> {
    const insertGlobalAdminPayload = plainToClass(
      InsertGlobalAdminPayloadDto,
      body,
    );
    const insertErrors = await validate(insertGlobalAdminPayload);
    if (insertErrors.length === 0) {
      await this.triggerHookService.createGlobalAdmin(
        insertGlobalAdminPayload.event.data.new,
      );
      return { entity: 'global_admin', action: 'insert' };
    }

    const updateGlobalAdminPayload = plainToClass(
      UpdateGlobalAdminPayloadDto,
      body,
    );
    const updateErrors = await validate(updateGlobalAdminPayload);
    if (updateErrors.length === 0) {
      await this.triggerHookService.updateGlobalAdmin(
        updateGlobalAdminPayload.event.data.old,
        updateGlobalAdminPayload.event.data.new,
      );
      return { entity: 'global_admin', action: 'update' };
    }

    const deleteGlobalAdminPayload = plainToClass(
      DeleteGlobalAdminPayloadDto,
      body,
    );
    const deleteErrors = await validate(deleteGlobalAdminPayload, {});
    if (deleteErrors.length === 0) {
      await this.triggerHookService.deleteGlobalAdmin(
        deleteGlobalAdminPayload.event.data.old,
      );
      return { entity: 'global_admin', action: 'delete' };
    }

    throw new HttpException(
      {
        message: 'Invalid payload received',
        insertErrors,
        updateErrors,
        deleteErrors,
      },
      422,
    );
  }

  @Post('/unit')
  async triggerHookUnit(@Body() body: GenericPayloadDto): Promise<Response> {
    const insertUnitPayload = plainToClass(InsertUnitPayloadDto, body);
    const insertErrors = await validate(insertUnitPayload);
    if (insertErrors.length === 0) {
      await this.triggerHookService.createUnit(
        insertUnitPayload.event.data.new,
      );
      return { entity: 'unit', action: 'insert' };
    }

    const updateUnitPayload = plainToClass(UpdateUnitPayloadDto, body);
    const updateErrors = await validate(updateUnitPayload);
    if (updateErrors.length === 0) {
      await this.triggerHookService.updateUnit(
        updateUnitPayload.event.data.old,
        updateUnitPayload.event.data.new,
      );
      return { entity: 'unit', action: 'update' };
    }

    const deleteUnitPayload = plainToClass(DeleteUnitPayloadDto, body);
    const deleteErrors = await validate(deleteUnitPayload, {});
    if (deleteErrors.length === 0) {
      await this.triggerHookService.deleteUnit(
        deleteUnitPayload.event.data.old,
      );
      return { entity: 'unit', action: 'delete' };
    }

    throw new HttpException(
      {
        message: 'Invalid payload received',
        insertErrors,
        updateErrors,
        deleteErrors,
      },
      422,
    );
  }

  @Post('/system')
  async triggerHookSystem(@Body() body: GenericPayloadDto): Promise<Response> {
    const insertSystemPayload = plainToClass(InsertSystemPayloadDto, body);
    const insertErrors = await validate(insertSystemPayload);
    if (insertErrors.length === 0) {
      await this.triggerHookService.createSystem(
        insertSystemPayload.event.data.new,
      );
      return { entity: 'system', action: 'insert' };
    }

    const updateSystemPayload = plainToClass(UpdateSystemPayloadDto, body);
    const updateErrors = await validate(updateSystemPayload);
    if (updateErrors.length === 0) {
      await this.triggerHookService.updateSystem(
        updateSystemPayload.event.data.old,
        updateSystemPayload.event.data.new,
      );
      return { entity: 'system', action: 'update' };
    }

    const deleteSystemPayload = plainToClass(DeleteSystemPayloadDto, body);
    const deleteErrors = await validate(deleteSystemPayload, {});
    if (deleteErrors.length === 0) {
      await this.triggerHookService.deleteSystem(
        deleteSystemPayload.event.data.old,
      );
      return { entity: 'system', action: 'delete' };
    }

    throw new HttpException(
      {
        message: 'Invalid payload received',
        insertErrors,
        updateErrors,
        deleteErrors,
      },
      422,
    );
  }

  @Post('/redshift_configuration')
  async triggerHookRedshiftConfiguration(
    @Body() body: GenericPayloadDto,
  ): Promise<Response> {
    const insertRedshiftConfigurationPayload = plainToClass(
      InsertRedshiftConfigurationPayloadDto,
      body,
    );
    const insertErrors = await validate(insertRedshiftConfigurationPayload);
    if (insertErrors.length === 0) {
      await this.triggerHookService.createRedshiftConfiguration(
        insertRedshiftConfigurationPayload.event.data.new,
      );
      return { entity: 'redshift_configuration', action: 'insert' };
    }

    const updateRedshiftConfigurationPayload = plainToClass(
      UpdateRedshiftConfigurationPayloadDto,
      body,
    );
    const updateErrors = await validate(updateRedshiftConfigurationPayload);
    if (updateErrors.length === 0) {
      await this.triggerHookService.updateRedshiftConfiguration(
        updateRedshiftConfigurationPayload.event.data.old,
        updateRedshiftConfigurationPayload.event.data.new,
      );
      return { entity: 'redshift_configuration', action: 'update' };
    }

    const deleteRedshiftConfigurationPayload = plainToClass(
      DeleteRedshiftConfigurationPayloadDto,
      body,
    );
    const deleteErrors = await validate(deleteRedshiftConfigurationPayload, {});
    if (deleteErrors.length === 0) {
      await this.triggerHookService.deleteRedshiftConfiguration(
        deleteRedshiftConfigurationPayload.event.data.old,
      );
      return { entity: 'redshift_configuration', action: 'delete' };
    }

    throw new HttpException(
      {
        message: 'Invalid payload received',
        insertErrors,
        updateErrors,
        deleteErrors,
      },
      422,
    );
  }
}

// CREATE user
// {
//   "event": {
//     "session_variables": {
//       "x-hasura-role": "admin"
//     },
//     "op": "INSERT",
//     "data": {
//       "old": null,
//       "new": {
//         "email": "testuser19@canida.io",
//         "first_name": null,
//         "auth0_id": "auth0|63333ac5d5b3fc316f7470e1",
//         "deactivated": false,
//         "last_name": null,
//         "language": null,
//         "id": "6eb314b3-e298-4291-9f8c-51f9d3e6ae5f"
//       }
//     },
//     "trace_context": {
//       "trace_id": "4a3cb4d3a45f6384",
//       "span_id": "304aa72537c52b04"
//     }
//   },
//   "created_at": "2022-09-27T18:02:45.724379Z",
//   "id": "ec41650b-cab3-4704-826e-1fce67c6a425",
//   "delivery_info": {
//     "max_retries": 0,
//     "current_retry": 0
//   },
//   "trigger": {
//     "name": "user_trigger"
//   },
//   "table": {
//     "schema": "public",
//     "name": "users"
//   }
// }
