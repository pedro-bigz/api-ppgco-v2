import { Controller, Get, Post, UploadedFiles } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import {
  UploadedMediaValidationPipe,
  UseMediaValidatorInterceptor,
} from 'src/media';
import { Public } from 'src/core';
import { CoversService } from './covers.service';
import { COLLECTIONS } from './covers.constants';

@Controller('covers')
export class CoversController {
  constructor(private readonly coversService: CoversService) {}

  @Public()
  @Get('/login')
  @ApiOkResponse({
    description: `This endpoint is used to get login cover image`,
    type: String,
  })
  public getLoginCover() {
    return this.coversService.getLoginCover();
  }

  @Public()
  @Get('/reset-password')
  @ApiOkResponse({
    description: `This endpoint is used to get reset password cover image`,
    type: String,
  })
  public getResetPasswordCover() {
    return this.coversService.getResetPasswordCover();
  }

  @Public()
  @Get('/forgot-password')
  @ApiOkResponse({
    description: `This endpoint is used to get forgot password cover image`,
    type: String,
  })
  public getForgotPasswordCover() {
    return this.coversService.getForgotPasswordCover();
  }

  @Public()
  @Post('/login')
  @ApiOkResponse({
    description: `This endpoint is used to get login cover image`,
    type: String,
  })
  @UseMediaValidatorInterceptor(COLLECTIONS)
  public postLoginCover(
    @UploadedFiles(UploadedMediaValidationPipe(COLLECTIONS))
    files: Record<string, Express.Multer.File[]>,
  ) {
    console.log({ files });
    return this.coversService.setLoginCover(files);
  }

  @Public()
  @Post('/reset-password')
  @ApiOkResponse({
    description: `This endpoint is used to get reset password cover image`,
    type: String,
  })
  @UseMediaValidatorInterceptor(COLLECTIONS)
  public postResetPasswordCover(
    @UploadedFiles(UploadedMediaValidationPipe(COLLECTIONS))
    files: Record<string, Express.Multer.File[]>,
  ) {
    return this.coversService.setResetPasswordCover(files);
  }

  @Public()
  @Post('/forgot-password')
  @ApiOkResponse({
    description: `This endpoint is used to get forgot password cover image`,
    type: String,
  })
  @UseMediaValidatorInterceptor(COLLECTIONS)
  public postForgotPasswordCover(
    @UploadedFiles(UploadedMediaValidationPipe(COLLECTIONS))
    files: Record<string, Express.Multer.File[]>,
  ) {
    return this.coversService.setForgotPasswordCover(files);
  }
}
