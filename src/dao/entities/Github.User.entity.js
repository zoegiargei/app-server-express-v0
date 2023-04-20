class GithubUser{
    constructor({full_name, user_id, username, cart={}, role='User'}){

        if(!full_name){ throw new Error('Sent an invalidate first name') }
        if(!user_id){ throw new Error('Sent an invalidate last name') }
        if(!username){ throw new Error('Sent an invalidate email') }

        this.full_name = full_name,
        this.user_id = user_id,
        this.username = username,
        this.cart = cart,
        this.role = role
    }
};

export default GithubUser;