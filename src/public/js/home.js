function isLoggedIn () {
    if (!localStorage.key('APP_TOKEN')) {
        window.location.href = '/login';
        return;
    }
    let token = localStorage.getItem('APP_TOKEN');
    let header = new Headers({
        'Cache-Control': 'no-cache',
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
    });
    showLoading();
    fetch('/users', {
        method: 'GET',
        headers: header,
    }).then(function (response)  {
        hideLoading();
        return response.text();
    }).then(function (text)  {
        const response = JSON.parse(text);
        let html = '';

        response.users.forEach(user => {
            html += "<tr>";
            html += "<td><a href=/profile/"+ user.id + ">" + user.id + "</a></td>";
            html += "<td>"+ user.name +"</td>";
            html += "<td>"+ user.email +"</td>";
            html += "</tr>"
        });

        document.getElementById('table-body').innerHTML = html;
    }).catch(function  (error)  {
        hideLoading();
        console.error(error);
    });
}
window.onload = isLoggedIn;