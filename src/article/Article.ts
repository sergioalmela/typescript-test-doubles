import { ArticleId } from './ArticleId'

/**
 * Domain entity that represents an Article within the system. Immutable value objects are used
 * for the identifier, but ordinary primitives are kept for other properties to reduce noise.
 */
export class Article {
  private _title: string
  private _content: string
  private _updatedAt: Date

  private constructor(
    private readonly _id: ArticleId,
    private readonly _authorId: string,
    title: string,
    content: string,
    private readonly _createdAt: Date = new Date()
  ) {
    this._title = title
    this._content = content
    this._updatedAt = this._createdAt
  }

  /**
   * Factory that creates a brand-new Article instance with a generated identifier.
   */
  public static create(params: {
    authorId: string
    title: string
    content: string
    id?: ArticleId
  }): Article {
    const id = params.id ?? ArticleId.create()
    return new Article(
      id,
      params.authorId,
      params.title,
      params.content,
      new Date()
    )
  }

  /**
   * Identifier of the article.
   */
  public get id(): ArticleId {
    return this._id
  }

  /**
   * User identifier of the author.
   */
  public get authorId(): string {
    return this._authorId
  }

  public get title(): string {
    return this._title
  }

  public get content(): string {
    return this._content
  }

  public get createdAt(): Date {
    return this._createdAt
  }

  public get updatedAt(): Date {
    return this._updatedAt
  }

  /**
   * Changes the article's title and registers the update date.
   */
  public changeTitle(newTitle: string): void {
    if (!newTitle) {
      throw new Error('Title cannot be empty')
    }
    this._title = newTitle
    this.touch()
  }

  /**
   * Changes the article's content and registers the update date.
   */
  public changeContent(newContent: string): void {
    if (!newContent) {
      throw new Error('Content cannot be empty')
    }
    this._content = newContent
    this.touch()
  }

  private touch(): void {
    this._updatedAt = new Date()
  }
}
