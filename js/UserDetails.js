urlParams = new URLSearchParams(window.location.search);
const place = urlParams.get('location');
uid = urlParams.get('uid');
id = urlParams.get('id');
console.log('here in userDetails ' + uid);

// Update the user name and title safely
document.getElementById('UserName').innerHTML = "&nbsp;" + place;
document.getElementById('title').textContent = "EcoSpark | " + place;

// Variables to store the data and filter states
let allItems = [];
let filteredItems = [];
let selectedItems = []; // To store selected items
let isSelecting = false;

let pincode = "";
let district = "";
let state = "";

// Function to create and add cards to the card container
function createCard(name, price) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.innerHTML =
        `<div class="item_name">
    ${name.charAt(0).toUpperCase() + name.slice(1)}
    </div>
    <div class="item_price">
        ₹${price}
    </div>
    `;
    return card;
}

// Render items in the card container
function renderItems(items) {
    const cardContainer = document.getElementById('cardContainer');
    cardContainer.innerHTML = ''; // Clear current items
    items.forEach(function (item) {
        const card = createCard(item.name, item.price);
        cardContainer.appendChild(card);
    });
}

// Filter items based on search and price
function applyFilters() {
    const searchQuery = document.getElementById('searchInput').value.toLowerCase();
    const minPrice = parseInt(document.getElementById('minprice').value);
    const maxPrice = parseInt(document.getElementById('maxprice').value);

    filteredItems = allItems.filter(function (item) {
        const matchesSearch = item.name.toLowerCase().includes(searchQuery);
        const withinPriceRange = item.price >= minPrice && item.price <= maxPrice;
        return matchesSearch && withinPriceRange;
    });

    renderItems(filteredItems);
}

function searchItems() {
    const searchQuery = document.getElementById('searchInput').value.toLowerCase();

    filteredItems = allItems.filter(function (item) {
        const matchesSearch = item.name.toLowerCase().includes(searchQuery);
        return matchesSearch;
    });

    renderItems(filteredItems);
}

// Function to check previous buy requests before proceeding with a new buy request
function checkPreviousBuyRequests(callback) {
    $.ajax({
        url: '../php/getRequestsforBuy.php',
        type: 'POST',
        data: { id: id }, // Send the ID as data
        success: function (response) {
            if (response.length === 0) {
                // No previous requests found
                callback(true);
            } else {
                // Check if any document has status 'requested'
                const hasPendingRequest = response.some(doc => doc.status == 'requested');
                if (hasPendingRequest) {
                    alert("Your previous buy request is still not approved.");
                    callback(false);
                } else {
                    callback(true);
                }
            }
        },
        error: function () {
            console.log('An error occurred while checking previous buy requests.');
            callback(false);
        }
    });
}

// Function to check previous sell requests before proceeding with a new sell request
function checkPreviousSellRequests(callback) {
    $.ajax({
        url: '../php/getRequeststoSell.php',
        type: 'POST',
        data: { id: id }, // Send the ID as data
        success: function (response) {
            if (response.length === 0) {
                // No previous requests found
                callback(true);
            } else {
                // Check if any document has status 'requested'
                const hasPendingRequest = response.some(doc => doc.status == 'requested');
                if (hasPendingRequest) {
                    alert("Your previous sell request is still not approved.");
                    callback(false);
                } else {
                    callback(true);
                }
            }
        },
        error: function () {
            console.log('An error occurred while checking previous sell requests.');
            callback(false);
        }
    });
}
function canBuyorSell(callback) {
    $.ajax({
        url: '../php/UserProfile.php',
        type: 'POST',
        data: { id: uid },
        success: function (response) {
            if (response.error) {
                console.log(response.error);
                callback(false); // Call the callback with 'false'
            } else {
                console.log(response.data);
                // Check if any profile field is incomplete
                if (response.data.fname == " " || response.data.lname == " " || response.data.gender == "-" || response.data._id == "" || response.data.mobile == 0 || response.data.dob == "" || response.data.pincode == "" || response.data.address == "" || response.data.state == "-" || response.data.district == "-") {
                    callback(false); // Profile is incomplete
                } else {
                    callback(true); // Profile is complete
                }
            }
        },
        error: function () {
            console.log('An error occurred while fetching user information.');
            callback(false); // In case of error, treat as incomplete
        }
    });
}
// Function to update the order
function updateOrder(selectedItems) {
    console.log('here inside userDetails ' + uid);
    $.ajax({
        type: 'POST',
        url: '../php/UpdateBuyCount.php',
        data: { items: selectedItems, id: id, uid: uid, pincode: pincode, state: state, district: district, location: place },
        success: function (data) {
            console.log(data);
        },
        error: function () {
            alert("You can't make a Buy request while your previous request is not approved.");
        }
    });
}

