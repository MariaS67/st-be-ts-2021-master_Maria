import { Resolver, Query, Mutation, Arg} from "type-graphql";
import { UserModel } from "../entities/user-entity";
import { UserInputError } from "apollo-server-express";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

@Resolver()
export class AuthResolver {

  @Mutation(returns => String) 
  async login(
    @Arg("email") email: string, 
    @Arg("password") password: string): Promise<String> {

    const matchedUser = await UserModel.findOne({email});
    if(!matchedUser){
        throw new UserInputError(`cannot find user with email: ${email}`, {
            field: "email",
            value: email,
            constraint: "emailDoesNotExist",
        })
    }

    const validPassword = await bcryptjs.compare(password, matchedUser.password);
    if(!validPassword){
        throw new UserInputError(`Password is incorrect`, {
            field: "password",
            value: "",
            constraint: "passwordIncorrect",
        })
    }

    const privateKey = process.env.JSONWEBTOKEN_PRIVATE_KEY;
    const token = jwt.sign({
        _id: matchedUser._id,
        email: matchedUser.email, 
    }, privateKey, {
        expiresIn: "1d"
    });

    return token;
  }
}