import { ArticleId } from '../article/ArticleId'

export interface NotificationService {
  notifyArticlePublished(
    authorId: string,
    articleId: ArticleId,
    title: string
  ): Promise<void>
  notifyCommentAdded(
    authorId: string,
    articleId: ArticleId,
    commenterName: string
  ): Promise<void>
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

  async notifyCommentAdded(
    authorId: string,
    articleId: ArticleId,
    commenterName: string
  ): Promise<void> {
    // In real implementation, this would send an email
    console.log(
      `Sending email to ${authorId}: ${commenterName} commented on your article ${articleId}.`
    )
  }
}
