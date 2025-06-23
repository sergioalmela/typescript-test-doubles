import { v4 as uuidV4 } from '../utils/uuid'

export class UserId {
  private readonly value: string

  private constructor(value: string) {
    if (!value) {
      throw new Error('UserId cannot be empty')
    }
    this.value = value
  }

  /**
   * Factory that generates a brand-new unique UserId.
   */
  public static create(): UserId {
    return new UserId(uuidV4())
  }

  /**
   * Re-creates a UserId from its string representation (e.g. when loading from a database).
   */
  public static fromString(id: string): UserId {
    return new UserId(id)
  }

  /**
   * Two UserIds are equal when their underlying value matches.
   */
  public equals(other: UserId): boolean {
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
