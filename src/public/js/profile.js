function isLoggedIn () {
    if (!localStorage.key('APP_TOKEN')) {
        window.location.href = '/login';
        return;
    }

    const paramId = window.location.pathname.split('/')[2];

    // render breadcrumb-name
    document.getElementById('breadcrumb-name').innerHTML = paramId;

    let token = localStorage.getItem('APP_TOKEN');
    let header = new Headers({
        'Cache-Control': 'no-cache',
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
    });

    const url = `/users/${paramId}`;
    showLoading();
    fetch(url, {
        method: 'GET',
        headers: header,
    }).then(function (response)  {
        hideLoading();
        return response.text();
    }).then(function (text)  {
        const response = JSON.parse(text);

        let html = '';
        const user = response ? response.user : null;
        if (user) {
            Object.keys(user).forEach(key => {
                html += '<div class="mb-2">';
                html += `<span class="mr-2"><b>${key}:</b></span><span class="text">${user[key]}</span>`;
                html += '</div>';
            });
        }

        // render profile content
        document.getElementById('profile-content').innerHTML = html;
    }).catch(function  (error)  {
        hideLoading();
        console.error(error);
    });
}
window.onload = isLoggedIn;