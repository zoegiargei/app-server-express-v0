import ManagerDb from "./Manager.db.js"
import productModel from "../DBmodels/Product.model.js";
const productsDbManager = new ManagerDb(productModel);
export default productsDbManager;