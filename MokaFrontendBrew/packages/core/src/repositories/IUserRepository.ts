// core/src/repositories/IUserRepository.ts

import { User } from "../models/User";

export enum UserLookupType {
  Id,
  Username,
  Email,
}

export interface IUserRepository {
  findAllAsync(): Promise<User[]>;
  findAsync(id: string, lookupType: UserLookupType): Promise<User | null>;
  createAsync(user: User): Promise<User>;
}
