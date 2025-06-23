import { ArticleId } from '../../../src/article/ArticleId'
import { CommentService } from '../../../src/services/CommentService'
import { UserId } from '../../../src/user/UserId'

/**
 * A *mock* object pre-programmed with expectations of how it should be called.
 * Unlike a spy, a mock fails the test if it's not used exactly as expected.
 * This enforces strict contracts between collaborating objects.
 */
export class CommentServiceMock implements CommentService {
  private readonly expectedCalls: Array<{
    articleId: ArticleId
    userId: UserId
    content: string
  }> = []

  private readonly actualCalls: Array<{
    articleId: ArticleId
    userId: UserId
    content: string
  }> = []

  private verified = false

  async addComment(
    articleId: ArticleId,
    userId: UserId,
    content: string
  ): Promise<void> {
    this.actualCalls.push({
      articleId,
      userId,
      content,
    })
  }

  // Setup methods - define expectations
  expectAddComment(
    articleId: ArticleId,
    userId: UserId,
    content: string
  ): CommentServiceMock {
    this.expectedCalls.push({
      articleId,
      userId,
      content,
    })
    return this
  }

  // Verification method - call this to verify all expectations were met
  verify(): void {
    this.verified = true

    if (this.actualCalls.length !== this.expectedCalls.length) {
      throw new Error(
        `Expected ${this.expectedCalls.length} calls but received ${this.actualCalls.length}`
      )
    }

    for (let i = 0; i < this.expectedCalls.length; i++) {
      const expected = this.expectedCalls[i]
      const actual = this.actualCalls[i]

      if (
        !expected.articleId.equals(actual.articleId) ||
        !expected.userId.equals(actual.userId) ||
        expected.content !== actual.content
      ) {
        throw new Error(
          `Call ${i + 1} did not match expectation. ` +
            `Expected: ${JSON.stringify(expected)}, ` +
            `Actual: ${JSON.stringify(actual)}`
        )
      }
    }
  }

  get wasVerified(): boolean {
    return this.verified
  }
}
