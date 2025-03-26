import { Injectable, NotFoundException } from '@nestjs/common';
import { SystemApliancesService } from 'src/system-apliances';
import { Cover } from './covers.constants';
import { MediaService } from 'src/media';

@Injectable()
export class CoversService {
  constructor(
    private readonly systemApliancesService: SystemApliancesService,
  ) {}

  public async getLoginCover() {
    return this.systemApliancesService.findAplianceValue(Cover.LOGIN);
  }

  public async getResetPasswordCover() {
    return this.systemApliancesService.findAplianceValue(Cover.RESET_PASSWORD);
  }

  public async getForgotPasswordCover() {
    return this.systemApliancesService.findAplianceValue(Cover.FORGOT_PASSWORD);
  }

  public async setLoginCover(files: Record<string, Express.Multer.File[]>) {
    const apliance = await this.systemApliancesService.findApliance(
      Cover.LOGIN,
    );

    if (!apliance) {
      throw new NotFoundException('Appliance not found');
    }

    const filePath = await apliance
      .saveFiles(files)
      .then(([uploadedFiles]) => uploadedFiles.getUrl());

    return this.systemApliancesService.set(Cover.LOGIN, filePath);
  }

  public async setResetPasswordCover(
    files: Record<string, Express.Multer.File[]>,
  ) {
    const apliance = await this.systemApliancesService.findApliance(
      Cover.RESET_PASSWORD,
    );

    if (!apliance) {
      throw new NotFoundException('Appliance not found');
    }

    const filePath = await apliance
      .saveFiles(files)
      .then(([uploadedFiles]) => uploadedFiles.getUrl());

    return this.systemApliancesService.set(Cover.RESET_PASSWORD, filePath);
  }

  public async setForgotPasswordCover(
    files: Record<string, Express.Multer.File[]>,
  ) {
    const apliance = await this.systemApliancesService.findApliance(
      Cover.FORGOT_PASSWORD,
    );

    if (!apliance) {
      throw new NotFoundException('Appliance not found');
    }

    const filePath = await apliance
      .saveFiles(files)
      .then(([uploadedFiles]) => uploadedFiles.getUrl());

    return this.systemApliancesService.set(Cover.FORGOT_PASSWORD, filePath);
  }
}
