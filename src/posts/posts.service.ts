import { Injectable, NotFoundException } from '@nestjs/common';
import { Body, Param, Query } from '@nestjs/common';
import { GetPostsDto } from './dto/get-posts.dto';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostsDto } from './dto/update-post.dto';
import { PostRepository } from './post.repository';
import { Post } from './post.entity';
import { CategoriesService } from 'src/categories/categories.service';

@Injectable()
export class PostsService {
  constructor(
    private readonly postsRepository: PostRepository,
    private categoriesService: CategoriesService,
  ) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getAllPosts(@Query() getPostsDto: GetPostsDto): Promise<Post[]> {
    return this.postsRepository.getPosts(getPostsDto);
  }

  async getPostById(@Param('id') id: string): Promise<Post[]> {
    const post = await this.postsRepository.find({
      where: {
        id,
      },
      relations: ['category'],
    });

    if (!post.length) {
      throw new NotFoundException('Post not found');
    }

    return post;
  }

  async createPost(@Body() createPostDto: CreatePostDto): Promise<Post> {
    const newPost = this.postsRepository.create(createPostDto);
    const category = await this.categoriesService.getCategoryById(
      createPostDto.categoryId,
    );
    newPost.category = category[0];
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
