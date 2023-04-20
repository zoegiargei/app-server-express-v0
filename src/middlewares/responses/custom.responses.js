import { AuthenticationFailed } from "../../errors/Authentication.failed.js";
import { PermissionsFailed } from "../../errors/Permissions.failed.js";

export const customResponses = (req, res, next) => {
    
    res.sendSuccess = result => {
        res.json({ status: "success", result })
    }

    res.sendClientError = error => {
        res.status(400).json({ status: "error", error })
    }

    res.sendServerError = error => {
        res.status(500).json({ status: "error", error })
    }

    res.sendAuthenticationError = error => {
        res.status(401).json({ status: "error", error: new AuthenticationFailed() })
    }

    res.sendPermissionsError = error => {
        res.status(403).json({ status: "error", error: new PermissionsFailed() })
    }
    next()
};