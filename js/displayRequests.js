urlParams = new URLSearchParams(window.location.search);
manager = urlParams.get('manager_name');
id = urlParams.get('id');

$.ajax({
    method: 'POST',
    data: { id: id },
    url: '../php/getRequestsforBuy.php',
    success: function (data) {
        console.log(data);
        data.forEach((item) => {
            creatediv(item.id);
        });
    }
});
function creatediv(id) {
    console.log("id = " + id);
    div = document.createElement('div');
    div.classList.add('inside-content');
    div.innerHTML = id;
    buy_requests.appendChild(div);
}