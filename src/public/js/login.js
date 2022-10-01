const loginForm = document.getElementById('loginForm');

loginForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const formData = new FormData(this);
    fetch('/login', {
        method: 'post',
        body: formData
    }).then(function (response)  {
        return response.text();
    }).then(function (text)  {
        const result = JSON.parse(text);
        localStorage.setItem('APP_TOKEN', result.token);
        window.location.href = '/dashboard';
    }).catch(function  (error)  {
        console.error(error);
    })
});