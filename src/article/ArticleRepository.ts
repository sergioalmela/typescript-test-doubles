import { Article } from './Article'
import { ArticleId } from './ArticleId'

/**
 * Persistence boundary for the Article aggregate.
 *
 * Implementations can connect to any storage engine (SQL, NoSQL, REST, etc.).
 * We keep the interface intentionally minimal for demonstration and to ease test double creation.
 */
export interface ArticleRepository {
  /** Persists a new or updated article. */
  save(article: Article): Promise<void>

  /** Retrieves an article using its identifier, or `null` when not found. */
  findById(id: ArticleId): Promise<Article | null>

  /** Returns every stored article. */
  findAll(): Promise<Article[]>

  /** Removes an article by id. No-op when the id does not exist. */
  delete(id: ArticleId): Promise<void>
}
