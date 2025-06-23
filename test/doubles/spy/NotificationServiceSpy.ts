import { ArticleId } from '../../../src/article/ArticleId'
import { NotificationService } from '../../../src/services/NotificationService'

/**
 * A *spy* wraps a real object and records how it was used while still
 * delegating to the real implementation. This allows us to verify behavior
 * without changing the actual outcome.
 */
export class NotificationServiceSpy implements NotificationService {
  private readonly calls: Array<{
    method: string
    args: unknown[]
    timestamp: Date
  }> = []

  async notifyArticlePublished(
    authorId: string,
    articleId: ArticleId,
    title: string
  ): Promise<void> {
    this.recordCall('notifyArticlePublished', [authorId, articleId, title])
  }

  async notifyUserEmailChanged(
    userId: string,
    commenterName: string
  ): Promise<void> {
    this.recordCall('notifyUserEmailChanged', [userId, commenterName])
  }

  async notifyUserRegistered(userId: string, email: string): Promise<void> {
    this.recordCall('notifyUserRegistered', [userId, email])
  }

  private recordCall(method: string, args: unknown[]): void {
    this.calls.push({
      method,
      args,
      timestamp: new Date(),
    })
  }

  /**
   * Clears all recorded calls. Useful for resetting the spy between tests.
   */
  clear(): void {
    this.calls.length = 0
  }

  // Behavioral verification methods
  wasNotifiedOfArticlePublication(authorId: string, title: string): boolean {
    return this.calls.some(
      (call) =>
        call.method === 'notifyArticlePublished' &&
        call.args[0] === authorId &&
        call.args[2] === title
    )
  }

  wasNotifiedOfUserEmailChange(userId: string, commenterName: string): boolean {
    return this.calls.some(
      (call) =>
        call.method === 'notifyUserEmailChanged' &&
        call.args[0] === userId &&
        call.args[1] === commenterName
    )
  }

  wasNotifiedOfUserRegistration(userId: string, email: string): boolean {
    return this.calls.some(
      (call) =>
        call.method === 'notifyUserRegistered' &&
        call.args[0] === userId &&
        call.args[1] === email
    )
  }

  get totalNotificationsSent(): number {
    return this.calls.length
  }

  get lastNotificationTime(): Date | null {
    return this.calls.length > 0
      ? this.calls[this.calls.length - 1].timestamp
      : null
  }
}
