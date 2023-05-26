//función para mostrar error en DOM
function error(div, mensaje){

    let divError = document.getElementById(div)
    divError.innerHTML = `<p class='error'>${mensaje}</p>`
    setTimeout(() => {divError.innerHTML = ``}, 3000)
}