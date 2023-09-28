import { IsString, IsOptional, IsEnum } from 'class-validator';
import { PostStatus } from '../post-status.enum';

export class GetPostsDto {
  @IsString()
  @IsOptional()
  readonly title?: string;

  @IsEnum(PostStatus)
  @IsOptional()
  readonly status?: string;
}
