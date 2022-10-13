import { UnitUserDto } from '../trigger-hook/trigger-hook.dtos';
import { unit } from './unit.dtos.mock';
import { user } from './user.dtos.mock';

export const unitUser: UnitUserDto = {
  unit_id: unit.id,
  user_id: user.id,
};
