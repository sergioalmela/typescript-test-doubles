import { ArticleId } from '../article/ArticleId'
import { UserId } from '../user/UserId'

/**
 * Contract that defines how comments are added to articles.
 */
export interface CommentService {
  /**
   * Adds a comment authored by `userId` to the given article.
   */
  addComment(
    articleId: ArticleId,
    userId: UserId,
    content: string
  ): Promise<void>
}

export class DatabaseCommentService implements CommentService {
  async addComment(
    articleId: ArticleId,
    userId: UserId,
    content: string
  ): Promise<void> {
    // In a real implementation, this would save the comment to a database
    console.log(
      `Comment added to article ${articleId} by user ${userId}: "${content}"`
    )
  }
}
