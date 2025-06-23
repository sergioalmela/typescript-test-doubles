import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { ArticlePublisher } from '../../src/services/ArticlePublisher'
import { DummyLogger } from '../doubles/dummy/DummyLogger'
import { ArticleRepositoryFake } from '../doubles/fake/ArticleRepositoryFake'
import { NotificationServiceSpy } from '../doubles/spy/NotificationServiceSpy'

describe('ArticlePublisher', () => {
  let articleRepository: ArticleRepositoryFake

  beforeEach(() => {
    articleRepository = new ArticleRepositoryFake()
  })

  afterEach(() => {
    articleRepository.reset()
  })

  it('should publish a new article when article is given', async () => {
    const articleRepository = new ArticleRepositoryFake()
    const logger = DummyLogger

    const articlePublisher = new ArticlePublisher(articleRepository, logger)

    const article = await articlePublisher.publish({
      authorId: 'author-123',
      title: 'My First Article',
      content: 'This is the content of my first article.',
    })

    expect(articleRepository.wasSaved(article.id))
    const savedArticles = articleRepository.getAllSaved()
    expect(savedArticles.length).toBe(1)

    const savedArticle = articleRepository.getSavedArticleById(article.id)
    expect(savedArticle).toEqual(article)
  })

  it('should send notification when notification service is provided', async () => {
    const articleRepository = new ArticleRepositoryFake()
    const logger = DummyLogger
    const notificationService = new NotificationServiceSpy()

    const articlePublisher = new ArticlePublisher(
      articleRepository,
      logger,
      notificationService
    )

    const authorId = 'author-456'
    const title = 'Article with Notification'
    const content = 'This article should trigger a notification.'

    await articlePublisher.publish({
      authorId,
      title,
      content,
    })

    expect(
      notificationService.wasNotifiedOfArticlePublication(authorId, title)
    ).toBe(true)
    expect(notificationService.totalNotificationsSent).toBe(1)
  })

  it('should not send notification when notification service is not provided', async () => {
    const articleRepository = new ArticleRepositoryFake()
    const logger = DummyLogger
    const notificationService = new NotificationServiceSpy()

    const articlePublisher = new ArticlePublisher(articleRepository, logger)

    const authorId = 'author-789'
    const title = 'Article without Notification'
    const content = 'This article should not trigger a notification.'

    const article = await articlePublisher.publish({
      authorId,
      title,
      content,
    })

    const savedArticle = articleRepository.getSavedArticleById(article.id)
    expect(savedArticle).toEqual(article)

    expect(
      notificationService.wasNotifiedOfArticlePublication(authorId, title)
    ).toBe(false)
    expect(notificationService.totalNotificationsSent).toBe(0)
  })
})
