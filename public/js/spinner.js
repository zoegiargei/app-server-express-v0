window.onload = () => {
    const divSpinner = document.getElementById('divSpinner')

    setTimeout(() => {        
        divSpinner.innerHTML = `
            <div class="d-flex justify-content-center">
                <div class="spinner-border" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
            </div>
        `
    }, 3000);
}; //silenciado