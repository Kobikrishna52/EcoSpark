$(document).ready(function () {
    $.ajax({
        url: '../php/sample.php',
        method: 'GET',
        dataType: 'json',
        success: function (data) {
            if (data && Array.isArray(data)) {
                data.forEach(function (item) {
                    var card = $('#seperation-card-template').clone();
                    card.removeAttr('id');
                    card.addClass('card');
                    card.show();
                    card.find('.card_details').html('<strong>Name:</strong> ' + item.name + '<br><strong>Location:</strong> ' + item.location);
                    card.on('click', function () {
                        window.location.href = 'details.html?name=' + encodeURIComponent(item.name);
                    });
                    $('#seperation-centers-cards').append(card);
                });
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.error('Failed to fetch data: ' + textStatus + ' - ' + errorThrown);
        }
    });
    $.ajax({
        url: '../php/endclients.php',
        method: 'GET',
        dataType: 'json',
        success: function (data) {
            if (data && Array.isArray(data)) {
                data.forEach(function (item) {
                    var card = $('#end-client-card-template').clone();
                    card.removeAttr('id');
                    card.addClass('card');
                    card.show();

                    card.find('.card_details').html('<strong>Name:</strong> ' + item.name + '<br><strong>Location:</strong> ' + item.location);
                    card.on('click', function () {
                        window.location.href = 'details.html?name=' + encodeURIComponent(item.name);
                    });
                    $('#end-clients-cards').append(card);
                });
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.error('Failed to fetch data: ' + textStatus + ' - ' + errorThrown);
        }
    });

    $.ajax({
        url: '../php/collectioncenters.php',
        method: 'GET',
        dataType: 'json',
        success: function (data) {
            if (data && Array.isArray(data)) {
                console.log(data);
                data.forEach(function (item) {
                    var card = $('#Collection-card-template').clone();
                    card.removeAttr('id');
                    card.addClass('card');
                    card.show();

                    card.find('.card_details').html('<strong>Location:</strong> ' + item.location);
                    card.on('click', function () {
                        window.location.href = '../UserDetails.html?location=' + encodeURIComponent(item.location) + '&id=' + encodeURIComponent(item.id) + '&uid=' + id;
                    });
                    $('#Collection-centers-cards').append(card);
                });
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.error('Failed to fetch data: ' + textStatus + ' - ' + errorThrown);
        }
    });
    const urlParams = new URLSearchParams(window.location.search);
    const manager = urlParams.get('manager_name');
    const id = urlParams.get('id');
    console.log("From detail" + id);
    document.getElementById('cc_name').innerHTML = manager;
    $.ajax({
        url: '../php/getSellCount.php',
        method: 'POST',
        data: { id: id },
        success: function (data) {
            console.log(data.count);
            if (data.status == true)
                document.getElementById('sellCount').innerHTML = data.count;
            else
                console.log('failed');
        },
        error: function () {
            console.log("hello");
        },
    });

    $.ajax({
        url: '../php/getBuyCount.php',
        method: 'POST',
        data: { id: id },
        success: function (data) {
            console.log(data.count);
            if (data.status == true) {
                document.getElementById('buyCount').innerHTML = data.count;
            }
            else
                console.log('failed');
        },
        error: function () {
            console.log("hello");
        },
    });
});




