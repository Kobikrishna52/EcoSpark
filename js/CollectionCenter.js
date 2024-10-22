urlParams = new URLSearchParams(window.location.search);
id = urlParams.get('id');

$.ajax({
    method: 'POST',
    data: { id: id },
    url: '../php/getRequestsforBuy.php',
    success: function (data) {
        console.log(data);
        data.forEach((item) => {
            if (item.status == "requested") {
                console.log("requested " + item.id);
                createCard(item.items.length, item.district, item.pincode);  // Updated function name to createCard
            }
        });
    }
});

const buy_requests = document.getElementById('display-requests');

function createCard(id, district, pincode) {
    console.log("id = " + id);

    // Create a card div
    const card = document.createElement('div');
    card.className = 'request-card'; // Add a class for styling (optional)
    // Spacing between cards

    // Add ID to the card
    card.innerHTML = `<p class="id-display">Requested ${id} items from ${district}, ${pincode}</p>`;

    // Create an "Approve" div
    const approveDiv = document.createElement('div');
    approveDiv.className = 'approve-btn';
    approveDiv.innerText = "Approve";
    approveDiv.style.cursor = "pointer"; // Change cursor to pointer
    // Underline to indicate it's clickable

    // Add click event listener
    approveDiv.addEventListener('click', function () {
        console.log("Approved ID: " + id); // Log the ID
        buy_requests.removeChild(card); // Remove the card from display
    });

    // Append the "Approve" div to the card
    card.appendChild(approveDiv);

    // Append the card to the display area
    buy_requests.appendChild(card);
}
