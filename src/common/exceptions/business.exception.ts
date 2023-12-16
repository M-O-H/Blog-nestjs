import { HttpStatus } from '@nestjs/common';

export type ErrorDomain = 'Users' | 'Posts' | 'Comments' | 'Generic' | 'Upload';

export class BusinessException extends Error {
  public readonly timestamp: Date;
  public readonly message: string;
  public readonly apiMessage: string;
  public readonly status: HttpStatus;
  constructor(
    public readonly domain: ErrorDomain,
    public readonly error: any,
    public readonly data: number = null,
  ) {
    super(domain);
    const metaData = isNaN(data) ? '' : ` ID:${data}`;
    this.timestamp = new Date();
    this.apiMessage = error.response?.message || '';
    this.message = data ? error.message + metaData : error.message || '';
    this.status = error.status;
  }
}
