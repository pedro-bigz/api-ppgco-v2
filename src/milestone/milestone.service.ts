import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { MILESTONE_REPOSITORY } from './milestone.constants';
import { Milestone } from './entities';
import { CreateMilestoneDto, UpdateMilestoneDto } from './dto';
import { AppListing, Query } from '@app/core';
import { MilestoneDocumentService } from '@app/milestone-document';
import {
  CreateMilestoneHistoryDto,
  MilestoneHistoryService,
} from '@app/milestone-history';

@Injectable()
export class MilestoneService {
  public constructor(
    @Inject(MILESTONE_REPOSITORY)
    private readonly milestoneModel: typeof Milestone,
    private readonly milestoneDocumentService: MilestoneDocumentService,
    private readonly milestoneHistoryService: MilestoneHistoryService,
  ) {}

  public findAll() {
    return this.milestoneModel.findAll();
  }

  public async find(
    page: number,
    perPage: number,
    search: string,
    searchIn: string = 'id',
    order: Record<string, 'ASC' | 'DESC'>,
  ) {
    return AppListing.create<typeof Milestone>(this.milestoneModel)
      ?.attachPagination(page, perPage)
      ?.attachOrderObj(order || { id: 'DESC' })
      ?.attachSearch(search, searchIn)
      ?.modifyQuery((query: Query) => {
        return {
          ...query,
        };
      })
      ?.get<Milestone>();
  }

  public findOne(id: number) {
    return this.milestoneModel.findOne({ where: { id } });
  }

  public async create(
    projectId: number,
    createMilestoneDto: CreateMilestoneDto,
  ) {
    const { document, ...milestoneDto } = createMilestoneDto;

    const milestone = await this.milestoneModel.create({
      ...milestoneDto,
      project_id: projectId,
    });

    if (document) {
      await this.milestoneDocumentService.create(
        milestone.dataValues.id,
        document,
      );
    }

    return milestone;
  }

  public async update(id: number, updateMilestoneDto: UpdateMilestoneDto) {
    const register = await this.findOne(id);

    if (!register) {
      throw new NotFoundException('Milestone not found');
    }

    const historyPromise = this.persistHistory(id, register.dataValues);
    const milestonePromise = this.milestoneModel.update(updateMilestoneDto, {
      where: { id },
    });

    return Promise.all([historyPromise, milestonePromise]).then(
      ([_, [result]]) => result,
    );
  }

  private async persistHistory(id: number, register: Milestone) {
    const history = new CreateMilestoneHistoryDto();

    history.milestone_id = id;
    history.description = register.description;
    history.expected_date = register.expected_date;
    history.meeting_collegiate = register.meeting_collegiate;
    history.process_number_sei = register.process_number_sei;
    history.need_document = register.need_document;
    history.situation = register.situation;

    return this.milestoneHistoryService.create(history);
  }

  public remove(id: number) {
    return this.milestoneModel.destroy({ where: { id } });
  }
}
