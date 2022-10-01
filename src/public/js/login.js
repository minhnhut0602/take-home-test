// clear token
localStorage.removeItem('APP_TOKEN');

const loginForm = document.getElementById('login-form');

loginForm.addEventListener('submit',  (e) => {
    e.preventDefault();
    const formData = new FormData(loginForm);
    showLoading();
    fetch('/login', {
        method: 'POST',
        body: formData
    }).then(function (response)  {
        hideLoading();
        return response.text();
    }).then(function (text)  {
        const result = JSON.parse(text);
        if (result && result.token) {
            localStorage.setItem('APP_TOKEN', result.token);
            window.location.href = '/dashboard';
        } else {
            let html = '';
            if (!result.errors || result.errorMessage) {
                let errorText = result.errorMessage || 'Something went wrong!';
                html = '<ul id="error-section-list">';
                html += `<li>${errorText}</li>`;
                html += '</ul>';
            } else {
                html = '<ul id="error-section-list">';
                result.errors.forEach(error => {
                    html += `<li>${error.msg}</li>`;
                });

                html += '</ul>';
            }

            const errorSection = document.getElementById('error-section');
            errorSection.classList.add("show");
            errorSection.innerHTML = html;
        }
    }).catch(function  (error)  {
        hideLoading();
        console.error(error);
    });
});

const buttonSignUp = document.getElementById('button-signup');
buttonSignUp.addEventListener('click', (e) => {
    e.preventDefault();
    window.location.href = '/signup';
})