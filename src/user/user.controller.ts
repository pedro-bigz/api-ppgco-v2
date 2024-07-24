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
  Filters,
  OrderDto,
  SwaggerSafeController,
  SwaggerSafeDelete,
  SwaggerSafeGet,
  SwaggerSafePatch,
  SwaggerSafePost,
  UpdateSuccessResponse,
  ZodValidationPipe,
} from 'src/core';
import {
  UploadedMediaValidationPipe,
  UseMediaValidatorInterceotor,
} from 'src/media';
import { Can } from 'src/permissions';
import { randomString } from 'src/utils';
import { UserService } from './user.service';
import { User } from './entities';
import { createUserSchema, UpdateUserDto, PaginatedUserDto } from './dto';
import { RequestUser } from './user.decorator';
import { COLLECTIONS } from './user.constants';
import { Permissions } from './user.enum';

@SwaggerSafeController('users')
export class UserController {
  public constructor(private readonly userService: UserService) {}

  @SwaggerSafePost({ path: 'upload-file', type: User })
  @UseMediaValidatorInterceotor(COLLECTIONS)
  @Can(Permissions.Create)
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
  @Can(Permissions.Create)
  createUser(
    @Body(new ZodValidationPipe(createUserSchema)) createUserDto: any,
    @UploadedFiles(UploadedMediaValidationPipe(COLLECTIONS))
    files?: Record<string, Express.Multer.File[]>,
  ) {
    const password =
      createUserDto.password === 'generate_default'
        ? randomString(8)
        : createUserDto.password;

    const mailData =
      createUserDto.password === 'generate_default'
        ? `Sua senha é <b>${password}</b>. Altere sua senha no primeiro acesso.<br />`
        : undefined;

    const dto = { ...createUserDto, password };

    return this.userService.create(dto, { files, mailData });
  }

  @SwaggerSafeGet({ type: PaginatedUserDto })
  @Can(Permissions.List)
  public findAll(
    @Query('page') page: string,
    @Query('perPage') perPage: string,
    @Query('search') search: string,
    @Query('searchIn') searchIn: string,
    @Query('orderBy') order: OrderDto[],
    @Query('filters') filters: Filters,
  ) {
    console.log({ filters });
    return this.userService.find(
      +page,
      +perPage,
      search,
      searchIn,
      order,
      filters,
    );
  }

  @SwaggerSafeGet({ path: ':id', type: User })
  @Can(Permissions.Read)
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
  @Can(Permissions.Update)
  public update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const updateds = this.userService.update(+id, updateUserDto);

    return {
      status: 'success',
      message: 'User updated successfully',
      updateds,
    };
  }

  @SwaggerSafeDelete({ path: ':id', type: DeleteSuccessResponse })
  @Can(Permissions.Delete)
  public remove(@Param('id') id: string) {
    const deleteds = this.userService.remove(+id);
    return {
      status: 'success',
      message: 'User deleted successfully',
      deleteds,
    };
  }
}
