import { AuthenticationFailed } from "../../errors/Authentication.failed.js";
import { PermissionsFailed } from "../../errors/Permissions.failed.js";

export const customResponses = (req, res, next) => {
    
    res.sendOk = result => {
        res.status(200).json({ status: "success", message: result.message, object: result.object })
    }

    res.sendCreated = result => {
        res.status(201).json({ status: "success", message: result.message, object: result.object })
    }

    res.sendAccepted = result => {
        res.status(202).json({ status: "success", message: result.message, object: result.object })
    }

    res.sendClientError = error => {
        res.status(400).json({ status: "error", message: error.message })
    }

    res.sendServerError = error => {
        res.status(500).json({ status: "error", message: error.message })
    }

    res.sendAuthenticationError = error => {
        res.status(401).json({ status: "error", error: new AuthenticationFailed(), message: error.message })
    }

    res.sendPermissionsError = error => {
        res.status(403).json({ status: "error", error: new PermissionsFailed(), message: error.message })
    }

    next()
};