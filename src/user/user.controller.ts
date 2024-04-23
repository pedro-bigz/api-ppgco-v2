import {
  BadRequestException,
  Body,
  NotFoundException,
  Param,
  Query,
  UploadedFiles,
} from '@nestjs/common';
import {
  DeleteSuccessResponse,
  SwaggerSafeController,
  SwaggerSafeDelete,
  SwaggerSafeGet,
  SwaggerSafePatch,
  SwaggerSafePost,
  UpdateSuccessResponse,
  ZodValidationPipe,
} from '@app/core';
import { UserService } from './user.service';
import { createUserSchema, UpdateUserDto } from './dto';
import { User } from './entities';
import { Can } from '@app/permissions';
import { RequestUser } from './user.decorator';
import { PaginatedUserDto } from './dto';
import {
  UploadedMediaValidationPipe,
  UseMediaValidatorInterceotor,
} from '@app/media';
import { COLLECTIONS } from './user.constants';

@SwaggerSafeController('user')
export class UserController {
  public constructor(private readonly userService: UserService) {}

  @SwaggerSafePost({ path: 'upload-file', type: User })
  @UseMediaValidatorInterceotor(COLLECTIONS)
  uploadFileAndPassValidation(
    @RequestUser() user: User,
    @UploadedFiles(UploadedMediaValidationPipe(COLLECTIONS))
    files: Record<string, Express.Multer.File[]>,
  ) {
    if (!files) {
      throw new BadRequestException('No files sent');
    }
    return user.saveFiles(files);
  }

  @SwaggerSafePost({ type: User })
  @UseMediaValidatorInterceotor(COLLECTIONS)
  createUser(
    @Body(new ZodValidationPipe(createUserSchema)) createUserDto: any,
    @UploadedFiles(UploadedMediaValidationPipe(COLLECTIONS))
    files: Record<string, Express.Multer.File[]>,
  ) {
    return this.userService.create(createUserDto, files);
  }

  @SwaggerSafeGet({ type: PaginatedUserDto })
  @Can('user.list')
  public findAll(
    @Query('page') page: string,
    @Query('perPage') perPage: string,
    @Query('search') search: string,
    @Query('searchIn') searchIn: string,
    @Query('order') order: Record<string, 'ASC' | 'DESC'>,
  ) {
    return this.userService.find(+page, +perPage, search, searchIn, order);
  }

  @SwaggerSafeGet({ path: ':id', type: User })
  public async findOne(@Param('id') id: string[]) {
    console.log('findOne', { id });
    const user = await this.userService.findOne(+id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const avatar = await user.getAvatarUrl();

    return {
      avatar,
      ...this.userService.omitSensitiveData(user),
    };
  }

  @SwaggerSafePatch({ path: ':id', type: UpdateSuccessResponse })
  public update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const updateds = this.userService.update(+id, updateUserDto);

    return {
      status: 'success',
      message: 'User updated successfully',
      updateds,
    };
  }

  @SwaggerSafeDelete({ path: ':id', type: DeleteSuccessResponse })
  public remove(@Param('id') id: string) {
    const deleteds = this.userService.remove(+id);
    return {
      status: 'success',
      message: 'User deleted successfully',
      deleteds,
    };
  }
}
