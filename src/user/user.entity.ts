import { Entity, Column, PrimaryGeneratedColumn, Index, OneToMany } from 'typeorm';
import { Exclude } from 'class-transformer';
import { Posts } from '../post/post.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstname: string;

  @Column()
  lastname: string;

  @Column()
  @Index({ unique: true })
  email: string;

  @Column()
  @Exclude()
  password: string;

  @Exclude()
  @Column({ default: null })
  currentHashedRefreshToken: string;

  @OneToMany(() => Posts, (post: Posts) => post.user)
  posts: Posts[];
}
