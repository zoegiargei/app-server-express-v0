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
