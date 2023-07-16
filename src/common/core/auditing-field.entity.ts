import { Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export class AuditingFieldEntity {
  @CreateDateColumn()
  createdTime: Date;

  @UpdateDateColumn()
  updatedTime: Date;
}
