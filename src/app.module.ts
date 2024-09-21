import {Module, NotFoundException} from '@nestjs/common';
import {ConfigModule} from "@nestjs/config";
import {MongooseModule} from "@nestjs/mongoose";
import {BlogsModule} from "./features/blogs/blogs.module";
import {PostsModule} from "./features/posts/posts.module";
import {UsersModule} from "./features/users/users.module";
import {CommentsModule} from "./features/comments/comments.module";
import {TestingModule} from "./features/testing/testing.module";
import {APP_FILTER} from "@nestjs/core";
import {NotFoundExceptionFilter} from "./infrastructure/common/exception-filters/not-found-exception-filter";

@Module({
  imports: [
      ConfigModule.forRoot({
          envFilePath: '.development.env',
      }),
      MongooseModule.forRoot(process.env.MONGO_URI as string),
      BlogsModule,
      PostsModule,
      UsersModule,
      CommentsModule,
      TestingModule
  ],
  controllers: [],
  providers: [
      // {
      //     provide: APP_FILTER,
      //     useClass: NotFoundExceptionFilter
      // }
  ],
})
export class AppModule {}
