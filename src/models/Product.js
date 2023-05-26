import regex from '../utils/regex/Regex.js'

class Product{
    constructor({ title, description, code, price, status=true, stock, category, thumbnail=[] }){

        this.title = regex.validation(regex.textNotBlancks, title),
        this.description = description,
        this.code = code,
        this.price = regex.validation(regex.validatePrice, price),
        this.status = status,
        this.stock = regex.validation(regex.onlyNumbers, stock),
        this.category = category,
        this.thumbnail = thumbnail
    }
}

export default Product