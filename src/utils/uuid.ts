/*
 * Lightweight, dependency-free UUID-v4 generator.
 * This is good enough for development and testing purposes. If you require
 * cryptographically-strong ids, consider swapping this implementation with the
 * `uuid` npm package or Node's `crypto.randomUUID`.
 */
export function v4(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (char) => {
    const r = (Math.random() * 16) | 0
    const v = char === 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}
