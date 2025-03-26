import { Inject, Injectable } from '@nestjs/common';
import _isEmpty from 'lodash/isEmpty';
import _flatMap from 'lodash/flatMap';
import { MEDIA_REPOSITORY } from './media.constants';
import { Media } from './entities';
import { CreateMediaDto, UpdateMediaDto } from './dto';
import { HasMedia } from './abstracts';

type MediaKeyAttributes =
  | { id: number }
  | { model_type: string; model_id: number };

@Injectable()
export class MediaService {
  public constructor(
    @Inject(MEDIA_REPOSITORY)
    private readonly mediaModel: typeof Media,
  ) {}

  public findOne(where: MediaKeyAttributes) {
    return this.mediaModel.findOne({ where });
  }

  public create(createMediaDto: CreateMediaDto) {
    return this.mediaModel.create({ ...createMediaDto });
  }

  private async ensureID(where: MediaKeyAttributes) {
    return new Promise<MediaKeyAttributes>((resolve, reject) => {
      if ('id' in where) resolve(where);

      this.findOne(where)
        .then((response) => {
          resolve({ id: response?.dataValues.id });
        })
        .catch(reject);
    });
  }

  public async update(
    where: MediaKeyAttributes,
    updateMediaDto: UpdateMediaDto,
  ) {
    return this.mediaModel.update(updateMediaDto, {
      where: await this.ensureID(where),
    });
  }

  public async remove(where: MediaKeyAttributes) {
    return this.mediaModel.destroy({ where: await this.ensureID(where) });
  }

  public async uploadFiles(
    files: Record<string, Express.Multer.File[]>,
    model: HasMedia,
  ) {
    return new Promise<Media | Media[]>(async (resolve, reject) => {
      const [firstUpload, ...uploadedFiles] = _flatMap(files, (items) => items);

      const resolveWhenIsUnique = (media: Media) => {
        if (_isEmpty(uploadedFiles)) resolve(media);
      };

      await Media.fromMulterFile(firstUpload, model)
        .then(resolveWhenIsUnique)
        .catch(reject);

      const storing = uploadedFiles.map((file) =>
        Media.fromMulterFile(file, model),
      );

      return Promise.all(storing).then(resolve).catch(reject);
    });
  }
}
