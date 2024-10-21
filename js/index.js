document.getElementById('toUser').addEventListener('click', () => {
    window.location.href = 'UserLogin.html';
});

document.getElementById('toCC').addEventListener('click', () => {
    window.location.href = 'CollectionCenterLogin.html';
});

$(document).ready(function () {
    $('#login-form').submit(function (event) {
        event.preventDefault();

        const email = $('#mail').val();
        const password = $('#password').val();

        $.ajax({
            type: 'POST',
            url: 'php/UserLogin.php',
            data: { mail: email, password: password },
            success: function (response) {
                const data = JSON.parse(response);

                if (data.status === 'success') {
                    // Store the token in localStorage
                    localStorage.setItem('jwt_token', data.token);
                    $('#result').html('Login successful!');
                } else {
                    $('#result').html('Invalid email or password');
                }
            },
            error: function () {
                $('#result').html('An error occurred during login');
            }
        });
    });
});