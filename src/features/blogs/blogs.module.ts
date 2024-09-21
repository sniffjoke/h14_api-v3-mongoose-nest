import {Module} from '@nestjs/common';
import {MongooseModule} from "@nestjs/mongoose";
import {Blog, BlogSchema} from "./domain/blogs.entity";
import {BlogsController} from "./api/blogs.controller";
import {BlogsService} from "./application/blogs.service";
import {BlogsRepository} from "./infrastructure/blogs.repository";
import {BlogsQueryRepository} from "./infrastructure/blogs.query-repository";
import {PostsService} from "../posts/application/posts.service";
import {Post, PostSchema} from "../posts/domain/posts.entity";
import {PostsRepository} from "../posts/infrastructure/posts.repository";
import {PostsQueryRepository} from "../posts/infrastructure/posts.query-repository";

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
    ],
    controllers: [BlogsController],
    providers: [
        BlogsService,
        BlogsRepository,
        BlogsQueryRepository,
        PostsService,
        PostsRepository,
        PostsQueryRepository
    ],
})
export class BlogsModule {
}
