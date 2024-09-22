import xl from 'excel4node';
import { SpreadsheetSheet } from './spreadsheet-sheet.excel';
import { Downloadable } from './downloadable.excel';
import { Excel } from './excel';

export abstract class SpreadsheetWithMultipleSheets<
  T extends object,
> extends Excel {
  protected wb: any;
  protected downloader: Downloadable;

  public constructor() {
    super();
    this.wb = new xl.Workbook();
    this.downloader = Downloadable.create(this);
  }

  public async init() {
    for (const worksheet of this.sheets()) {
      await worksheet.setWorkbook(this.wb).init();
    }
  }

  protected abstract sheets(name?: string): SpreadsheetSheet<T>[];

  public async download(filename: string) {
    return this.downloader.download(filename);
  }
}
