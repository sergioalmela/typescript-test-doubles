import { Article } from '../../../src/article/Article'
import { ArticleId } from '../../../src/article/ArticleId'
import { ArticleRepository } from '../../../src/article/ArticleRepository'

/**
 * A *Fake* implementation of the ArticleRepository. It simulates the real
 * repository using an in-memory array, allowing for testing more complex
 * interaction sequences (e.g., saving an article and then finding it).
 */
export class ArticleRepositoryFake implements ArticleRepository {
  // The fake, in-memory database
  private articles: Map<string, Article> = new Map()

  // A Fake can be pre-seeded with data if needed
  constructor(initialArticles: Article[] = []) {
    initialArticles.forEach((article) =>
      this.articles.set(article.id.toString(), article)
    )
  }

  async save(article: Article): Promise<void> {
    this.articles.set(article.id.toString(), article)
  }

  async delete(articleId: ArticleId): Promise<void> {
    this.articles.delete(articleId.toString())
  }

  async findAll(): Promise<Article[]> {
    return Array.from(this.articles.values())
  }

  async findById(id: ArticleId): Promise<Article | null> {
    return this.articles.get(id.toString()) || null
  }

  getSavedArticleById(id: ArticleId): Article | null {
    return this.articles.get(id.toString()) ?? null
  }

  /** Returns all saved articles */
  getAllSaved(): Article[] {
    return Array.from(this.articles.values())
  }

  /** Returns true if an article with the given id was saved */
  wasSaved(id: ArticleId): boolean {
    return this.articles.has(id.toString())
  }

  /** Clears saved articles (optional for reset between tests) */
  reset(): void {
    this.articles.clear()
  }
}
