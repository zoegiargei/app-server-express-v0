// función para mostrar error en DOM
export function error (div, mensaje) {
    const divError = document.getElementById(div)
    divError.innerHTML = `<p class='error'>${mensaje}</p>`
    setTimeout(() => { divError.innerHTML = '' }, 3000)
}
