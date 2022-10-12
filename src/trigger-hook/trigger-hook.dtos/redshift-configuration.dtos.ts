import { Type } from 'class-transformer';
import {
  IsObject,
  IsString,
  IsUrl,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import {
  GenericDeleteEventDataDto,
  GenericDeleteEventDto,
  GenericInsertEventDataDto,
  GenericInsertEventDto,
  GenericPayloadDto,
  GenericUpdateEventDataDto,
  GenericUpdateEventDto,
} from './generic.dtos';

export class RedshiftConfigurationDto {
  @IsUUID()
  id: string;

  @IsUrl()
  host: string;

  @IsString()
  database: string;

  @IsString()
  user: string;

  @IsUUID()
  system_id: string;
}

class InsertRedshiftConfigurationEventDataDto extends GenericInsertEventDataDto {
  @IsObject()
  @ValidateNested()
  @Type(() => RedshiftConfigurationDto)
  new: RedshiftConfigurationDto;
}

class UpdateRedshiftConfigurationEventDataDto extends GenericUpdateEventDataDto {
  @IsObject()
  @ValidateNested()
  @Type(() => RedshiftConfigurationDto)
  old: RedshiftConfigurationDto;

  @IsObject()
  @ValidateNested()
  @Type(() => RedshiftConfigurationDto)
  new: RedshiftConfigurationDto;
}

class DeleteRedshiftConfigurationEventDataDto extends GenericDeleteEventDataDto {
  @IsObject()
  @ValidateNested()
  @Type(() => RedshiftConfigurationDto)
  old: RedshiftConfigurationDto;
}

export class InsertRedshiftConfigurationEventDto extends GenericInsertEventDto {
  @IsObject()
  @ValidateNested()
  @Type(() => InsertRedshiftConfigurationEventDataDto)
  data: InsertRedshiftConfigurationEventDataDto;
}

export class UpdateRedshiftConfigurationEventDto extends GenericUpdateEventDto {
  @IsObject()
  @ValidateNested()
  @Type(() => UpdateRedshiftConfigurationEventDataDto)
  data: UpdateRedshiftConfigurationEventDataDto;
}

export class DeleteRedshiftConfigurationEventDto extends GenericDeleteEventDto {
  @IsObject()
  @ValidateNested()
  @Type(() => DeleteRedshiftConfigurationEventDataDto)
  data: DeleteRedshiftConfigurationEventDataDto;
}

export class RedshiftConfigurationPayloadDto extends GenericPayloadDto {
  @IsObject()
  @ValidateNested()
  @Type(() => Object, {
    keepDiscriminatorProperty: true,
    discriminator: {
      property: 'op',
      subTypes: [
        { value: InsertRedshiftConfigurationEventDto, name: 'INSERT' },
        { value: UpdateRedshiftConfigurationEventDto, name: 'UPDATE' },
        { value: DeleteRedshiftConfigurationEventDto, name: 'DELETE' },
      ],
    },
  })
  event:
    | InsertRedshiftConfigurationEventDto
    | UpdateRedshiftConfigurationEventDto
    | DeleteRedshiftConfigurationEventDto;
}
