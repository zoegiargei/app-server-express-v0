class ProductMock {
    #title
    #description
    #code
    #price
    #status
    #stock
    #category
    #thumbnail
    #owner
    constructor ({ title, description, code, price, status, stock, category, thumbnail = [], owner }) {
        this.#title = title
        this.#description = description
        this.#code = code
        this.#price = price
        this.#status = status
        this.#stock = stock
        this.#category = category
        this.#thumbnail = thumbnail
        this.#owner = owner
    }

    get title () { return this.#title }
    get description () { return this.#description }
    get code () { return this.#code }
    get price () { return this.#price }
    get status () { return this.#status }
    get stock () { return this.#stock }
    get category () { return this.#category }
    get thumbnail () { return this.#thumbnail }
    get owner () { return this.#owner }

    toDtoProduct () {
        return {
            title: this.#title,
            description: this.#description,
            code: this.#code,
            price: this.#price,
            status: this.#status,
            stock: this.#stock,
            category: this.#category,
            thumbnail: this.#thumbnail,
            owner: this.#owner
        }
    }
}
export default ProductMock
