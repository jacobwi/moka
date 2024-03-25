// core/__tests__/UserRepository.spec.ts

import { nanoid } from "nanoid";

import {
  IUserRepository,
  UserLookupType,
} from "../src/repositories/IUserRepository"; // Import the interface

describe("User Management", () => {
  let userRepository: IUserRepository; // Declare the variable

  beforeEach(() => {
    userRepository = {} as IUserRepository; // Stub implementation (red phase)
  });

  it("retrieves all users", async () => {
    // Given a user repository
    // When I call findAllAsync
    // Then it should return a list of users

    await expect(userRepository.findAllAsync()).rejects.toThrow(); // Red phase assertion
  });

  it("fetches a specific user by id", async () => {
    // Given a user repository
    // When I call findAsync with an id
    // Then it should return the corresponding user

    await expect(
      userRepository.findAsync("@43", UserLookupType.Id)
    ).rejects.toThrow(); // Red phase assertion
  });

  it("creates a new user", async () => {
    // Given a user repository
    // When I call createAsync with user data
    // Then it should create the new user

    await expect(
      userRepository.createAsync({
        name: "John Doe",
        email: "johnd1@td.local",
        id: nanoid(),
      })
    ).rejects.toThrow(); // Red phase assertion
  });
});
