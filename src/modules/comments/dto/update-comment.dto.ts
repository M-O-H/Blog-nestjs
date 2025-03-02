import { PartialType } from '@nestjs/mapped-types';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { CreateCommentDto } from './create-comment.dto';

export class UpdateCommentDto extends PartialType(CreateCommentDto) {
  @ApiPropertyOptional({
    description: 'The updated content of the comment',
    example: 'This is the updated comment content.',
  })
  content?: string;

  @ApiPropertyOptional({
    description: 'The updated status of the comment',
    example: 'approved',
  })
  status?: string;
}
