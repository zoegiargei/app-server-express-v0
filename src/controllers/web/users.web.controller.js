import usersService from '../../services/users.service.js'

export async function contrShowUsers (req, res) {
    const users = await usersService.getUsers()
    res.render('showUsers', { title: 'Users', loggedin: req.user, thAreUsers: users, users })
}
