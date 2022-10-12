import { Type } from 'class-transformer';
import { IsObject, IsUUID, ValidateNested } from 'class-validator';
import {
  GenericDeleteEventDataDto,
  GenericDeleteEventDto,
  GenericInsertEventDataDto,
  GenericInsertEventDto,
  GenericPayloadDto,
  GenericUpdateEventDataDto,
  GenericUpdateEventDto,
} from './generic.dtos';

export class SystemAdminDto {
  @IsUUID()
  user_id: string;

  @IsUUID()
  system_id: string;
}

class InsertSystemAdminEventDataDto extends GenericInsertEventDataDto {
  @IsObject()
  @ValidateNested()
  @Type(() => SystemAdminDto)
  new: SystemAdminDto;
}

class UpdateSystemAdminEventDataDto extends GenericUpdateEventDataDto {
  @IsObject()
  @ValidateNested()
  @Type(() => SystemAdminDto)
  old: SystemAdminDto;

  @IsObject()
  @ValidateNested()
  @Type(() => SystemAdminDto)
  new: SystemAdminDto;
}

class DeleteSystemAdminEventDataDto extends GenericDeleteEventDataDto {
  @IsObject()
  @ValidateNested()
  @Type(() => SystemAdminDto)
  old: SystemAdminDto;
}

export class InsertSystemAdminEventDto extends GenericInsertEventDto {
  @IsObject()
  @ValidateNested()
  @Type(() => InsertSystemAdminEventDataDto)
  data: InsertSystemAdminEventDataDto;
}

export class UpdateSystemAdminEventDto extends GenericUpdateEventDto {
  @IsObject()
  @ValidateNested()
  @Type(() => UpdateSystemAdminEventDataDto)
  data: UpdateSystemAdminEventDataDto;
}

export class DeleteSystemAdminEventDto extends GenericDeleteEventDto {
  @IsObject()
  @ValidateNested()
  @Type(() => DeleteSystemAdminEventDataDto)
  data: DeleteSystemAdminEventDataDto;
}

export class SystemAdminPayloadDto extends GenericPayloadDto {
  @IsObject()
  @ValidateNested()
  @Type(() => Object, {
    keepDiscriminatorProperty: true,
    discriminator: {
      property: 'op',
      subTypes: [
        { value: InsertSystemAdminEventDto, name: 'INSERT' },
        { value: UpdateSystemAdminEventDto, name: 'UPDATE' },
        { value: DeleteSystemAdminEventDto, name: 'DELETE' },
      ],
    },
  })
  event:
    | InsertSystemAdminEventDto
    | UpdateSystemAdminEventDto
    | DeleteSystemAdminEventDto;
}
