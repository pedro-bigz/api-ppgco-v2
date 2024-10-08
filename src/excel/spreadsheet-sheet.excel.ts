import { FromCollection } from './from-collection.excel';

export abstract class SpreadsheetSheet<
  T extends object,
> extends FromCollection<T> {
  public constructor(wb?: any) {
    super();
    this.wb = wb;
  }

  public setWorkbook(wb: any) {
    this.wb = wb;
    return this;
  }
}
