class Product{
    constructor(title, description, code, price, status, stock, category, file_thumbnail){
        this.title = title,
        this.description = description,
        this.code = code,
        this.price = price,
        this.status = status,
        this.stock = stock,
        this.category = category,
        this.file_thumbnail = file_thumbnail
    }
};


const formAddProduct = document.getElementById('formAddProduct');

formAddProduct.addEventListener('submit', (e) => {
    e.preventDefault()

    const dataForm = new FormData(e.target)

    const newProduct = new Product(dataForm.get('title'), dataForm.get('description'), dataForm.get('code'), dataForm.get('price'), dataForm.get('status'), dataForm.get('stock'), dataForm.get('category'), dataForm.get('file_thumbnail'))

    fetch('/api/products/addProduct', {
        method: 'POST',
        body: JSON.stringify(newProduct),
        headers: {
            'Content-Type': 'application/json'
        }

    }).then(result => {

        if(result.status === 201){
            formAddProduct.reset()
        }
        
        result.json()
    
    }).then(json => {
        console.log(json)
    })
});