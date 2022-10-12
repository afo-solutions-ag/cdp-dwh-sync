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

export class UnitUserDto {
  @IsUUID()
  unit_id: string;

  @IsUUID()
  user_id: string;
}

class InsertUnitUserEventDataDto extends GenericInsertEventDataDto {
  @IsObject()
  @ValidateNested()
  @Type(() => UnitUserDto)
  new: UnitUserDto;
}

class UpdateUnitUserEventDataDto extends GenericUpdateEventDataDto {
  @IsObject()
  @ValidateNested()
  @Type(() => UnitUserDto)
  old: UnitUserDto;

  @IsObject()
  @ValidateNested()
  @Type(() => UnitUserDto)
  new: UnitUserDto;
}

class DeleteUnitUserEventDataDto extends GenericDeleteEventDataDto {
  @IsObject()
  @ValidateNested()
  @Type(() => UnitUserDto)
  old: UnitUserDto;
}

export class InsertUnitUserEventDto extends GenericInsertEventDto {
  @IsObject()
  @ValidateNested()
  @Type(() => InsertUnitUserEventDataDto)
  data: InsertUnitUserEventDataDto;
}

export class UpdateUnitUserEventDto extends GenericUpdateEventDto {
  @IsObject()
  @ValidateNested()
  @Type(() => UpdateUnitUserEventDataDto)
  data: UpdateUnitUserEventDataDto;
}

export class DeleteUnitUserEventDto extends GenericDeleteEventDto {
  @IsObject()
  @ValidateNested()
  @Type(() => DeleteUnitUserEventDataDto)
  data: DeleteUnitUserEventDataDto;
}

export class UnitUserPayloadDto extends GenericPayloadDto {
  @IsObject()
  @ValidateNested()
  @Type(() => Object, {
    keepDiscriminatorProperty: true,
    discriminator: {
      property: 'op',
      subTypes: [
        { value: InsertUnitUserEventDto, name: 'INSERT' },
        { value: UpdateUnitUserEventDto, name: 'UPDATE' },
        { value: DeleteUnitUserEventDto, name: 'DELETE' },
      ],
    },
  })
  event:
    | InsertUnitUserEventDto
    | UpdateUnitUserEventDto
    | DeleteUnitUserEventDto;
}
