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

@Controller('posts')
export class PostsController {
  @Get()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getAllPosts(@Query() getPostsDto: GetPostsDto) {
    return 'This action return all post ';
  }

  @Get(':id')
  getPostByID(@Param('id') id: string) {
    return `This action returns a post by id ${id}`;
  }

  @Post()
  createPost(@Body() createPostDto: CreatePostDto) {
    createPostDto.body;
    return `This action create a post`;
  }

  @Patch(':id')
  updatePost(@Param('id') id: string, @Body() updatePostsDto: UpdatePostsDto) {
    return `This action update post ${id} ${updatePostsDto}`;
  }

  @Delete(':id')
  deletePost(@Param('id') id: string) {
    return `This action delete post ${id}`;
  }
}
