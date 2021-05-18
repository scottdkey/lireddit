import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, BaseEntity, ManyToOne } from "typeorm";
import { ObjectType, Field } from "type-graphql";
import { User } from "./User";

@ObjectType()
@Entity()
export class Post extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column({ type: "text" })
  title!: string;

  @Field()
  @Column()
  text!: string

  @Field()
  @Column({ type: 'int', default: 0 })
  points!: number

  @ManyToOne(() => User, user => user.posts)
  creator: User;

  @Field()
  @Column()
  creatorId: string

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date
}