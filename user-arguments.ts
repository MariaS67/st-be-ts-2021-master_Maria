import { Field, InputType } from "type-graphql";
import { Length, IsEmail } from "class-validator";

@InputType()
export class CreateUserInput {
    @Field()
    @IsEmail()
    email: string;

    @Field()
    @Length(6, 255)
    password: string;

    @Field()
    @Length(1, 255)
    firstName: string;

    @Field()
    @Length(1, 255)
    lastName: string;

    @Field({nullable: true})
    workPlace?: string;

    @Field(type => [String], {nullable: true})
    roles?: [string];
}