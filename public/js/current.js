const logoutForm = document.getElementById('logoutForm')
if (logoutForm instanceof HTMLFormElement) {
    logoutForm.addEventListener('submit', (e) => {
        e.preventDefault()

        fetch('/api/session/logout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(
            result => {
                if (result.status === 200) {
                    window.location.replace('/web/session/login/')
                }
            }
        )
    })
}

const formResetPassword = document.getElementById('formResetPassword')
formResetPassword.addEventListener('submit', (e) => {
    e.preventDefault()

    fetch('/api/user/passwordReset', {
        method: 'POST'
    }).then(result => {
        if (result.status === 200) {
            // eslint-disable-next-line no-undef
            Swal.fire({
                icon: 'success',
                title: 'We sent you the email to reset your password'
            })
        }
    })
})
