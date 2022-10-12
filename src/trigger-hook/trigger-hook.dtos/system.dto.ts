import { Type } from 'class-transformer';
import { IsObject, IsString, IsUUID, ValidateNested } from 'class-validator';
import {
  GenericDeleteEventDataDto,
  GenericDeleteEventDto,
  GenericInsertEventDataDto,
  GenericInsertEventDto,
  GenericPayloadDto,
  GenericUpdateEventDataDto,
  GenericUpdateEventDto,
} from './generic.dtos';

export class SystemDto {
  @IsUUID()
  id: string;

  @IsString()
  name: string;
}

class InsertSystemEventDataDto extends GenericInsertEventDataDto {
  @IsObject()
  @ValidateNested()
  @Type(() => SystemDto)
  new: SystemDto;
}

class UpdateSystemEventDataDto extends GenericUpdateEventDataDto {
  @IsObject()
  @ValidateNested()
  @Type(() => SystemDto)
  old: SystemDto;

  @IsObject()
  @ValidateNested()
  @Type(() => SystemDto)
  new: SystemDto;
}

class DeleteSystemEventDataDto extends GenericDeleteEventDataDto {
  @IsObject()
  @ValidateNested()
  @Type(() => SystemDto)
  old: SystemDto;
}

export class InsertSystemEventDto extends GenericInsertEventDto {
  @IsObject()
  @ValidateNested()
  @Type(() => InsertSystemEventDataDto)
  data: InsertSystemEventDataDto;
}

export class UpdateSystemEventDto extends GenericUpdateEventDto {
  @IsObject()
  @ValidateNested()
  @Type(() => UpdateSystemEventDataDto)
  data: UpdateSystemEventDataDto;
}

export class DeleteSystemEventDto extends GenericDeleteEventDto {
  @IsObject()
  @ValidateNested()
  @Type(() => DeleteSystemEventDataDto)
  data: DeleteSystemEventDataDto;
}

export class SystemPayloadDto extends GenericPayloadDto {
  @IsObject()
  @ValidateNested()
  @Type(() => Object, {
    keepDiscriminatorProperty: true,
    discriminator: {
      property: 'op',
      subTypes: [
        { value: InsertSystemEventDto, name: 'INSERT' },
        { value: UpdateSystemEventDto, name: 'UPDATE' },
        { value: DeleteSystemEventDto, name: 'DELETE' },
      ],
    },
  })
  event: InsertSystemEventDto | UpdateSystemEventDto | DeleteSystemEventDto;
}
