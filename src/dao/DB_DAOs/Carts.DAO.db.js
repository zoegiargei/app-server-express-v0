import DAODb from './DAO.db.js'
import cartModel from '../DBmodels/Cart.model.js'
const CartDbDAO = new DAODb(cartModel)
export default CartDbDAO
