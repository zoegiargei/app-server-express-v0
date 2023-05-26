const socketSideClient = io()



socketSideClient.on('allProducts', data => {
    const divProducts = document.getElementById('products')

    data.forEach((elem, index) => {
        
        divProducts.innerHTML +=
        `
            <div class='prodList p-4 m-4'>

                <ul class='prodList list-group' id='${index}'>

                    <li class='list-group-item list-group-item-action active' aria-current='true' ><h5>Product: ${ elem.title }</h5></li>
                    <li class='list-group-item list-group-item-action' >Description: ${elem.description}</li>
                    <li class='list-group-item list-group-item-action' >Code: ${elem.code}</li>
                    <li class='list-group-item list-group-item-action' >Price: ${elem.price}</li>
                    <li class='list-group-item list-group-item-action' >Status: ${elem.status}</li>
                    <li class='list-group-item list-group-item-action' >Stock: ${elem.stock}</li>
                    <li class='list-group-item list-group-item-action' >Category: ${elem.category}</li>
                    <li class='list-group-item list-group-item-action' >Thumbnail: ${elem.thumbnail}</li>
                </ul>
            </div>
        `
    })
})



socketSideClient.on('updateView', data => {
    const divProducts = document.getElementById('products')

    divProducts.innerHTML = ``
    data.forEach((elem, index) => {
        
        divProducts.innerHTML += 
        `
            <div class='prodList p-4 m-4'>

                <ul class='prodList list-group' id='${index}'>

                    <li class='list-group-item list-group-item-action active' aria-current='true' ><h5>Product: ${ elem.title }</h5></li>
                    <li class='list-group-item list-group-item-action' >Description: ${elem.description}</li>
                    <li class='list-group-item list-group-item-action' >Code: ${elem.code}</li>
                    <li class='list-group-item list-group-item-action' >Price: ${elem.price}</li>
                    <li class='list-group-item list-group-item-action' >Status: ${elem.status}</li>
                    <li class='list-group-item list-group-item-action' >Stock: ${elem.stock}</li>
                    <li class='list-group-item list-group-item-action' >Category: ${elem.category}</li>
                    <li class='list-group-item list-group-item-action' >Thumbnail: ${elem.thumbnail}</li>
                </ul>
            </div>
        `
    })
})