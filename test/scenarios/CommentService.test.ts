import { describe, expect, it } from 'vitest'
import { ArticleId } from '../../src/article/ArticleId'
import { UserId } from '../../src/user/UserId'
import { CommentServiceMock } from '../doubles/mock/CommentServiceMock'

describe('CommentService', () => {
  it('should verify that addComment was called with expected parameters', async () => {
    const commentService = new CommentServiceMock()
    const articleId = ArticleId.create()
    const userId = UserId.create()
    const commentContent = 'This is a comment on the article.'

    // Set up expectations
    commentService.expectAddComment(articleId, userId, commentContent)

    // Perform the action
    await commentService.addComment(articleId, userId, commentContent)

    // Verify expectations were met
    commentService.verify()
    expect(commentService.wasVerified).toBe(true)
  })

  it('should fail when addComment is called with unexpected parameters', async () => {
    const commentService = new CommentServiceMock()
    const articleId = ArticleId.create()
    const userId = UserId.create()
    const expectedContent = 'Expected comment content'
    const actualContent = 'Different comment content'

    // Set up expectations
    commentService.expectAddComment(articleId, userId, expectedContent)

    // Perform the action with different content
    await commentService.addComment(articleId, userId, actualContent)

    // This should throw an error when verify() is called
    expect(() => commentService.verify()).toThrow()
  })

  it('should fail when expected number of calls does not match actual calls', async () => {
    const commentService = new CommentServiceMock()
    const articleId = ArticleId.create()
    const userId = UserId.create()
    const commentContent = 'Test comment'

    // Set up expectation for 2 calls
    commentService.expectAddComment(articleId, userId, commentContent)
    commentService.expectAddComment(articleId, userId, commentContent)

    // But only perform 1 call
    await commentService.addComment(articleId, userId, commentContent)

    // This should throw an error when verify() is called
    expect(() => commentService.verify()).toThrow()
  })
})
