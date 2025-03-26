import { Inject, Injectable } from '@nestjs/common';
import { CommonService } from 'src/core';
import { ResearchLine } from './entities';
import { RESEARCH_LINE_REPOSITORY } from './research-line.constants';
import { CreateResearchLineDto, UpdateResearchLineDto } from './dto';

@Injectable()
export class ResearchLineService extends CommonService<
  ResearchLine,
  typeof ResearchLine
> {
  public constructor(
    @Inject(RESEARCH_LINE_REPOSITORY) model: typeof ResearchLine,
  ) {
    super(model);
  }

  public create(createResearchLineDto: CreateResearchLineDto) {
    return this.model.create({ ...createResearchLineDto });
  }

  public update(id: number, updateResearchLineDto: UpdateResearchLineDto) {
    return this.model.update(updateResearchLineDto, {
      where: { id },
    });
  }
}
