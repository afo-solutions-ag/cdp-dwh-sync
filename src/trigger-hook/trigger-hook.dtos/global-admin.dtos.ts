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

export class GlobalAdminDto {
  @IsUUID()
  user_id: string;
}

class InsertGlobalAdminEventDataDto extends GenericInsertEventDataDto {
  @IsObject()
  @ValidateNested()
  @Type(() => GlobalAdminDto)
  new: GlobalAdminDto;
}

class UpdateGlobalAdminEventDataDto extends GenericUpdateEventDataDto {
  @IsObject()
  @ValidateNested()
  @Type(() => GlobalAdminDto)
  old: GlobalAdminDto;

  @IsObject()
  @ValidateNested()
  @Type(() => GlobalAdminDto)
  new: GlobalAdminDto;
}

class DeleteGlobalAdminEventDataDto extends GenericDeleteEventDataDto {
  @IsObject()
  @ValidateNested()
  @Type(() => GlobalAdminDto)
  old: GlobalAdminDto;
}

export class InsertGlobalAdminEventDto extends GenericInsertEventDto {
  @IsObject()
  @ValidateNested()
  @Type(() => InsertGlobalAdminEventDataDto)
  data: InsertGlobalAdminEventDataDto;
}

export class UpdateGlobalAdminEventDto extends GenericUpdateEventDto {
  @IsObject()
  @ValidateNested()
  @Type(() => UpdateGlobalAdminEventDataDto)
  data: UpdateGlobalAdminEventDataDto;
}

export class DeleteGlobalAdminEventDto extends GenericDeleteEventDto {
  @IsObject()
  @ValidateNested()
  @Type(() => DeleteGlobalAdminEventDataDto)
  data: DeleteGlobalAdminEventDataDto;
}

export class GlobalAdminPayloadDto extends GenericPayloadDto {
  @IsObject()
  @ValidateNested()
  @Type(() => Object, {
    keepDiscriminatorProperty: true,
    discriminator: {
      property: 'op',
      subTypes: [
        { value: InsertGlobalAdminEventDto, name: 'INSERT' },
        { value: UpdateGlobalAdminEventDto, name: 'UPDATE' },
        { value: DeleteGlobalAdminEventDto, name: 'DELETE' },
      ],
    },
  })
  event:
    | InsertGlobalAdminEventDto
    | UpdateGlobalAdminEventDto
    | DeleteGlobalAdminEventDto;
}
