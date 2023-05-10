import usersService from "../../services/users.service.js";

export async function contrShowUsers(req, res){
    
    const users = await usersService.getUsers()
    console.log(users)

    const thAreUsers = users ? true : false
    const loggedin = req.user
    res.render('showUsers', { title: 'Users', loggedin: loggedin, thAreUsers: thAreUsers , users: users })
};