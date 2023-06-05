import regex from '../utils/regex/Regex.js'

class Product {
    constructor ({ title, description, code, price, status = true, stock, category, thumbnail = [], owner = 'Admin' }) {
        this.title = regex.validation(regex.numbersBlanksAndText, title)
        this.description = description
        this.code = code
        this.price = regex.validation(regex.validatePrice, price)
        this.status = status
        this.stock = regex.validation(regex.onlyNumbers, stock)
        this.category = category
        this.thumbnail = thumbnail
        this.owner = owner
    }
}
export default Product
