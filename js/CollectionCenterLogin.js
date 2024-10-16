const form = document.querySelector('form');
form.addEventListener('submit', function (event) {
    event.preventDefault();
})

$("#sbt-btn").click(function () {
    const email = $("#mail").val();
    const password = $("#password").val();
    let data = `mail=${email}&password=${password}`;
    console.log(data);
    $.ajax({
        type: 'POST',
        url: '../php/CollectionCenterLogin.php',
        data: data,
        success: function (response) {
            const data = response;
            if (data.status == 'success') {
                let fname = encodeURIComponent(data.fname);
                let lname = encodeURIComponent(data.lname);
                window.location.href = '../Users.html?fname='+fname+'&lname='+lname;
            } else {
                document.getElementById('result').innerHTML = "invalid UserId or Password";
            }
        }
    })
});