import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user';
import { ActivationsService } from 'src/activations/activations.service';

@Injectable()
export class EmailVerificationService {
  constructor(
    private readonly activationsService: ActivationsService,
    private readonly userService: UserService,
  ) {}

  public async activateAccount(token: string) {
    const account = await this.activationsService.activateAccount(token);
    return await this.userService.setEmailAsVerified(account.email);
  }
}
