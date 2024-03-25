// core/src/repositories/UserRepository.ts

import { User } from "../models/User";
import { IUserRepository, UserLookupType } from "./IUserRepository";

export class UserRepository implements IUserRepository {
  async findAllAsync(): Promise<User[]> {
    return Promise.resolve([]);
  }
  async findAsync(
    id: string,
    lookupType: UserLookupType
  ): Promise<User | null> {
    return Promise.reject(new Error("User not found"));
  }
  async createAsync(user: User): Promise<User> {
    return Promise.reject(new Error("Failed to create user"));
  }
  async findAll(): Promise<User[]> {
    // TODO: Implement with real data access
    return Promise.resolve([]);
  }
}
