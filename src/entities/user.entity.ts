import {
  BeforeInsert,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { hash } from 'bcrypt';
import * as process from 'process';
import { Roles } from '../enums/roles.enum';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstname: string;

  @Column()
  lastname: string;

  @Column()
  email: string;

  @Column()
  bossId: number;

  @Column({
    type: 'enum',
    enum: Roles,
    default: Roles.REGULAR_USER,
  })
  role: Roles;

  @Column({ select: false })
  password: string;

  @OneToMany(() => UserEntity, (subordinate) => subordinate.boss)
  subordinates: UserEntity[];

  @ManyToOne(() => UserEntity, (boss) => boss.subordinates)
  @JoinColumn({
    name: 'bossId',
    referencedColumnName: 'id',
  })
  boss: UserEntity;

  @BeforeInsert()
  async hashPassword() {
    this.password = await hash(
      this.password,
      parseInt(process.env.BCRYPT_SALT),
    );
  }
}
