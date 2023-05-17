import { Router } from "express";
import cartsService from "../../src/services/carts.service.js";

const routerCartsMock = Router();

//proof cartsService
routerCartsMock.post('/nuevoCarrito', async (req, res) => {
    const newCart = await cartsService.createCart('zoegiargei@gmail.com')
    console.log(newCart)
    res.json({newCart})
});

routerCartsMock.post('/productoEnCarrito', async(req,res) => {
    const cid = '64635ba6db2ac152268cb18f'
    const pid = '645e4a3cd2703860d39d00cb'
    const quantity = 20

    await cartsService.addToCart(cid, pid, quantity)
    const cart = await cartsService.getCartById(cid)
    res.json({cart})
});

routerCartsMock.post('/actualizarCantidad', async(req, res) => {
    const cid = '64635ba6db2ac152268cb18f'
    const pid = '645e4a3cd2703860d39d00cb'
    const quantity = 10

    const updated = await cartsService.updateProdInCart(cid, pid, quantity)
    const cartUpdated = await cartsService.getCartById(cid)
    res.json({cartUpdated})
});

routerCartsMock.delete('/eliminarProductoEnCarrito', async(req, res)=>{
    const cid = '64635ba6db2ac152268cb18f'
    const pid = '645e4a3cd2703860d39d00cb'

    await cartsService.delProdInCart(cid, pid)
    const cartUpdated = await cartsService.getCartById(cid)
    res.json({cartUpdated})
});

routerCartsMock.delete('/eliminarTodosLosProductos', async(req, res) => {
    const cid = '64635ba6db2ac152268cb18f'

    await cartsService.deleteAllProducts(cid)
    const cartUpdated = await cartsService.getCartById(cid)
    res.json({cartUpdated})
});

routerCartsMock.delete('/eliminarCarrito', async(req, res) => {
    const cid = '64635ba6db2ac152268cb18f'

    const deleteCartResult = await cartsService.deleteCart(cid)
    res.json({deleteCartResult})
});

export default routerCartsMock;
