import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Blog, BlogDocument } from './schemas/Blog.schema';
import { Model } from 'mongoose';
import {
  BlogPostQueryModel,
  BlogQueryModel,
} from './DTOs/input/BlogQueryModel.dto';
import { PaginatorModel } from 'src/base/DTOs/output/Paginator.dto';
import { BlogViewModel } from './DTOs/output/BlogViewModel.dto';
import { Post, PostDocument } from '../post/schemas/Post.schema';
import { SortDirection } from 'src/base/DTOs/enam/SortDirection';
import { PostViewModel } from '../post/DTOs/output/PostViewModel.dto';

@Injectable()
export class BlogQueryRepository {
  constructor(
    @InjectModel(Blog.name) private BlogModel: Model<BlogDocument>,
    @InjectModel(Post.name) private PostModel: Model<PostDocument>,
  ) {}

  async getBlogs(
    query: BlogQueryModel,
  ): Promise<PaginatorModel<BlogViewModel>> {
    console.log("query in repository", query)
    const search = query.searchNameTerm
      ? { name: { $regex: query.searchNameTerm, $options: 'i' } }
      : {};

    const totalBlogsCount = await this.BlogModel.countDocuments({
      ...search,
    });

    const blogs = await this.BlogModel.find(search)
      .skip((query.pageNumber - 1) * query.pageSize)
      .limit(query.pageSize)
      .sort({
        [query.sortBy]:
          query.sortDirection === '1'
            ? SortDirection.asc
            : SortDirection.desc,
      });
      console.log(blogs);

    const blogsToView = {
      pagesCount: Math.ceil(totalBlogsCount / query.pageSize),
      page: query.pageNumber,
      pageSize: query.pageSize,
      totalCount: totalBlogsCount,
      items: blogs.map((b) => b.transformToView()),
    };

    return blogsToView;
  }

  async getByIdBlog(id: string) {
    return await this.BlogModel.findById(id);
  }

  async getBlogPosts(
    blogId: string,
    query: BlogPostQueryModel,
  ): Promise<PaginatorModel<PostViewModel>> {
    const totalPostsCount = await this.PostModel.countDocuments({
      blog: blogId.toString(),
    });

    const posts = await this.PostModel.find({
      blog: blogId.toString(),
    })
      .skip((query.pageNumber - 1) * query.pageSize)
      .limit(query.pageSize)
      .populate(['blog', 'reactionInfo'])
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
}
