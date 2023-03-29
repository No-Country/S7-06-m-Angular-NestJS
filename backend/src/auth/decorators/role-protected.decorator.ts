import { SetMetadata } from '@nestjs/common';
import { Roles } from '../interfaces/roles';

export const META_ROLES = 'roles';

export const RoleProtected = (...roles: Roles[]) => {
  return SetMetadata(META_ROLES, roles);
};
