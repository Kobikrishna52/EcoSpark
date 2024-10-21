$(document).ready(function () {
    const token = localStorage.getItem('jwt_token'); // Get JWT from localStorage

    $.ajax({
        type: 'POST',
        url: 'php/protectedEndpoint.php',
        headers: {
            'Authorization': 'Bearer ' + token // Add token in Authorization header
        },
        success: function (response) {
            console.log(response);
        },
        error: function (jqXHR) {
            if (jqXHR.status === 401) {
                alert('Unauthorized access. Please login.');
            }
        }
    });
});
