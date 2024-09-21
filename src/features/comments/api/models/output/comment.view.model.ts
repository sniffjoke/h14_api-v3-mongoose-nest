import {LikeStatus} from "../../../../posts/api/models/output/post.view.model";

export type CommentatorInfo = {
    userId: string;
    userLogin: string;
}

export type LikesInfo = {
    likesCount: number
    dislikesCount: number
    myStatus: LikeStatus
}

export type CommentViewModel = {
    id: string;
    content: string;
    commentatorInfo: CommentatorInfo
    createdAt: string;
    likesInfo: LikesInfo
}
