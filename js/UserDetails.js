const urlParams = new URLSearchParams(window.location.search);
const place = urlParams.get('location');
const id = urlParams.get('id');

// Update the user name and title safely
document.getElementById('UserName').innerHTML = "&nbsp;" + place;
document.getElementById('title').textContent = "EcoSpark | " + place;

// Variables to store the data and filter states
let allItems = [];
let filteredItems = [];
let selectedItems = []; // To store selected items
let isSelecting = false;

// Function to create and add cards to the card container
function createCard(name, price) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.innerHTML = `
    <div class="item_name">
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

// Function to handle the Buy/Confirm button behavior
function toggleBuyButton() {
    const buyButton = document.querySelector('.buy');

    if (isSelecting) {
        // When clicking "Confirm"
        buyButton.textContent = 'Buy';
        isSelecting = false;

        // Log selected items in the console
        console.log('Selected Items:', selectedItems);

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
}

// Function to toggle card selection
function toggleSelectCard(card) {
    const itemName = card.querySelector('.item_name').textContent;
    const itemPrice = card.querySelector('.item_price').textContent;

    // Toggle the 'selected' class
    card.classList.toggle('selected');

    // Add or remove item from the selectedItems array
    if (card.classList.contains('selected')) {
        selectedItems.push({ name: itemName, price: itemPrice });
    } else {
        selectedItems = selectedItems.filter(item => item.name !== itemName);
    }
}

// Attach event listener to the Buy button
document.querySelector('.buy').addEventListener('click', toggleBuyButton);

function sellItems() {
    $.ajax({
        type: 'POST',
        url: '../php/UpdateSellCount.php',
        data: { id: id },
        success: function (data) {
            if (data == true) {
                alert("Selling Request Sent Successfully");
            } else {
                alert("There was an error on sending the request");
            }
        }
    });
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

// Attach filter logic to the Apply Filter button
document.getElementById('searchbtn').addEventListener('click', searchItems);
document.getElementById('applybtn').addEventListener('click', applyFilters);

// Dynamically update min/max price fields based on the range sliders
document.getElementById('sell').addEventListener('click', sellItems);
