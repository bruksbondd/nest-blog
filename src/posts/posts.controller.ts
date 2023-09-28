import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { GetPostsDto } from './dto/get-posts.dto';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostsDto } from './dto/update-post.dto';
import { PostsService } from './posts.service';
import { Post as PostEntity } from './post.entity';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getAllPosts(@Query() getPostsDto: GetPostsDto): Promise<PostEntity[]> {
    return this.postsService.getAllPosts(getPostsDto);
  }

  @Get(':id')
  getPostByID(@Param('id') id: string): Promise<PostEntity[]> {
    return this.postsService.getPostById(id);
  }

  @Post()
  createPost(@Body() createPostDto: CreatePostDto): Promise<PostEntity> {
    return this.postsService.createPost(createPostDto);
  }

  @Patch(':id')
  updatePost(
    @Param('id') id: string,
    @Body() updatePostsDto: UpdatePostsDto,
  ): Promise<PostEntity> {
    return this.postsService.updatePost(id, updatePostsDto);
  }

  @Delete(':id')
  deletePost(@Param('id') id: string): Promise<void> {
    return this.postsService.deletePost(id);
  }
}
