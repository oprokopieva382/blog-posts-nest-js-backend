import { Injectable } from '@nestjs/common';
import { User, UserDocument } from './schemas/User.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserQueryModel } from './DTOs/input/UserQueryModel.dto';
import { PaginatorModel } from 'src/base/DTOs/output/Paginator.dto';
import { UserViewModel } from './DTOs/output/UserViewModel.dto';

@Injectable()
export class UserQueryRepository {
  constructor(@InjectModel(User.name) private UserModel: Model<UserDocument>) {}

  async getUsers(
    query: UserQueryModel,
  ): Promise<PaginatorModel<UserViewModel>> {
    const searchByLogin = query.searchLoginTerm
      ? { login: { $regex: query.searchLoginTerm, $options: 'i' } }
      : {};

    const searchByEmail = query.searchEmailTerm
      ? { email: { $regex: query.searchEmailTerm, $options: 'i' } }
      : {};

    const totalUsersCount = await this.UserModel.countDocuments({
      $or: [{ ...searchByLogin }, { ...searchByEmail }],
    });

    const users = await this.UserModel.find({
      $or: [{ ...searchByLogin }, { ...searchByEmail }],
    })
      .skip((query.pageNumber - 1) * query.pageSize)
      .limit(query.pageSize)
      .sort({ [query.sortBy]: query.sortDirection })
      .exec();

    const usersToView = {
      pagesCount: Math.ceil(totalUsersCount / query.pageSize),
      page: query.pageNumber,
      pageSize: query.pageSize,
      totalCount: totalUsersCount,
      items: users.map((u) => u.transformToView()),
    };
    return usersToView;
  }
}
