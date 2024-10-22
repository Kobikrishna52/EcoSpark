urlParams = new URLSearchParams(window.location.search);
id = urlParams.get('id');
buyreq = document.getElementById('buyreq');
sellreq = document.getElementById('sellreq');
buyCount = document.getElementById('buyCount');
sellCount = document.getElementById('sellCount');
buyreq.addEventListener('click', () => {
    sellreq.classList.remove('selected');
    buyreq.classList.add('selected');
    buy_requests.innerHTML = "";
    $.ajax({
        method: 'POST',
        data: { id: id },
        url: '../php/getRequestsforBuy.php',
        success: function (data) {
            console.log(data);
            data.forEach((item) => {
                if (item.status == "requested") {
                    console.log("requested " + item.id + " " + item.items.length);
                    createCardBuy(item.id, item.items.length, item.district, item.pincode);  // Updated function name to createCard
                }
            });
        }
    });
});

sellreq.addEventListener('click', () => {
    buyreq.classList.remove('selected');
    sellreq.classList.add('selected');
    buy_requests.innerHTML = "";
    $.ajax({
        method: 'POST',
        data: { id: id },
        url: '../php/getRequeststoSell.php',
        success: function (data) {
            console.log(data);
            data.forEach((item) => {
                if (item.status == "requested") {
                    console.log("requested " + item.id);
                    createCardSell(id, item.district, item.pincode);  // Updated function name to createCard
                }
            });
        }
    });
});

const buy_requests = document.getElementById('display-requests');

function createCardBuy(id, len, district, pincode) {
    console.log("id = " + id);

    // Create a card div
    const card = document.createElement('div');
    card.className = 'request-card'; // Add a class for styling (optional)
    // Spacing between cards

    // Add ID to the card
    card.innerHTML = `<p class="id-display">Requested ${len} items from ${district}, ${pincode}</p>`;

    // Create an "Approve" div
    const approveDiv = document.createElement('div');
    approveDiv.className = 'approve-btn';
    approveDiv.innerText = "Approve";
    approveDiv.style.cursor = "pointer"; // Change cursor to pointer
    // Underline to indicate it's clickable

    // Add click event listener
    approveDiv.addEventListener('click', function () {
        console.log("Approved ID: " + id);
        $.ajax({
            method: 'POST',
            data: { id: id },
            url: '../php/UpdateStatusBuy.php',
            success: function (data) {
                console.log(data);
            }
        });// Log the ID
        buy_requests.removeChild(card);
        buyCount.textContent--; // Remove the card from display
    });

    // Append the "Approve" div to the card
    card.appendChild(approveDiv);

    // Append the card to the display area
    buy_requests.appendChild(card);
}

function createCardSell(id, district, pincode) {
    console.log("id = " + id);

    // Create a card div
    const card = document.createElement('div');
    card.className = 'request-card'; // Add a class for styling (optional)
    // Spacing between cards

    // Add ID to the card
    card.innerHTML = `<p class="id-display">Request from ${district} , ${pincode}</p>`;

    // Create an "Approve" div
    const approveDiv = document.createElement('div');
    approveDiv.className = 'approve-btn';
    approveDiv.innerText = "Approve";
    approveDiv.style.cursor = "pointer"; // Change cursor to pointer
    // Underline to indicate it's clickable

    // Add click event listener
    approveDiv.addEventListener('click', function () {
        console.log("Approved ID: " + id);
        $.ajax({
            method: 'POST',
            data: { id: id },
            url: '../php/UpdateStatusSell.php',
            success: function (data) {
                console.log(data);
            }
        });
        // Log the ID
        buy_requests.removeChild(card);
        sellCount.textContent--;  // Remove the card from display
    });

    // Append the "Approve" div to the card
    card.appendChild(approveDiv);

    // Append the card to the display area
    buy_requests.appendChild(card);
}

$.ajax({
    method: 'POST',
    data: { id: id },
    url: '../php/getRequestsforBuy.php',
    success: function (data) {
        console.log(data);
        data.forEach((item) => {
            if (item.status == "requested") {
                console.log("requested " + item.id + " " + item.items.length);
                createCardBuy(item.id, item.items.length, item.district, item.pincode);  // Updated function name to createCard
            }
        });
    }
});