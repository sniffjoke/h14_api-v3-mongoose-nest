import {Module} from '@nestjs/common';
import {MongooseModule} from "@nestjs/mongoose";
import {CommentsController} from "./api/comments.controller";
import {CommentsService} from "./application/comments.service";
import {CommentsRepository} from "./infrastructure/comments.repository";
import {CommentsQueryRepository} from "./infrastructure/comments.query-repository";
import {PostsService} from "../posts/application/posts.service";
import {Post, PostSchema} from "../posts/domain/posts.entity";
import {PostsRepository} from "../posts/infrastructure/posts.repository";
import {CommentSchema, CommentEntity} from "./domain/comments.entity";
import {BlogsService} from "../blogs/application/blogs.service";
import {Blog, BlogSchema} from "../blogs/domain/blogs.entity";
import {BlogsRepository} from "../blogs/infrastructure/blogs.repository";

@Module({
    imports: [
        MongooseModule.forFeature([{
            name: Blog.name,
            schema: BlogSchema,
        }]),
        MongooseModule.forFeature([{
            name: Post.name,
            schema: PostSchema,
        }]),
        MongooseModule.forFeature([{
            name: CommentEntity.name,
            schema: CommentSchema,
        }]),
    ],
    controllers: [CommentsController],
    providers: [
        CommentsService,
        CommentsRepository,
        CommentsQueryRepository,
        PostsService,
        PostsRepository,
        BlogsService,
        BlogsRepository
    ],
})
export class CommentsModule {}
