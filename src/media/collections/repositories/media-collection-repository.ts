import { HasMedia } from 'src/media/abstracts';
import { Media, MediaInputData } from 'src/media/entities';
import { Model, Sequelize } from 'sequelize-typescript';
import { SequelizeConfig } from 'src/core';

export class MediaCollectionRepository {
  constructor(
    private model: HasMedia & Model,
    private collection: string,
  ) {}

  private getMediaRepo() {
    const sequelize = SequelizeConfig.getRepository({
      models: [Media],
    });
    return sequelize.getRepository(Media);
  }

  private getModelPrimaryKey() {
    return this.model.getModelPrimaryKey();
  }

  private getModelName() {
    return this.model.getModelName();
  }

  public async getMedias() {
    return this.getMediaRepo().findAll({
      where: {
        model_id: this.getModelPrimaryKey(),
        model_type: this.getModelName(),
        collection_name: this.collection,
      },
    });
  }

  public async destroyMedias() {
    return this.getMedias().then((medias) => {
      medias?.forEach((media) => {
        media.destroy();
      });
    });
  }

  public getCollection() {
    return this.collection;
  }
}
