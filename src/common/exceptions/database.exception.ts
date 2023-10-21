export class DatabaseException extends Error {
  private readonly timestamp: Date;
  constructor(
    public readonly error: Error,
    public readonly message: string,
  ) {
    super(message);
    this.timestamp = new Date();
  }
}
