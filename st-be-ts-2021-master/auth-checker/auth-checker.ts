import { AuthChecker } from "type-graphql";
import { Context } from "./context-interface";

export const authChecker: AuthChecker<Context> = ({ context: { user } }, roles) => {
    if (!user) {
        return false;
    }
    if (user.roles.some(role => roles.includes(role))) {
        return true;
    }
    return false;
};