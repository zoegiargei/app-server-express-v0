/* eslint-disable no-unused-vars */
/* async function seeProduct (e) {
    const form = e.target.closest('form')
    const btnSeeProductValue = form.elements.prod.value
    const pid = btnSeeProductValue
    console.log(pid)

    const url = `/web/products/product/${pid}`
    const url2 = `/web/products/productDetails/${pid}`
    console.log(`/web/products/product/${pid}`)

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(result => {
        if (result.status === 200) {
            window.location.replace(url2)
        }
    })
} */

const buttons = document.querySelectorAll('.btnProductDetails')
buttons.forEach(button => {
  button.addEventListener('click', (e) => {
    const productId = button.getAttribute('productId')
    const url = `/web/products/productProof/${productId}`

        fetch('/web/products/product', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ pid: productId })
          })
          .then(result => {
            if (result.status === 200) {
              window.location.replace(url)
            }
            console.log(result)
          })
          .catch(error => {
            console.log(error)
            // eslint-disable-next-line no-undef
            Swal.fire({
              icon: 'error',
              title: 'Something is wrong'
            })
          })
    })
})

/* const btn = document.getElementById('btnProductDetails')
btn.addEventListener('click', (e) => {
    const productId = btn.getAttribute('productId')

    fetch('/web/products/product', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ pid: productId })
      })
      .then(response => {
        console.log(response)
      })
      .catch(error => {
        console.log(error)
      })
}) */
