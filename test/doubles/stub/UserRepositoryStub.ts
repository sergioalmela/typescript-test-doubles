import { User } from '../../../src/user/User'
import { UserId } from '../../../src/user/UserId'
import { UserRepository } from '../../../src/user/UserRepository'

/**
 * *Stub* implementation of `UserRepository` which always returns the
 * pre-configured `user` regardless of the id requested. Methods that are
 * irrelevant to the particular test scenario are implemented as no-ops.
 */
export class UserRepositoryStub implements UserRepository {
  constructor(private readonly user: User) {}

  async save(): Promise<void> {
    /* no-op */
  }

  async delete(): Promise<void> {
    /* no-op */
  }

  async findAll(): Promise<User[]> {
    return [this.user]
  }

  async findById(_id: UserId): Promise<User | null> {
    return this.user
  }
}
