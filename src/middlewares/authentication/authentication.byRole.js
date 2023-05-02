import { AuthenticationFailed } from "../../errors/Authentication.failed.js";
import { PermissionsFailed } from "../../errors/Permissions.failed.js";

export const authenticationByRole = (roles) => {
    return (req, res, next) => {
        
        console.log(">>>>>> Authentication by role, user: ")
        console.log(req.user)
        
        const user = req.user

        if(!user){
            res.redirect('/web/error/')
            return res.status(401).json({ status: "error", error: new AuthenticationFailed() })
        }
        
        if (roles.includes(user.role)) {
            next()
        } else {
            res.redirect('/web/error/')
            return res.status(403).json({ status: "error", error: new PermissionsFailed() })
        }
    }
};