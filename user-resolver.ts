import { Resolver, Query, Mutation, Arg, Authorized} from "type-graphql";
import { User, UserModel } from "../entities/user-entity";
import { CreateUserInput } from "./user-arguments";
import bcryptjs from "bcryptjs";

@Resolver()
export class UserResolver {
    
    @Authorized(["ADMIN"])
    @Query(returns => [User])
    async users(): Promise<User[]> {
        return await UserModel.find({});
    }

    @Mutation(returns => User) 
    async createUser(@Arg("data") data: CreateUserInput): Promise<User> {
    
        const userData = {...data, password: await bcryptjs.hash(data.password, 10)}

        const newUser = new UserModel(userData);
        await newUser.save();
        return newUser;
    }
}