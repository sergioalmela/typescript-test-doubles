import { UserId } from './UserId'

/**
 * Represents an actor that can create articles and comments.
 */
export class User {
  private _email: string

  private constructor(
    private readonly _id: UserId,
    private readonly _name: string,
    email: string,
    private readonly _createdAt: Date = new Date()
  ) {
    this._email = email
  }

  /**
   * Factory helper that generates a new unique identifier internally.
   */
  public static create(params: {
    name: string
    email: string
    id?: UserId
  }): User {
    const id = params.id ?? UserId.create()
    return new User(id, params.name, params.email, new Date())
  }

  public get id(): UserId {
    return this._id
  }

  public get name(): string {
    return this._name
  }

  public get email(): string {
    return this._email
  }

  public get createdAt(): Date {
    return this._createdAt
  }

  /**
   * Updates the user's email if a different one is provided.
   */
  public changeEmail(newEmail: string): void {
    if (!newEmail) {
      throw new Error('Email cannot be empty')
    }

    if (newEmail === this._email) return
    this._email = newEmail
  }
}
