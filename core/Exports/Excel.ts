export abstract class Excel {
  protected wb: any;

  public abstract init(): Promise<void>;

  public workbook() {
    return this.wb;
  }
}
