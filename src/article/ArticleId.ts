import { v4 as uuidV4 } from '../utils/uuid'

export class ArticleId {
  private readonly value: string

  private constructor(value: string) {
    if (!value) {
      throw new Error('ArticleId cannot be empty')
    }
    this.value = value
  }

  /**
   * Factory that generates a brand-new unique ArticleId.
   */
  public static create(): ArticleId {
    return new ArticleId(uuidV4())
  }

  /**
   * Re-creates an ArticleId from its string representation (e.g. when loading from a database).
   */
  public static fromString(id: string): ArticleId {
    return new ArticleId(id)
  }

  /**
   * Two ArticleIds are equal when their underlying value matches.
   */
  public equals(other: ArticleId): boolean {
    if (!other) return false
    return this.value === other.value
  }

  /**
   * Returns the plain string representation.
   */
  public toString(): string {
    return this.value
  }
}
