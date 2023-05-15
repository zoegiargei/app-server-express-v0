class Quantity{
    constructor(quantity){
        this.quantity = Number(quantity)
    }
}

async function addToCart(e){

    const form = e.target.closest('form')
    const qty = form.elements.quantity.value
    console.log("quantity")
    console.log(qty)
    const quantity = new Quantity(qty)

    const pid = form.elements.productId.value
    console.log("pid and cid")
    console.log(pid)
    const cid = form.elements.btnAddToCart.value
    console.log(cid)

    const url = `/api/carts/:${cid}/products/:${pid}`

    fetch(url, {
        method: 'POST',
        body: JSON.stringify(quantity),
        headers: {
            'Content-Type': 'application/json'
        }
    })
};

//Mandar con fetch estos datos y hacer blocke de quantity en la vista