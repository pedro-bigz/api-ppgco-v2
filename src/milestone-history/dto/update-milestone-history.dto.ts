export class UpdateMilestoneHistoryDto {
  description: string;
  expected_date: Date;
  meeting_collegiate: string;
  process_number_sei: string;
  need_document: boolean;
  situation: string;
  milestone_id: number;
  project_id: number;
  documents: Record<string, any>;
}
