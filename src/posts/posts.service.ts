import { Injectable, NotFoundException } from '@nestjs/common';
import { Body, Param, Query } from '@nestjs/common';
import { GetPostsDto } from './dto/get-posts.dto';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostsDto } from './dto/update-post.dto';
import { PostRepository } from './post.repository';
import { Post } from './post.entity';

@Injectable()
export class PostsService {
  constructor(private readonly postsRepository: PostRepository) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getAllPosts(@Query() getPostsDto: GetPostsDto): Promise<Post[]> {
    return this.postsRepository.getPosts(getPostsDto);
  }

  async getPostById(@Param('id') id: string): Promise<Post[]> {
    const post = await this.postsRepository.findBy({
      id: id,
    });

    if (!post.length) {
      throw new NotFoundException('Post not found');
    }

    return post;
  }

  createPost(@Body() createPostDto: CreatePostDto): Promise<Post> {
    const newPost = this.postsRepository.create(createPostDto);
    return this.postsRepository.save(newPost);
  }

  async updatePost(
    @Param('id') id: string,
    @Body() updatePostsDto: UpdatePostsDto,
  ): Promise<Post> {
    const oldPost = await this.getPostById(id);

    if (!oldPost.length) {
      throw new NotFoundException('Post not found');
    }

    const editedPost = { ...oldPost[0], ...updatePostsDto };

    return await this.postsRepository.save(editedPost);
  }

  async deletePost(@Param('id') id: string): Promise<void> {
    const result = await this.postsRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Post ${id} not exists`);
    }
  }
}
