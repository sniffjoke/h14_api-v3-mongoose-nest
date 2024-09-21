import {Module} from '@nestjs/common';
import {PostsController} from "./api/posts.controller";
import {PostsService} from "./application/posts.service";
import {PostsRepository} from "./infrastructure/posts.repository";
import {PostsQueryRepository} from "./infrastructure/posts.query-repository";
import {MongooseModule} from "@nestjs/mongoose";
import {Post, PostSchema} from "./domain/posts.entity";
import {BlogsService} from "../blogs/application/blogs.service";
import {Blog, BlogSchema} from "../blogs/domain/blogs.entity";
import {BlogsRepository} from "../blogs/infrastructure/blogs.repository";
import {CommentsService} from "../comments/application/comments.service";
import {CommentsQueryRepository} from "../comments/infrastructure/comments.query-repository";
import {CommentEntity, CommentSchema} from "../comments/domain/comments.entity";
import {CommentsRepository} from "../comments/infrastructure/comments.repository";

@Module({
    imports: [
        MongooseModule.forFeature([{
            name: Post.name,
            schema: PostSchema,
        }]),
        MongooseModule.forFeature([{
            name: Blog.name,
            schema: BlogSchema,
        }]),
        MongooseModule.forFeature([{
            name: CommentEntity.name,
            schema: CommentSchema,
        }])
    ],
    controllers: [PostsController],
    providers: [
        PostsService,
        PostsRepository,
        PostsQueryRepository,
        BlogsService,
        BlogsRepository,
        CommentsService,
        CommentsRepository,
        CommentsQueryRepository
    ],
})
export class PostsModule {
}
