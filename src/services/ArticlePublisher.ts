import { Logger } from '../../test/doubles/dummy/DummyLogger'
import { Article } from '../article/Article'
import { ArticleRepository } from '../article/ArticleRepository'
import { NotificationService } from './NotificationService'

/**
 * Service responsible for publishing new articles.
 *
 * Because creating an article involves more than just instantiating the entity
 * (we also have to persist it and maybe perform additional side-effects such
 * as emitting events or sending notifications), this logic is extracted into
 * its own service.
 */
export class ArticlePublisher {
  constructor(
    private readonly repository: ArticleRepository,
    private readonly logger?: Logger,
    private readonly notificationService?: NotificationService
  ) {}

  /**
   * Publishes a brand-new article and persists it through the configured repository.
   * Optionally sends a notification to the author.
   */
  async publish(params: {
    authorId: string
    title: string
    content: string
  }): Promise<Article> {
    const article = Article.create({
      authorId: params.authorId,
      title: params.title,
      content: params.content,
    })

    await this.repository.save(article)

    // Send notification if service is provided
    if (this.notificationService) {
      await this.notificationService.notifyArticlePublished(
        article.authorId,
        article.id,
        article.title
      )
    }

    if (this.logger) {
      this.logger.log(
        `Article published: ${article.id} by ${article.authorId} - ${article.title}`
      )
    }

    return article
  }
}
