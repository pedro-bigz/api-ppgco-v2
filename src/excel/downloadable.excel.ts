import { Excel } from './excel';

export class Downloadable {
  public constructor(private excel: Excel) {}

  public static create(excel: Excel) {
    return new this(excel);
  }

  public async download(filename: string) {
    await this.excel.init();
    return new Promise((resolve, reject) => {
      this.excel.workbook().write(filename, (err: any, status: unknown) => {
        err ? reject(err) : resolve(status);
      });
    });
  }
}
