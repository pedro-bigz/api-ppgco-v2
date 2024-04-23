import xl from 'excel4node';
import { FromCollection } from './FromCollection';
import { Downloadable } from './Downloadable';

export abstract class Spreadsheet<T extends object> extends FromCollection<T> {
  protected downloader: Downloadable;

  public constructor() {
    super();
    this.wb = new xl.Workbook();
    this.downloader = Downloadable.create(this);
  }

  public async download(filename: string) {
    return this.downloader.download(filename);
  }
}
