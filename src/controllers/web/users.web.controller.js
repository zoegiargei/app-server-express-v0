import usersService from '../../services/users.service.js'

export async function contrShowUsers (req, res) {
    try {
        if (!req.user) return new Error()
        const users = await usersService.getUsers()
        if (!users) return new Error()
        res.render('showUsers', { title: 'Users', loggedin: req.user, thAreUsers: users, users })
    } catch (error) {
        res.sendServerError()
    }
}
