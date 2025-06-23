import { beforeEach, describe, expect, it } from 'vitest'
import { UserService } from '../../src/services/UserService'
import { User } from '../../src/user/User'
import { DummyLogger } from '../doubles/dummy/DummyLogger'
import { NotificationServiceSpy } from '../doubles/spy/NotificationServiceSpy'
import { UserRepositoryStub } from '../doubles/stub/UserRepositoryStub'

describe('UserService', () => {
  let notificationService: NotificationServiceSpy

  beforeEach(() => {
    notificationService = new NotificationServiceSpy()
  })

  describe('updateUserEmail', () => {
    it('should update user email successfully', async () => {
      const existingUser = User.create({
        name: 'Alice Johnson',
        email: 'alice.johnson@example.com',
      })
      const userRepository = new UserRepositoryStub(existingUser)
      const logger = DummyLogger

      const userService = new UserService(userRepository, undefined, logger)

      const newEmail = 'alice.new@example.com'
      const updatedUser = await userService.updateUserEmail(
        existingUser.id.toString(),
        newEmail
      )

      expect(updatedUser.email).toBe(newEmail)
      expect(updatedUser.name).toBe(existingUser.name)
      expect(updatedUser.id).toEqual(existingUser.id)
    })

    it('should send notification when email is updated and notification service is provided', async () => {
      const existingUser = User.create({
        name: 'Charlie Brown',
        email: 'charlie.brown@example.com',
      })
      const userRepository = new UserRepositoryStub(existingUser)
      const logger = DummyLogger

      const userService = new UserService(
        userRepository,
        notificationService,
        logger
      )

      const newEmail = 'charlie.new@example.com'
      await userService.updateUserEmail(existingUser.id.toString(), newEmail)

      expect(
        notificationService.wasNotifiedOfUserEmailChange(
          existingUser.id.toString(),
          `Email changed from charlie.brown@example.com to ${newEmail}`
        )
      ).toBe(true)
      expect(notificationService.totalNotificationsSent).toBe(1)
    })

    it('should not send notification when notification service is not provided', async () => {
      const existingUser = User.create({
        name: 'David Lee',
        email: 'david.lee@example.com',
      })
      const userRepository = new UserRepositoryStub(existingUser)
      const logger = DummyLogger

      const userService = new UserService(userRepository, undefined, logger)

      const newEmail = 'david.new@example.com'
      await userService.updateUserEmail(existingUser.id.toString(), newEmail)

      expect(notificationService.totalNotificationsSent).toBe(0)
    })
  })

  describe('getAllUsers', () => {
    it('should retrieve all users from repository', async () => {
      const existingUser = User.create({
        name: 'User One',
        email: 'user1@example.com',
      })
      const userRepository = new UserRepositoryStub(existingUser)
      const logger = DummyLogger

      const userService = new UserService(userRepository, undefined, logger)

      const allUsers = await userService.getAllUsers()

      expect(allUsers.length).toBe(1)
      expect(allUsers[0]).toEqual(existingUser)
    })
  })
})
