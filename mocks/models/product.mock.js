class ProductMock{
    constructor({ title, description, price, stock }){

        this.title = title,
        this.description = description,
        this.price = price,
        this.stock = stock
    }

    toDto(){
        return{
            title: this.title,
            description: this.description,
            price: this.price,
            stock: this.stock 
        }
    }
}