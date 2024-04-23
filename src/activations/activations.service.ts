import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Activation } from './entities';
import { ACTIVATIONS_REPOSITORY } from './activations.constants';
import { CreateActivationDto } from './dto';

@Injectable()
export class ActivationsService {
  constructor(
    @Inject(ACTIVATIONS_REPOSITORY)
    private readonly activationsModel: typeof Activation,
  ) {}

  public findByVerificationToken(token: string): Promise<Activation | null> {
    return this.activationsModel.findOne({
      where: { token },
      order: [['created_at', 'DESC']],
    });
  }

  public async activateAccount(token: string): Promise<Activation> {
    const activation = await this.findByVerificationToken(token);

    if (!activation) {
      throw new NotFoundException('Activation not found');
    }

    const { email, ...data } = activation?.dataValues;

    if (data.used) {
      throw new BadRequestException('This token has already been used');
    }

    this.activationsModel.update({ ...data, used: true }, { where: { email } });

    return activation?.dataValues;
  }

  public async createActivation(createActivationDto: CreateActivationDto) {
    return this.activationsModel.create({ ...createActivationDto });
  }
}
