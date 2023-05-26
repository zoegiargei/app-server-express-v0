import Swal from 'sweetalert2'
import { winstonLogger } from '../../src/utils/loggers/logger.js'

class Quantity {
    constructor (quantity) {
        this.quantity = Number(quantity)
    }
}

// eslint-disable-next-line no-unused-vars
async function addToCart (e) {
    const form = e.target.closest('form')
    const qty = form.elements.quantity.value
    winstonLogger.debug(`Quantity: ${qty}`)
    const quantity = new Quantity(qty)

    const pid = form.elements.productId.value
    winstonLogger.debug(`ID of Product in cart ${pid}`)
    const cid = form.elements.btnAddToCart.value
    winstonLogger.debug(`ID of cart ${cid}`)

    const url = `/api/carts/:${cid}/products/:${pid}`

    fetch(url, {
        method: 'POST',
        body: JSON.stringify(quantity),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(result => {
        if (result.status === 200) {
            winstonLogger.debug('Added Product to cart sucessfully')
            Swal.fire({
                icon: 'success',
                title: 'Product successfully added to cart!'
            })
        }
    })
}

// Mandar con fetch estos datos y hacer blocke de quantity en la vista
