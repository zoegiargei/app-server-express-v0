class ProductMock{
    #title
    #description
    #price
    #stock
    
    constructor({ title, description, price, stock }){

        this.#title = title,
        this.#description = description,
        this.#price = price,
        this.#stock = stock
    }

    get title(){return this.#title}
    get description(){ return this.#description }
    get price(){ return this.#price }
    get stock(){ return this.#stock }

    toDtoProduct(){
        return{
            title: this.#title,
            description: this.#description,
            price: this.#price,
            stock: this.#stock 
        }
    }
}

export default ProductMock