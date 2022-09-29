import { Body, Controller, Get, HttpException, Post } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import {
  DeleteDWHConnectionPayloadDto,
  DeleteSystemPayloadDto,
  DeleteUnitPayloadDto,
  GenericPayloadDto,
  InsertDWHConnectionPayloadDto,
  InsertSystemPayloadDto,
  InsertUnitPayloadDto,
  UpdateDWHConnectionPayloadDto,
  UpdateSystemPayloadDto,
  UpdateUnitPayloadDto,
} from './trigger-hook.dtos';
import {
  DeleteUserPayloadDto,
  InsertUserPayloadDto,
  UpdateUserPayloadDto,
} from './trigger-hook.dtos';
import { TriggerHookService } from './trigger-hook.service';

type Response = {
  entity: string;
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

  @Post('/dwh-connection')
  async triggerHookDwhConnection(
    @Body() body: GenericPayloadDto,
  ): Promise<Response> {
    const insertDWHConnectionPayload = plainToClass(
      InsertDWHConnectionPayloadDto,
      body,
    );
    const insertErrors = await validate(insertDWHConnectionPayload);
    if (insertErrors.length === 0) {
      await this.triggerHookService.createDWHConnection(
        insertDWHConnectionPayload.event.data.new,
      );
      return { entity: 'dwh-connection', action: 'insert' };
    }

    const updateDWHConnectionPayload = plainToClass(
      UpdateDWHConnectionPayloadDto,
      body,
    );
    const updateErrors = await validate(updateDWHConnectionPayload);
    if (updateErrors.length === 0) {
      await this.triggerHookService.updateDWHConnection(
        updateDWHConnectionPayload.event.data.old,
        updateDWHConnectionPayload.event.data.new,
      );
      return { entity: 'dwh-connection', action: 'update' };
    }

    const deleteDWHConnectionPayload = plainToClass(
      DeleteDWHConnectionPayloadDto,
      body,
    );
    const deleteErrors = await validate(deleteDWHConnectionPayload, {});
    if (deleteErrors.length === 0) {
      await this.triggerHookService.deleteDWHConnection(
        deleteDWHConnectionPayload.event.data.old,
      );
      return { entity: 'dwh-connection', action: 'delete' };
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
