import { Injectable } from '@nestjs/common';
import { Body, Param, Query } from '@nestjs/common';
import { GetPostsDto } from './dto/get-posts.dto';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostsDto } from './dto/update-post.dto';
import { PostRepository } from './post.repository';

@Injectable()
export class PostsService {
  constructor(private readonly postsRepository: PostRepository) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getAllPosts(@Query() getPostsDto: GetPostsDto) {
    return this.postsRepository.find();
  }

  getPostByID(@Param('id') id: string) {
    return `This action returns a post by id ${id}`;
  }

  createPost(@Body() createPostDto: CreatePostDto) {
    createPostDto.body;
    this.postsRepository.create(createPostDto);
    return `This action create a post`;
  }

  updatePost(@Param('id') id: string, @Body() updatePostsDto: UpdatePostsDto) {
    return `This action update post ${id} ${updatePostsDto}`;
  }

  deletePost(@Param('id') id: string) {
    return `This action delete post ${id}`;
  }
}
