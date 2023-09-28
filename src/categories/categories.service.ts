import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  createCategory(createCategoryDto: CreateCategoryDto): Promise<Category> {
    const category = new Category();
    category.title = createCategoryDto.title;
    return this.categoryRepository.save(category);
  }

  async getCategoryById(id: string): Promise<Category[]> {
    const category = await this.categoryRepository.find({
      where: {
        id,
      },
      relations: ['posts'],
    });

    if (!category.length) {
      throw new NotFoundException('Category not found');
    }

    return category;
  }
}
