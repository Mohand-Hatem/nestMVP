import { Exclude } from 'class-transformer';
import {
  AfterInsert,
  AfterRemove,
  AfterUpdate,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';
import { Report } from '../reports/reports.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  email: string;

  @Column()
  @Exclude()
  password: string;

  @OneToMany(() => Report, (report) => report.userId)
  reports: Report[];

  @AfterInsert()
  logInsert() {
    console.log('User Inserted', this.id);
  }
  @AfterUpdate()
  logUpdate() {
    console.log('User Updated', this.id);
  }
  @AfterRemove()
  logRemove() {
    console.log('User Removed', this.id);
  }
}
