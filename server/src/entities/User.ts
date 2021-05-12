import { Entity, PrimaryKey, Property } from "@mikro-orm/core";
import { Field, ObjectType } from "type-graphql";
import { v4 } from 'uuid'


@ObjectType()
@Entity()


export class User {
  @Field()
  @PrimaryKey()
  id: string = v4();

  @Field(() => String)
  @Property({ type: 'date' })
  createdAt = new Date();

  @Field(() => String)
  @Property({ type: 'date', onUpdate: () => new Date() })
  updatedAt = new Date();

  @Field()
  @Property({ type: 'text', unique: true })
  username!: string;

  @Field()
  @Property({ type: 'text', unique: true })
  email!: string;

  @Property({ type: 'text' })
  password!: string;

}