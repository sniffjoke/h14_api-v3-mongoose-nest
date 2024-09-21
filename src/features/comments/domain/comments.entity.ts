import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {LikeStatus} from "../../posts/api/models/output/post.view.model";
import mongoose from "mongoose";

@Schema({timestamps: false, _id: false})
export class CommentatorInfo {
    @Prop({type: String, required: true, default: 'woe2j414129sfs93j'})
    userId: string;

    @Prop({type: String, required: true, default: 'lg-348193'})
    userLogin: string;

}

@Schema({timestamps: false, _id: false})
export class LikesInfo {
    @Prop({type: Number, required: true, default: 0})
    likesCount: number;

    @Prop({type: Number, required: true, default: 0})
    dislikesCount: number;

    @Prop({type: String, enum: LikeStatus, required: true, default: LikeStatus.None})
    myStatus: string;

}


@Schema({timestamps: {updatedAt: false}, versionKey: false})
export class CommentEntity {
    @Prop({type: String, required: true})
    content: string;

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Post'})
    postId: string

    @Prop({type: CommentatorInfo, required: true, default: new CommentatorInfo})
    commentatorInfo: CommentatorInfo;

    @Prop({type: LikesInfo, required: true, default: new LikesInfo})
    likesInfo: LikesInfo;

}

export const CommentSchema = SchemaFactory.createForClass(CommentEntity);
