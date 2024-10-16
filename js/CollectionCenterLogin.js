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
                let manager_name = encodeURIComponent(data.manager_name);
                let id = encodeURIComponent(data.id);
                window.location.href = '../CollectingCenter.html?manager_name='+manager_name+'&id='+id;
            } else {
                document.getElementById('result').innerHTML = "invalid UserId or Password";
            }
        }
    })
});