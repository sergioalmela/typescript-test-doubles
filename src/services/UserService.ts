import { Logger } from '../../test/doubles/dummy/DummyLogger'
import { User } from '../user/User'
import { UserId } from '../user/UserId'
import { UserRepository } from '../user/UserRepository'
import { NotificationService } from './NotificationService'

/**
 * Service responsible for user workflow.
 * Demonstrates how multiple dependencies can be used together.
 */
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly notificationService?: NotificationService,
    private readonly logger?: Logger
  ) {}

  /**
   * Updates a user's email and notifies them of the change.
   */
  async updateUserEmail(userId: string, newEmail: string): Promise<User> {
    const user = await this.userRepository.findById(UserId.fromString(userId))

    if (!user) {
      throw new Error(`User with id ${userId} not found`)
    }

    const oldEmail = user.email
    user.changeEmail(newEmail)

    await this.userRepository.save(user)

    // Notify about email change
    if (this.notificationService) {
      await this.notificationService.notifyUserEmailChanged(
        user.id.toString(),
        `Email changed from ${oldEmail} to ${newEmail}`
      )
    }

    return user
  }

  /**
   * Retrieves all users and logs the count.
   */
  async getAllUsers(): Promise<User[]> {
    const users = await this.userRepository.findAll()

    if (this.logger) {
      this.logger.log(`Retrieved ${users.length} users from repository`)
    }

    return users
  }
}
