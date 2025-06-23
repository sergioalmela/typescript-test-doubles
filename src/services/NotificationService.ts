import { ArticleId } from '../article/ArticleId'

export interface NotificationService {
  notifyArticlePublished(
    authorId: string,
    articleId: ArticleId,
    title: string
  ): Promise<void>
  notifyUserEmailChanged(userId: string, commenterName: string): Promise<void>
  notifyUserRegistered(userId: string, email: string): Promise<void>
}

/**
 * Real implementation that would send actual notifications.
 * In production, this might send emails, push notifications, etc.
 */
export class EmailNotificationService implements NotificationService {
  async notifyArticlePublished(
    authorId: string,
    articleId: ArticleId,
    title: string
  ): Promise<void> {
    // In real implementation, this would send an email
    console.log(
      `Sending email to ${authorId}: Your article "${articleId}" with title: "${title}" has been published!`
    )
  }

  async notifyUserEmailChanged(
    userId: string,
    commenterName: string
  ): Promise<void> {
    // In real implementation, this would send an email
    console.log(
      `Sending email to ${userId}: Your email has been changed by ${commenterName}.`
    )
  }
  async notifyUserRegistered(userId: string, email: string): Promise<void> {
    // In real implementation, this would send a welcome email
    console.log(`Sending welcome email to ${userId} at ${email}.`)
  }
}
