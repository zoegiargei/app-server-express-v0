import { PermissionsFailed } from "../../errors/Permissions.failed.js";

export const loggedIn = (req, res, next) => {
    if(!req.user){
        return (new PermissionsFailed())
    }
    next()
};