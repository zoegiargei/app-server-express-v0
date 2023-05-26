async function seeProduct(e){
    const form = e.target.closest('form')
    const btnSeeProductValue = form.elements.prod.value

    const url = `http://localhost:8080/web/products/product/:${btnSeeProductValue}`
    window.location.replace(url)
}