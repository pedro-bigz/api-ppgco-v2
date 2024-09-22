import _isDate from 'lodash/isDate';
import { Excel } from './excel';

export abstract class FromCollection<T extends object> extends Excel {
  protected sheet: any;
  protected data: T[];
  protected finalData: any[];
  protected finalHeaders: string[];
  protected keys: string[];
  protected sheetTitle: string;

  public abstract collection(): Promise<T[]>;

  public async init() {
    this.sheet = this.wb.addWorksheet(this.title());
    this.data = await this.collection();
    this.keys = Object.keys(this.data[0]);

    this.finalHeaders = this.headers(this.keys);
    this.finalData = this.data.map(this.map);

    this.finalHeaders.forEach((heading, index) => {
      this.sheet.cell(1, index + 1).string(heading);
    });

    this.finalData.forEach((item, rowIndex) => {
      this.keys.forEach((key, columnIndex) => {
        const data = item[key];
        const cell = this.sheet.cell(rowIndex + 2, columnIndex + 1);

        if (typeof data === 'boolean') {
          cell.bool(data);
        } else if (typeof data === 'number') {
          cell.number(data);
        } else if (_isDate(data)) {
          cell.date(data);
        } else {
          cell.string(data);
        }
      });
    });
  }

  public headers(keys: string[]): string[] {
    return keys;
  }

  public map(item: T) {
    return item;
  }

  public title() {
    return this.sheetTitle;
  }

  public setSheetTitle(sheetTitle: any) {
    this.sheetTitle = sheetTitle;
    return this;
  }
}
