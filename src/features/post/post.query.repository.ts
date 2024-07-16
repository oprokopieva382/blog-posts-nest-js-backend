import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Post, PostDocument } from './schemas/Post.schema';
import { Model } from 'mongoose';
import { PostQueryModel } from './DTOs/input/PostQueryModel.dto';
import { PaginatorModel } from 'src/base/DTOs/output/Paginator.dto';
import {
  PostViewModel,
  transformToViewPosts,
} from './DTOs/output/PostViewModel.dto';
import { Comment, CommentDocument } from '../comment/schemas/Comment.schema';
import { SortDirection } from 'src/base/DTOs/enam/SortDirection';
import { transformToViewComments } from '../comment/DTOs/output/CommentViewModel';

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

    const sortDirection =
      query.sortDirection === '1' ? SortDirection.asc : SortDirection.desc;

    const sortField = query.sortBy === 'blogName' ? 'blog.name' : query.sortBy;

    const aggregationPipeline = [
      {
        $lookup: {
          from: 'blogs', // collection name in MongoDB
          localField: 'blog',
          foreignField: '_id',
          as: 'blog',
        },
      },
      {
        $unwind: '$blog',
      },
      {
        $sort: {
          [sortField]: sortDirection,
        },
      },
      {
        $skip: (query.pageNumber - 1) * query.pageSize,
      },
      {
        $limit: query.pageSize,
      },
    ] as any;

    const posts = await this.PostModel.aggregate(aggregationPipeline);

    const postsToView = {
      pagesCount: Math.ceil(totalPostsCount / query.pageSize),
      page: query.pageNumber,
      pageSize: query.pageSize,
      totalCount: totalPostsCount,
      items: posts.map((post) => transformToViewPosts(post)),
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
      //update in future with aggregate if sort will be needed
      .skip((query.pageNumber - 1) * query.pageSize)
      .limit(query.pageSize)
      .populate('post', '_id')
      .populate('myStatus')
      .sort({
        [query.sortBy]:
          query.sortDirection === '1' ? SortDirection.asc : SortDirection.desc,
      });

    const commentsToView = {
      pagesCount: Math.ceil(totalCommentsCount / query.pageSize),
      page: query.pageNumber,
      pageSize: query.pageSize,
      totalCount: totalCommentsCount,
      items: comments.map((c) => transformToViewComments(c)),
    };

    return commentsToView;
  }
}
