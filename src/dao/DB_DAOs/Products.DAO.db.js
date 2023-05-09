import DAODb from "./DAO.db.js"
import productModel from "../DBmodels/Product.model.js";
const ProductsDbDAO = new DAODb(productModel);
export default ProductsDbDAO;