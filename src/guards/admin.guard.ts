import { roleGuard } from './role.guard';

export const adminGuard = roleGuard('admin');
