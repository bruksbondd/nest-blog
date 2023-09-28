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

@Controller('posts')
export class PostsController {
  @Get()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getAllPosts(@Query() query: any) {
    return 'This action return all post ' + query.status;
  }

  @Get(':id')
  getPostByID(@Param('id') id: string) {
    return `This action returns a post by id ${id}`;
  }

  @Post()
  createPost(@Body() post: any) {
    return `This action create a post ${post}`;
  }

  @Patch(':id')
  updatePost(@Param('id') id: string, @Body() post: any) {
    return `This action update post ${id} ${post}`;
  }

  @Delete(':id')
  deletePost(@Param('id') id: string) {
    return `This action delete post ${id}`;
  }
}
