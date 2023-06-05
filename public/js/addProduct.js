/* eslint-disable camelcase */
class Product {
    constructor (title, description, code, price, status, stock, category, file_thumbnail) {
        this.title = title
        this.description = description
        this.code = code
        this.price = price
        this.status = status
        this.stock = stock
        this.category = category
        this.file_thumbnail = file_thumbnail
    }
}

const formAddProduct = document.getElementById('formAddProduct')

formAddProduct.addEventListener('submit', (e) => {
    e.preventDefault()

    const dataForm = new FormData()
    const newProduct = new Product(
        document.getElementById('title').value,
        document.getElementById('description').value,
        document.getElementById('code').value,
        document.getElementById('price').value,
        document.getElementById('status').value,
        document.getElementById('stock').value,
        document.getElementById('category').value
    )
    const fileInput = document.getElementById('attach')
    dataForm.append('attach', fileInput.files[0])
    dataForm.append('data', JSON.stringify(newProduct))

    fetch('/api/products/addProduct', {
        method: 'POST',
        body: dataForm,
        headers: {}

    }).then(result => {
        if (result.status === 201) {
            formAddProduct.reset()
        }
    })
})
