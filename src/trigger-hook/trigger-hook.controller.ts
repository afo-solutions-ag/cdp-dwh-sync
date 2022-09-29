import { Body, Controller, Get, Post } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { GenericPayloadDto } from './trigger-hook.dtos';
import {
  DeleteUserPayloadDto,
  InsertUserPayloadDto,
  UpdateUserPayloadDto,
} from './trigger-hook.dtos/user.dto';
import { TriggerHookService } from './trigger-hook.service';

@Controller('/trigger-hook')
export class TriggerHookController {
  constructor(private triggerHookService: TriggerHookService) {}

  @Get()
  is_up(): { is_up: boolean } {
    return { is_up: true };
  }

  @Post('/user')
  async triggerHook(
    @Body() body: GenericPayloadDto,
  ): Promise<{ success: boolean }> {
    const insertUserPayload = plainToClass(InsertUserPayloadDto, body);
    const insertErrors = await validate(insertUserPayload);
    if (insertErrors.length === 0) {
      await this.triggerHookService.createUser(
        insertUserPayload.event.data.new,
      );
      return { success: true };
    }

    const updateUserPayload = plainToClass(UpdateUserPayloadDto, body);
    const updateErrors = await validate(updateUserPayload);
    if (updateErrors.length === 0) {
      await this.triggerHookService.updateUser(
        updateUserPayload.event.data.old,
        updateUserPayload.event.data.new,
      );
      return { success: true };
    }

    const deleteUserPayload = plainToClass(DeleteUserPayloadDto, body);
    const deleteErrors = await validate(deleteUserPayload, {});
    if (deleteErrors.length === 0) {
      await this.triggerHookService.deleteUser(
        deleteUserPayload.event.data.old,
      );
      return { success: true };
    }

    throw Error('Invalid payload received');
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
