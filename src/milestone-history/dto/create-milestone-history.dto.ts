export class CreateMilestoneHistoryDto {
  description: string;
  expected_date: Date;
  meeting_collegiate: string;
  process_number_sei: string;
  need_document: boolean;
  situation_id: number;
  milestone_id: number;
  project_id: number;
  documents: Record<string, any>;
}
