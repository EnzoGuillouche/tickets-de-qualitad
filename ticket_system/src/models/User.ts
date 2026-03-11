export type UserRole = 'user' | 'admin' | 'supervisor';

export interface User {
  username: string;
  role: UserRole;
}
