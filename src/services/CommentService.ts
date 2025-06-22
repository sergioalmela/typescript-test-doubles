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
