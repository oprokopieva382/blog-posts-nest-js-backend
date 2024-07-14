import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Post, PostDocument } from './schemas/Post.schema';
import { Model } from 'mongoose';
import { PostQueryModel } from './DTOs/input/PostQueryModel.dto';
import { PaginatorModel } from 'src/base/DTOs/output/Paginator.dto';
import { PostViewModel } from './DTOs/output/PostViewModel.dto';

@Injectable()
export class PostQueryRepository {
  constructor(@InjectModel(Post.name) private PostModel: Model<PostDocument>) {}

  async getPosts(
    query: PostQueryModel,
  ): Promise<PaginatorModel<PostViewModel>> {
    const totalPostsCount = await this.PostModel.countDocuments();

    const posts = await this.PostModel.find()
    .skip((query.pageNumber - 1) * query.pageSize)
    .limit(query.pageSize)
    .populate('blog')
    //.populate('reactionInfo')
    .sort({ [query.sortBy]: query.sortDirection });

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
}
