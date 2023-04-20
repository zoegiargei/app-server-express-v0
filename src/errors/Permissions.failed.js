export class PermissionsFailed extends Error {
    constructor(message='Permissions Error'){
        super(message)
        this.type = 'PERMISSIONS_FAILED'
    }
}