const socketSideClient = io()

const inputName = document.getElementById('inputName')
const inputMess = document.getElementById('inputMessage')

inputName.addEventListener('keyup', (e) => {
    if(e.key === 'Enter'){
        if(inputName.value.trim().length > 0) {
            socketSideClient.emit('newMessage', { name: inputName.value, message: inputMess?.value })
            inputName.value = ''
        }
    }
})


Swal.fire({

    title: "Identifícate",
    input: "text",
    inputValidator: (value) => {
        return !value && "¡Necesitas escribir un nombre de usuario para comenzar a chatear!"
    },
    allowOutsideClick: false
}).then(result => {
    
    inputName.value = result.value
    socketSideClient.emit('newUser', result.value)
})


document.getElementById('NewMessButton').addEventListener('click', (e) => {

    if(inputName instanceof HTMLInputElement && inputMess instanceof HTMLInputElement && inputName.value && inputMess.value){
            
        const newMess = {
            name: inputName.value,
            mess: inputMess.value
        }

        socketSideClient.emit('newMessage', newMess)
    }
    
})


socketSideClient.on('messages', allMessages => {
    const messagesDiv = document.getElementById('messagesDiv')

    messagesDiv.innerHTML = ``
    allMessages.forEach((elem, index)  => {
        messagesDiv.innerHTML +=`
            <div class="p-1 mb-2 messList" style="width: 100%">

                <ul class="list-group" id="${index}">

                    <li class="list-group-item list-group-item-action" aria-current="true" ><h5>Product: ${ elem.name }</h5></li>
                    <li class="list-group-item list-group-item-action" >Description: ${ elem.mess }</li>
                </ul>
            </div>
        `
    })
})


socketSideClient.on('newUser', (name) => {
    Swal.fire({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        title: `${name} se ha unido al chat`,
        icon: "success"
    })
})


socketSideClient.emit('refreshMessages')