// Updated Buy button handler
function toggleBuyButton() {
    const buyButton = document.querySelector('.buy');
    canBuyorSell(function (isProfileComplete) {
        if (!isProfileComplete) {
            alert('Profile must be completed before buying.');
            return; // Exit if the profile is incomplete
        }

        // Check for previous buy requests before proceeding
        checkPreviousBuyRequests(function (canProceed) {
            if (!canProceed) return; // Exit if a previous buy request is still pending

            // Profile is complete and no pending buy requests, proceed with toggling the buy button
            if (isSelecting) {
                // When clicking "Confirm"
                buyButton.textContent = 'Buy';
                isSelecting = false;

                // Log selected items in the console
                console.log('Selected Items:', selectedItems);

                updateOrder(selectedItems);
                // Reset selected items after confirming
                selectedItems = [];

                // Reset the card's CSS properties
                const cards = document.querySelectorAll('.card');
                cards.forEach(card => {
                    card.classList.remove('selected'); // Remove the selected class from all cards
                });
            } else {
                // When clicking "Buy"
                buyButton.textContent = 'Confirm';
                isSelecting = true;

                // Make the cards selectable
                const cards = document.querySelectorAll('.card');
                cards.forEach(card => {
                    card.addEventListener('click', function () {
                        if (isSelecting) {
                            toggleSelectCard(card);
                        }
                    });
                });
            }
        });
    });
}

// Updated Sell button handler
function sellItems() {
    canBuyorSell(function (isProfileComplete) {
        if (!isProfileComplete) {
            alert('Profile must be completed before selling.');
            return; // Exit if the profile is incomplete
        }

        // Check for previous sell requests before proceeding
        checkPreviousSellRequests(function (canProceed) {
            if (!canProceed) return; // Exit if a previous sell request is still pending

            // Profile is complete and no pending sell requests, proceed with the sell operation
            $.ajax({
                type: 'POST',
                url: '../php/UpdateSellCount.php',
                data: { id: id, uid: uid, pincode: pincode, state: state, district: district },
                success: function (data) {
                    if (data.status == true) {
                        alert("Selling Request Sent Successfully");
                    } else {
                        alert("Your previous request is still in process");
                    }
                },
                error: function () {
                    console.log("An error occurred while processing your sell request.");
                }
            });
        });
    });
}

// Function to toggle card selection
function toggleSelectCard(card) {
    let itemName = card.querySelector('.item_name').textContent;
    itemName = itemName.replace(/\s{2,}/g, '');
    let itemPrice = card.querySelector('.item_price').textContent;
    itemPrice = itemPrice.replace(/\s{2,}/g, '');
    itemPrice = itemPrice.replace('₹', '');

    // Toggle the 'selected' class
    card.classList.toggle('selected');

    // Add or remove item from the selectedItems array
    if (card.classList.contains('selected')) {
        selectedItems.push({ name: itemName, price: itemPrice });
    } else {
        selectedItems = selectedItems.filter(item => item.name !== itemName);
    }
}

// Make the AJAX request to get items
$.ajax({
    type: 'POST',
    url: '../php/CollectionCentreItems.php',
    data: { id: id },
    success: function (data) {
        try {
            // Parse the response into JSON format
            allItems = data; // Store all items initially
            filteredItems = data; // Initially display all items
            renderItems(filteredItems);

            // Set initial values for price range filter
            const prices = data.map(item => item.price);
            const minPrice = Math.min(...prices);
            const maxPrice = Math.max(...prices);
            document.getElementById('min').innerHTML = "Minimum: ₹" + minPrice;
            document.getElementById('max').innerHTML = "";
            document.getElementById('minprice').min = minPrice;
            document.getElementById('maxprice').max = maxPrice;
            document.getElementById('minprice').max = maxPrice;
            document.getElementById('maxprice').min = minPrice;
            document.getElementById('minprice').value = minPrice;
            document.getElementById('maxprice').value = maxPrice;
        } catch (e) {
            console.error("Error parsing JSON response:", e);
        }
    },
    error: function (xhr, status, error) {
        console.error("AJAX Error:", error);
    }
});

$.ajax({
    url: '../php/UserProfile.php',
    type: 'POST',
    data: { uid: uid },
    success: function (response) {
        pincode = response.pincode;
        state = response.state;
        district = response.district;
    },
    error: function () {
        console.error('Error occurred');
    }
});

// Attach the updated handlers to the Buy and Sell buttons
document.querySelector('.buy').addEventListener('click', toggleBuyButton);
document.getElementById('sell').addEventListener('click', sellItems);

// Attach filter logic to the Apply Filter button
document.getElementById('searchbtn').addEventListener('click', searchItems);
document.getElementById('applybtn').addEventListener('click', applyFilters);

