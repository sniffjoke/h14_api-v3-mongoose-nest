export enum LikeStatus {
    None = 'None',
    Like = 'Like',
    Dislike = 'Dislike'
}

type LikeDetails = {
    addedAt: string
    userId: string
    login: string
}

type ExtendedLikesInfo = {
    likesCount: number;
    dislikesCount: number;
    myStatus: LikeStatus;
    newestLikes: LikeDetails[];
}

export type PostViewModel = {
    id: string;
    title: string;
    shortDescription: string;
    content: string;
    blogId: string;
    blogName: string;
    createdAt: string;
    extendedLikesInfo: ExtendedLikesInfo
}
