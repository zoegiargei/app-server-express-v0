const formChangePassword = document.getElementById('formChangePassword')
formChangePassword.addEventListener('submit', (e) => {
    e.preventDefault()

    const dataForm = new FormData(e.target)
    const currentPassword = dataForm.get('currentPass')
    const newPassword = dataForm.get('newPass')

    if (currentPassword === newPassword) {
        console.log('The passwords cannot be equals')
    }

    fetch('')
})
