import { Body, Controller, Get, HttpException, Post } from '@nestjs/common';
import {
  UserPayloadDto,
  UnitUserPayloadDto,
  SystemAdminPayloadDto,
  UnitPayloadDto,
  SystemPayloadDto,
  RedshiftConfigurationPayloadDto,
  GlobalAdminPayloadDto,
} from './trigger-hook.dtos';
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
  async triggerHookUser(@Body() body: UserPayloadDto): Promise<Response> {
    if (body.event.op === 'INSERT') {
      await this.triggerHookService.createUser(body.event.data.new);
      return { entity: 'user', action: 'insert' };
    }

    if (body.event.op === 'UPDATE') {
      await this.triggerHookService.updateUser(
        body.event.data.old,
        body.event.data.new,
      );
      return { entity: 'user', action: 'update' };
    }

    if (body.event.op === 'DELETE') {
      await this.triggerHookService.deleteUser(body.event.data.old);
      return { entity: 'user', action: 'delete' };
    }

    throw new HttpException('Invalid payload received', 400);
  }

  @Post('/unit_user')
  async triggerHookUnitUser(
    @Body() body: UnitUserPayloadDto,
  ): Promise<Response> {
    if (body.event.op === 'INSERT') {
      await this.triggerHookService.createUnitUser(body.event.data.new);
      return { entity: 'unit_user', action: 'insert' };
    }

    if (body.event.op === 'UPDATE') {
      await this.triggerHookService.updateUnitUser(
        body.event.data.old,
        body.event.data.new,
      );
      return { entity: 'unit_user', action: 'update' };
    }

    if (body.event.op === 'DELETE') {
      await this.triggerHookService.deleteUnitUser(body.event.data.old);
      return { entity: 'unit_user', action: 'delete' };
    }

    throw new HttpException('Invalid payload received', 400);
  }

  @Post('/system_admin')
  async triggerHookSystemAdmin(
    @Body() body: SystemAdminPayloadDto,
  ): Promise<Response> {
    if (body.event.op === 'INSERT') {
      await this.triggerHookService.createSystemAdmin(body.event.data.new);
      return { entity: 'system_admin', action: 'insert' };
    }

    if (body.event.op === 'UPDATE') {
      await this.triggerHookService.updateSystemAdmin(
        body.event.data.old,
        body.event.data.new,
      );
      return { entity: 'system_admin', action: 'update' };
    }

    if (body.event.op === 'DELETE') {
      await this.triggerHookService.deleteSystemAdmin(body.event.data.old);
      return { entity: 'system_admin', action: 'delete' };
    }

    throw new HttpException('Invalid payload received', 400);
  }

  @Post('/global_admin')
  async triggerHookGlobalAdmin(
    @Body() body: GlobalAdminPayloadDto,
  ): Promise<Response> {
    if (body.event.op === 'INSERT') {
      await this.triggerHookService.createGlobalAdmin(body.event.data.new);
      return { entity: 'global_admin', action: 'insert' };
    }

    if (body.event.op === 'UPDATE') {
      await this.triggerHookService.updateGlobalAdmin(
        body.event.data.old,
        body.event.data.new,
      );
      return { entity: 'global_admin', action: 'update' };
    }

    if (body.event.op === 'DELETE') {
      await this.triggerHookService.deleteGlobalAdmin(body.event.data.old);
      return { entity: 'global_admin', action: 'delete' };
    }

    throw new HttpException('Invalid payload received', 400);
  }

  @Post('/unit')
  async triggerHookUnit(@Body() body: UnitPayloadDto): Promise<Response> {
    if (body.event.op === 'INSERT') {
      await this.triggerHookService.createUnit(body.event.data.new);
      return { entity: 'unit', action: 'insert' };
    }

    if (body.event.op === 'UPDATE') {
      await this.triggerHookService.updateUnit(
        body.event.data.old,
        body.event.data.new,
      );
      return { entity: 'unit', action: 'update' };
    }

    if (body.event.op === 'DELETE') {
      await this.triggerHookService.deleteUnit(body.event.data.old);
      return { entity: 'unit', action: 'delete' };
    }

    throw new HttpException('Invalid payload received', 400);

  }

  @Post('/system')
  async triggerHookSystem(@Body() body: SystemPayloadDto): Promise<Response> {
    if (body.event.op === 'INSERT') {
      await this.triggerHookService.createSystem(body.event.data.new);
      return { entity: 'system', action: 'insert' };
    }

    if (body.event.op === 'UPDATE') {
      await this.triggerHookService.updateSystem(
        body.event.data.old,
        body.event.data.new,
      );
      return { entity: 'system', action: 'update' };
    }

    if (body.event.op === 'DELETE') {
      await this.triggerHookService.deleteSystem(body.event.data.old);
      return { entity: 'system', action: 'delete' };
    }

    throw new HttpException('Invalid payload received', 400);

  }

  @Post('/redshift_configuration')
  async triggerHookRedshiftConfiguration(
    @Body() body: RedshiftConfigurationPayloadDto,
  ): Promise<Response> {
    if (body.event.op === 'INSERT') {
      await this.triggerHookService.createRedshiftConfiguration(
        body.event.data.new,
      );
      return { entity: 'redshift_configuration', action: 'insert' };
    }

    if (body.event.op === 'UPDATE') {
      await this.triggerHookService.updateRedshiftConfiguration(
        body.event.data.old,
        body.event.data.new,
      );
      return { entity: 'redshift_configuration', action: 'update' };
    }

    if (body.event.op === 'DELETE') {
      await this.triggerHookService.deleteRedshiftConfiguration(
        body.event.data.old,
      );
      return { entity: 'redshift_configuration', action: 'delete' };
    }

    throw new HttpException('Invalid payload received', 400);

  }
}
