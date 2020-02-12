// src/users/entity.ts
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { BaseEntity } from "typeorm/repository/BaseEntity";
import { IsString, Length, MinLength, Contains } from "class-validator";
import { Exclude } from "class-transformer";
import * as bcrypt from "bcrypt";

@Entity()
export default class User extends BaseEntity {
  async setPassword(rawPassword: string) {
    const hash = await bcrypt.hash(rawPassword, 10);
    this.password = hash;
  }
  checkPassword(rawPassword: string): Promise<boolean> {
    return bcrypt.compare(rawPassword, this.password);
  }
  @PrimaryGeneratedColumn()
  id?: number;
  @IsString()
  @Length(2)
  @Column("text", { nullable: false })
  firstName: string;

  @IsString()
  @Length(2)
  @Column("text", { nullable: false })
  lastName: string;
  @IsString()
  @Contains("@")
  @Column("text", { nullable: false })
  email: string;
  @IsString()
  @MinLength(8)
  @Column("text", { nullable: false })
  @Exclude({ toPlainOnly: true })
  password: string;
  @IsString()
  @Length(3)
  @Column("text")
  city: string;
}
