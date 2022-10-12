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

export class UnitDto {
  @IsUUID()
  id: string;

  @IsString()
  name: string;

  @IsUUID()
  system_id: string;
}

class InsertUnitEventDataDto extends GenericInsertEventDataDto {
  @IsObject()
  @ValidateNested()
  @Type(() => UnitDto)
  new: UnitDto;
}

class UpdateUnitEventDataDto extends GenericUpdateEventDataDto {
  @IsObject()
  @ValidateNested()
  @Type(() => UnitDto)
  old: UnitDto;

  @IsObject()
  @ValidateNested()
  @Type(() => UnitDto)
  new: UnitDto;
}

class DeleteUnitEventDataDto extends GenericDeleteEventDataDto {
  @IsObject()
  @ValidateNested()
  @Type(() => UnitDto)
  old: UnitDto;
}

export class InsertUnitEventDto extends GenericInsertEventDto {
  @IsObject()
  @ValidateNested()
  @Type(() => InsertUnitEventDataDto)
  data: InsertUnitEventDataDto;
}

export class UpdateUnitEventDto extends GenericUpdateEventDto {
  @IsObject()
  @ValidateNested()
  @Type(() => UpdateUnitEventDataDto)
  data: UpdateUnitEventDataDto;
}

export class DeleteUnitEventDto extends GenericDeleteEventDto {
  @IsObject()
  @ValidateNested()
  @Type(() => DeleteUnitEventDataDto)
  data: DeleteUnitEventDataDto;
}

export class UnitPayloadDto extends GenericPayloadDto {
  @IsObject()
  @ValidateNested()
  @Type(() => Object, {
    keepDiscriminatorProperty: true,
    discriminator: {
      property: 'op',
      subTypes: [
        { value: InsertUnitEventDto, name: 'INSERT' },
        { value: UpdateUnitEventDto, name: 'UPDATE' },
        { value: DeleteUnitEventDto, name: 'DELETE' },
      ],
    },
  })
  event: InsertUnitEventDto | UpdateUnitEventDto | DeleteUnitEventDto;
}
