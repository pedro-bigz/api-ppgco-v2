export interface DefaultMilestonesDocumentDto {
  doc_name: string;
  description: string;
}

export interface DefaultMilestonesDto {
  description?: string;
  duration: number;
  meeting_collegiate?: string;
  process_number_sei?: string;
  need_document?: boolean;
  situation_id: number;
  documents?: DefaultMilestonesDocumentDto[];
}
