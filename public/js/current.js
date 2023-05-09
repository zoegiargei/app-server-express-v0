//Go to cart
const cartForm = document.getElementById('cartForm');
const btnCart = document.getElementById('btnCart');

if(cartForm instanceof HTMLFormElement){
    cartForm.addEventListener('submit', (e) => {
        e.preventDefault()

        fetch('/api/carts/cartById', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(result => {
            
            if(result.status === 201){
                window.location.replace('/web/carts/cartById')
            }else{
                window.location.replace('/web/error/')
            }
            
            result.json()
        })
    });
}


//logout
const logoutForm = document.getElementById('logoutForm');

if(logoutForm instanceof HTMLFormElement){
    
    logoutForm.addEventListener('submit', (e) => {
        e.preventDefault()

        fetch('/api/session/logout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }

        }).then(

            result => {
                if(result.status === 200){
                    window.location.replace('/web/session/login/')
                }
            }
        )
    })
};