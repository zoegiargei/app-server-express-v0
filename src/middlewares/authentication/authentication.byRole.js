import { AuthenticationFailed } from "../../errors/Authentication.failed.js";
import { PermissionsFailed } from "../../errors/Permissions.failed.js";

const authenticationByRole = (roles) => {
    return function (req, res, next){

        if(!req.user){
            return res.status(401).json({ status: "error", error: new AuthenticationFailed() })
        }
        
        if (roles.includes(req.user.role)) {
            next()
        } else {
            return res.status(403).json({ status: "error", error: new PermissionsFailed() })
        }
    }
};

export default authenticationByRole;