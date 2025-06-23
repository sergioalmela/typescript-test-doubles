/**
 * A *dummy* logger that satisfies the logger interface required by some SUTs
 * yet performs no real logging. It is intentionally empty because the
 * behavior of logging is irrelevant to those tests.
 */
export interface Logger {
  log(message: string): void
  warn?(message: string): void
  error?(message: string): void
}

export const DummyLogger: Logger = {
  log(_msg: string): void {},
  warn(_msg: string): void {},
  error(_msg: string): void {},
}
