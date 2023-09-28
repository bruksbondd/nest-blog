import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { PostStatus } from './post-status.enum';
import { Category } from 'src/categories/category.entity';

@Entity()
export class Post {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  body: string;

  @Column()
  status: PostStatus;

  @ManyToOne(() => Category, (category: Category) => category.posts)
  category: Category;
}
