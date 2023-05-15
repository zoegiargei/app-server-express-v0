import { AuthenticationFailed } from "../../errors/Authentication.failed.js";
import { PermissionsFailed } from "../../errors/Permissions.failed.js";

export const authenticationByRole = (roles) => {
    return (req, res, next) => {
        
        console.log(">>>>>> Authentication by role, user: ")
        console.log(req.user)

        if(!req.user){
            res.redirect('/web/error/')
            //return res.status(401).json({ status: "error", error: new AuthenticationFailed() })
            next(new AuthenticationFailed())
        }
        
        if(roles.includes(req.user.role)) {
            console.log("entro al if roles.includes(roles)")
            next()
        } else {
            res.redirect('/web/error/')
            //return res.status(403).json({ status: "error", error: new PermissionsFailed() })
            next(new PermissionsFailed())
        }
    }
};