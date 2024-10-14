const form = document.querySelector('form');
form.addEventListener('submit', function (event) {
    event.preventDefault();
});

let isEmailValid = false;

function validateEmail() {
    const email = $("#mail").val();
    const mailStatus = document.getElementById('mail-status');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email === "") {
        mailStatus.innerHTML = "Email is required.";
        isEmailValid = false;
        return;
    } else if (!emailRegex.test(email)) {
        mailStatus.innerHTML = "Invalid email format";
        isEmailValid = false;
        return;
    }
    else{
    $.ajax({
        type: 'POST',
        url: '../php/UserIdvalidate.php',
        data: { mail: email },
        success: function (data) {
            if (data == true) {
                isEmailValid = false;
                mailStatus.innerHTML = "User with this mailId already exists";
            } else {
                mailStatus.innerHTML = "";
                isEmailValid = true;
            }
        },
        error: function () {
            mailStatus.innerHTML = "An error occurred while validating the email.";
            isEmailValid = false;
        }
    });
}

}

$("#setpassword, #confirmpassword").on('input', function () {
    validatePasswords();
});

$("#mail").on('input', function () {
    validateEmail();
});

$("#sbt-btn").click(function () {
    // Clear previous status messages
    document.getElementById('mail-status').innerHTML = "";
    document.getElementById('password-status').innerHTML = "";

    const fname = $("#fname").val();
    const lname = $("#lname").val();
    const id = $("#mail").val();
    const setpass = $("#setpassword").val();
    const confirmpass = $("#confirmpassword").val();

    // Check if all fields are filled
    if (!fname || !lname || !id || !setpass || !confirmpass) {
        document.getElementById('password-status').innerHTML = "All fields must be filled.";
        return;
    }

    // Check if passwords match
    if (setpass !== confirmpass) {
        document.getElementById('password-status').innerHTML = "Passwords do not match.";
        return;
    }

    // Validate password strength
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    if (!passwordRegex.test(setpass)) {
        document.getElementById('password-status').innerHTML = "Password must contain at least:<br> one special character<br>one uppercase letter<br>one lowercase letter<br>one digit<br>and be at least 8 characters long.";
        return;
    }

    // Check if email is valid before proceeding
    if (!isEmailValid) {
        document.getElementById('mail-status').innerHTML = "Please enter a valid email.";
        return;
    }

    // Proceed with user registration
    $.ajax({
        type: 'POST',
        url: '../php/UserRegister.php',
        data: { mail: id, password: confirmpass, fname: fname, lname: lname },
        success: function (data) {
            console.log(data);
            window.location.href = '../UserLogin.html';
        },
        error: function () {
            document.getElementById('password-status').innerHTML = "An error occurred during registration.";
        }
    });
});

function validatePasswords() {
    const setPassword = $("#setpassword").val();
    const confirmPassword = $("#confirmpassword").val();
    const passwordStatus = document.getElementById('password-status');

    passwordStatus.innerHTML = "";

    if (setPassword !== confirmPassword) {
        passwordStatus.innerHTML = "Passwords do not match.";
        return;
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    if (!passwordRegex.test(setPassword)) {
        passwordStatus.innerHTML = "Password must contain at least:<br> one special character<br>one uppercase letter<br>one lowercase letter<br>one digit<br>and be at least 8 characters long.";
    }
}
