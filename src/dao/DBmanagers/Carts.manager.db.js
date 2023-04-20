import ManagerDb from "./Manager.db.js";
import cartModel from "../DBmodels/Cart.model.js";
const CartDbManager = new ManagerDb(cartModel);
export default CartDbManager;