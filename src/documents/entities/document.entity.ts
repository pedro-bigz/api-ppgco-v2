import { Column, Model, Table } from 'sequelize-typescript';

@Table({ tableName: 'documents', timestamps: false })
export class Document extends Model {
  @Column({ primaryKey: true })
  name: string;
}
