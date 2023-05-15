import regex from "../utils/regex/Regex.js";

class Product{
    constructor({ title, description, code, price, status=true, stock, category, thumbnail=[] }){

        this.title = regex.validation(regex.textWithBlancks, description),
        this.description = regex.validation(regex.textWithBlancks, description),
        this.code = code,
        this.price = regex.validation(regex.onlyNumbers, price),
        this.status = status,
        this.stock = regex.validation(regex.onlyNumbers, stock),
        this.category = category,
        this.thumbnail = thumbnail
    }
};

export default Product;