const urlParams = new URLSearchParams(window.location.search);
const place = urlParams.get('location');
const id = urlParams.get('id');

// Update the user name and title safely
document.getElementById('UserName').textContent = "Collection centre at " + place;
document.getElementById('title').textContent = "EcoSpark | " + place;

// Variables to store the data and filter states
let allItems = [];
let filteredItems = [];

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
    items.forEach(function(item) {
        const card = createCard(item.name, item.price);
        cardContainer.appendChild(card);
    });
}

// Filter items based on search and price
function applyFilters() {
    const searchQuery = document.getElementById('searchInput').value.toLowerCase();
    const minPrice = parseInt(document.getElementById('minprice').value);
    const maxPrice = parseInt(document.getElementById('maxprice').value);

    filteredItems = allItems.filter(function(item) {
        const matchesSearch = item.name.toLowerCase().includes(searchQuery);
        const withinPriceRange = item.price >= minPrice && item.price <= maxPrice;
        return matchesSearch && withinPriceRange;
    });

    renderItems(filteredItems);
}

function searchItems() {
    const searchQuery = document.getElementById('searchInput').value.toLowerCase();

    filteredItems = allItems.filter(function(item) {
        const matchesSearch = item.name.toLowerCase().includes(searchQuery);
        return matchesSearch;
    });

    renderItems(filteredItems);
}

function sellItems()
{
    $.ajax({
        type: 'POST',
        url: '../php/UpdateSellCount.php',
        data: { id: id },
        success : function(data)
        {
           if(data==true)
            console.alert("Selling Request Sent Successfully");
           else
           console.alert("There was error on sending request");
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
            console.log(minPrice+" "+maxPrice);
            document.getElementById('min').innerHTML = "Mininum : ₹";
            document.getElementById('max').innerHTML = "";
            document.getElementById('minprice').min = minPrice;
            document.getElementById('maxprice').max=maxPrice;
            document.getElementById('minprice').max= maxPrice;
            document.getElementById('maxprice').min=minPrice;
            document.getElementById('minprice').value = minPrice;
            document.getElementById('maxprice').value=maxPrice;
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

document.getElementById('applybtn').addEventListener('click',applyFilters);
// Dynamically update min/max price fields based on the range sliders
document.getElementById('firsthalf').addEventListener('input', function() {
    document.getElementById('min').value = this.value;
});
document.getElementById('secondhalf').addEventListener('input', function() {
    document.getElementById('max').value = this.value;

document.getElementById('sell').addEventListener('click',sellItems);
});
