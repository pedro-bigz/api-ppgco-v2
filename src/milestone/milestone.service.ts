import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Transaction } from 'sequelize';
import _differenceBy from 'lodash/differenceBy';
import _intersectionBy from 'lodash/intersectionBy';

import { CommonListing, CommonService, OrderDto, Query } from 'src/core';
import { MilestoneDocumentService } from 'src/milestone-document';
import {
  CreateMilestoneHistoryDto,
  MilestoneHistoryService,
} from 'src/milestone-history';
import {
  MILESTONE_REPOSITORY,
  V_MILESTONE_REPOSITORY,
} from './milestone.constants';
import { Milestone, VMilestone } from './entities';
import { CreateMilestoneDto, UpdateMilestoneDto } from './dto';
import { DefaultMilestonesService } from 'src/default-milestones/default-milestones.service';
import dayjs from 'dayjs';

interface MilestoneCreationAdditionalData {
  transaction?: Transaction;
}

@Injectable()
export class MilestoneService extends CommonService<
  Milestone,
  typeof Milestone
> {
  public constructor(
    @Inject(MILESTONE_REPOSITORY) milestoneModel: typeof Milestone,
    @Inject(V_MILESTONE_REPOSITORY)
    private readonly milestoneView: typeof VMilestone,
    private readonly milestoneDocumentService: MilestoneDocumentService,
    private readonly milestoneHistoryService: MilestoneHistoryService,
    private readonly defaultMilestoneService: DefaultMilestonesService,
  ) {
    super(milestoneModel);
  }

  public getCommonListing() {
    return CommonListing.create<VMilestone, typeof VMilestone>(
      this.milestoneView,
    ) as any;
  }

  public async find(
    page: number,
    perPage: number,
    search: string,
    searchIn: string = 'id',
    order: OrderDto[],
  ) {
    return this.getCommonListing()
      ?.attachPagination(page, perPage)
      ?.attachMultipleOrder(order || [['situation_id', 'DESC']])
      ?.attachSearch(search, searchIn)
      ?.modifyQuery((query: Query<Milestone>) => {
        return {
          ...query,
        };
      })
      ?.get() as any;
  }

  public async createFromProjectList(
    projectIds: string[],
    createMilestoneDto: CreateMilestoneDto,
    additionalData?: MilestoneCreationAdditionalData,
  ) {
    const { documents, ...milestoneDto } = createMilestoneDto;

    const milestones = await this.model.bulkCreate(
      projectIds.map((projectId) => ({
        ...milestoneDto,
        project_id: projectId,
      })),
      additionalData,
    );

    if (documents) {
      await this.milestoneDocumentService.bulkCreate(
        milestones.flatMap((milestone: Milestone) =>
          documents.map(
            (document: { doc_name: string; description: string }) => ({
              milestone_id: milestone.dataValues.id,
              ...document,
            }),
          ),
        ),
      );
    }

    return milestones;
  }

  public async create(
    projectId: number,
    createMilestoneDto: CreateMilestoneDto,
    additionalData?: MilestoneCreationAdditionalData,
  ) {
    const { documents, ...milestoneDto } = createMilestoneDto;

    const milestone = await this.model.create(
      {
        ...milestoneDto,
        project_id: projectId,
      },
      additionalData,
    );

    if (documents) {
      await this.milestoneDocumentService.create(
        milestone.dataValues.id,
        documents,
        additionalData,
      );
    }

    return milestone;
  }

  public async bulkCreate(
    projectId: number,
    createMilestoneDtoList: CreateMilestoneDto[],
  ) {
    const milestonesList = createMilestoneDtoList.map(
      ({ documents, ...milestoneDto }) => ({
        ...milestoneDto,
        project_id: projectId,
      }),
    );

    const milestonesRegisters = await this.model.bulkCreate(milestonesList);

    await this.milestoneDocumentService.bulkCreate(
      createMilestoneDtoList
        .map(({ documents }, index) => {
          if (!documents) return;

          const milestone = milestonesRegisters[index];

          if (!milestone?.dataValues?.id) return;

          return {
            milestone_id: milestone.dataValues.id,
            ...documents,
          };
        })
        .filter(Boolean),
    );

    return milestonesRegisters;
  }

  public async update(id: number, updateMilestoneDto: UpdateMilestoneDto) {
    const register = await this.findOne(id);

    if (!register) {
      throw new NotFoundException('Milestone not found');
    }

    const historyPromise = this.persistHistory(id, register.dataValues);
    const milestonePromise = this.model.update(updateMilestoneDto, {
      where: { id },
    });

    const { documents: oldDocumentList } = register.dataValues;
    const { documents: newDocumentList } = updateMilestoneDto;

    const updateds = Promise.all([historyPromise, milestonePromise]).then(
      ([_, [result]]) => result,
    );

    if (oldDocumentList.length) {
      await this.milestoneDocumentService.destroyFromMilestone(id);
    }

    if (newDocumentList.length && updateMilestoneDto.need_document) {
      await this.milestoneDocumentService.bulkCreate(
        newDocumentList.map(
          (document: { doc_name: string; description: string }) => ({
            milestone_id: id,
            ...document,
          }),
        ),
      );
    }

    return Promise.resolve([await updateds]);
  }

  private async persistHistory(id: number, register: Milestone) {
    const history = new CreateMilestoneHistoryDto();

    history.milestone_id = id;
    history.project_id = register.project_id;
    history.description = register.description;
    history.expected_date = register.expected_date;
    history.meeting_collegiate = register.meeting_collegiate;
    history.process_number_sei = register.process_number_sei;
    history.need_document = register.need_document;
    history.situation_id = register.situation_id;
    history.documents = register.documents.map(({ doc_name }) => doc_name);

    return this.milestoneHistoryService.create(history);
  }

  public async configProjectDefaultMilestones(
    projectId: number,
    courseId: number,
  ) {
    const defaultMilestones =
      await this.defaultMilestoneService.findOne(courseId);

    if (!defaultMilestones) {
      return [];
    }

    const convertedMilestones = defaultMilestones.map(
      ({ duration, ...milestone }) => ({
        ...milestone,
        expected_date: dayjs().add(duration, 'day').format('YYYY-MM-DD'),
      }),
    );

    console.log({ convertedMilestones });

    return this.bulkCreate(projectId, convertedMilestones);
  }
}
