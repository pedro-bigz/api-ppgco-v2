import {
  ArgumentMetadata,
  Inject,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { Model } from 'sequelize-typescript';

type Constructor<T> = new (...args: any[]) => T;
type ModelType<T extends Model<T>> = Constructor<T> & typeof Model;

export const ParamPipeFactory = <T extends Model>(repository: string) => {
  @Injectable()
  class ParamPipe implements PipeTransform {
    constructor(@Inject(repository) public readonly model: ModelType<T>) {}

    transform(value: any, metadata: ArgumentMetadata) {
      return this.model.findOne({ where: { id: value } });
    }
  }

  return ParamPipe;
};
