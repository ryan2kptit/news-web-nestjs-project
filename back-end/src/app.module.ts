import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthenticationModule } from './authentication/authentication.module';
import { CommentModule } from './comment/comment.module';
import { Posts } from './post/post.entity';
import { PostModule } from './post/post.module';
import { User } from './user/user.entity';
import { UserModule } from './user/user.module';
import { Comment } from './comment/comment.entity';
import { TagModule } from './tag/tag.module';
import { Tag } from './tag/tag.entity';
import { RoleModule } from './role/role.module';
import { PermissionModule } from './permission/permission.module';
import { Permission } from './permission/permission.entity';
import { Role } from './role/role.entity';
import { ImageModule } from './image/image.module';
import { Image } from './image/image.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      entities: [User, Posts, Comment, Tag, Role, Permission, Image],
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USERNAME || '',
      password: process.env.DATABASE_PASSWORD || '',
      database: process.env.DATABASE_NAME,
      synchronize: true,
    }),
    UserModule,
    AuthenticationModule,
    PostModule,
    CommentModule,
    TagModule,
    RoleModule,
    PermissionModule,
    ImageModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {} 