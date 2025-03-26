import { Inject, Injectable } from '@nestjs/common';
import { USERS_PASSWORD_RESET_REPOSITORY } from './users-password-reset.constants';
import { UsersPasswordReset } from './entities';
import {
  CreateUsersPasswordResetDto,
  UpdateUsersPasswordResetDto,
} from './dto';
import { CommonListing, OrderDto, Query } from 'src/core';

@Injectable()
export class UsersPasswordResetService {
  public constructor(
    @Inject(USERS_PASSWORD_RESET_REPOSITORY)
    private readonly model: typeof UsersPasswordReset,
  ) {}

  public findAll() {
    return this.model.findAll();
  }

  public async find(
    page: number,
    perPage: number,
    search: string,
    searchIn: string = 'email',
    order: OrderDto[],
  ) {
    return CommonListing.create<UsersPasswordReset, typeof UsersPasswordReset>(
      this.model,
    )
      ?.attachPagination(page, perPage)
      ?.attachMultipleOrder(order || [['email', 'DESC']])
      ?.attachSearch(search, searchIn)
      ?.modifyQuery((query: Query<UsersPasswordReset>) => {
        return {
          ...query,
        };
      })
      ?.get();
  }

  public async exists(token: string) {
    return this.model.count({ where: { token } }).then((result) => result > 0);
  }

  public findOne(token: string) {
    return this.model.findOne({ where: { token } });
  }

  public findOneByEmail(email: string) {
    return this.model.findOne({ where: { email } });
  }

  public create(createUsersPasswordResetDto: CreateUsersPasswordResetDto) {
    return this.model.create({ ...createUsersPasswordResetDto });
  }

  public remove(email: string) {
    return this.model.destroy({ where: { email } });
  }

  public setAsExpired(data: UsersPasswordReset) {
    data.is_expired = true;
    return data.save();
  }

  public setAsValidated(data: UsersPasswordReset) {
    data.is_validated = true;
    return data.save();
  }
}
