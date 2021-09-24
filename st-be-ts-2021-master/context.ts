import { UserModel } from "./entities/user-entity";
import requestIp from "request-ip";
import geoip from "geoip-lite";
import MobileDetect from "mobile-detect";
import { Context } from "./auth-checker/context-interface";

export const getContext = async (req, _id) => {
    if(!_id){
        return {}
    }
    const user = await UserModel.findById(_id).lean();
    delete user.password;

    const ip = requestIp.getClientIp(req); 
    const geo = geoip.lookup(ip);
    const md = new MobileDetect(req.headers['user-agent']);
    const context: Context = {
        user,
        ip,
        geo,
        md,
    };

    return context
}