const cart = document.getElementById('cartId');
const cid = cart.value
console.log(cid)
const url = `/api/carts/:${cid}/purchase`

const btnPurchase = document.getElementById('btnPurchase')

btnPurchase.addEventListener('click', () => {
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(result => {
        if(result.status == 201){
            window.location.replace('/web/purchase/done')
        }
    })
})
