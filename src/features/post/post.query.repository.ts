import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Post, PostDocument } from './schemas/Post.schema';
import { Model } from 'mongoose';
import { PostQueryModel } from './DTOs/input/PostQueryModel.dto';
import { PaginatorModel } from 'src/base/DTOs/output/Paginator.dto';
import { PostViewModel } from './DTOs/output/PostViewModel.dto';
import { Comment, CommentDocument } from '../comment/schemas/Comment.schema';
import { SortDirection } from 'src/base/DTOs/enam/SortDirection';

@Injectable()
export class PostQueryRepository {
  constructor(
    @InjectModel(Post.name) private PostModel: Model<PostDocument>,
    @InjectModel(Comment.name) private CommentModel: Model<CommentDocument>,
  ) {}

  async getPosts(
    query: PostQueryModel,
  ): Promise<PaginatorModel<PostViewModel>> {
    const totalPostsCount = await this.PostModel.countDocuments();

    const posts = await this.PostModel.find()
      .skip((query.pageNumber - 1) * query.pageSize)
      .limit(query.pageSize)
      .populate('blog')
      //.populate('reactionInfo')
      .sort({
        [query.sortBy]:
          query.sortDirection === '1'
            ? SortDirection.asc
            : SortDirection.desc,
      });

    const postsToView = {
      pagesCount: Math.ceil(totalPostsCount / query.pageSize),
      page: query.pageNumber,
      pageSize: query.pageSize,
      totalCount: totalPostsCount,
      items: posts.map((p) => p.transformToView()),
    };

    return postsToView;
  }

  async getByIdPost(id: string) {
    return await this.PostModel.findById(id).populate('blog');
  }

  async getPostComments(postId: string, query: PostQueryModel) {
    const totalCommentsCount = await this.CommentModel.countDocuments({
      post: postId.toString(),
    });

    const comments = await this.CommentModel.find({
      post: postId.toString(),
    })
      .skip((query.pageNumber - 1) * query.pageSize)
      .limit(query.pageSize)
      .populate('post', '_id')
      .populate('myStatus')
      .sort({
        [query.sortBy]:
          query.sortDirection === '1'
            ? SortDirection.asc
            : SortDirection.desc,
      });

    const commentsToView = {
      pagesCount: Math.ceil(totalCommentsCount / query.pageSize),
      page: query.pageNumber,
      pageSize: query.pageSize,
      totalCount: totalCommentsCount,
      items: comments.map((c) => c.transformToView()),
    };

    return commentsToView;
  }
}
