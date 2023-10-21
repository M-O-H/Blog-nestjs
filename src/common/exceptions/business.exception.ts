import { HttpStatus } from '@nestjs/common';
export type ErrorDomain = 'Users' | 'Posts' | 'Ccomments' | 'Generic';

export class BusinessException extends Error {
  public readonly timestamp: Date;
  constructor(
    public readonly domain: ErrorDomain,
    public readonly message: string,
    public readonly apiMessage: string,
    public readonly status: HttpStatus,
  ) {
    super(message);
    this.timestamp = new Date();
  }
}
