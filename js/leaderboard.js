
// Fetch data from getAllSellRequests.php using AJAX
function fetchSellRequests() {
    return $.ajax({
        url: '../php/getAllSellRequests.php',
        method: 'POST',
        success: function (data) {
            return data;
        },
        error: function (xhr, status, error) {
            console.error('Error fetching sell requests:', error);
        }
    });
}

// Fetch data from getAllBuyRequests.php using AJAX
function fetchBuyRequests() {
    return $.ajax({
        url: '../php/getAllBuyRequests.php',
        method: 'POST',
        success: function (data) {
            return data;
        },
        error: function (xhr, status, error) {
            console.error('Error fetching buy requests:', error);
        }
    });
}

// Generate the leaderboard based on the fetched data and selected filter
function generateLeaderboard(filterBy, filterValue) {
    $.when(fetchSellRequests(), fetchBuyRequests()).done(function (sellRequests, buyRequests) {
        const pointsTable = {};

        // Process sell requests (2 points for each occurrence of an id with status "requested")
        sellRequests[0].forEach(sellRequest => {
            const id = sellRequest.id;
            const status = sellRequest.status;
            if (status === "requested" && sellRequest[filterBy] === filterValue) {
                if (!pointsTable[id]) {
                    pointsTable[id] = 0;  // Initialize points for new IDs
                }
                pointsTable[id] += 2;  // Add 2 points for each sell request
            }
        });

        // Process buy requests (1 point per item for each id with status "requested")
        buyRequests[0].forEach(buyRequest => {
            const id = buyRequest.id;
            const status = buyRequest.status;
            const itemsCount = buyRequest.items.length;  // Assuming 'items' is an array
            if (status === "requested" && buyRequest[filterBy] === filterValue) {
                if (!pointsTable[id]) {
                    pointsTable[id] = 0;  // Initialize points for new IDs
                }
                pointsTable[id] += itemsCount;  // Add 1 point for each item in buy requests
            }
        });

        // Create an array from the pointsTable object for sorting
        const leaderboard = Object.entries(pointsTable).map(([id, points]) => {
            return { id, points };
        });

        // Sort the leaderboard based on points (highest to lowest)
        leaderboard.sort((a, b) => b.points - a.points);

        // Display the leaderboard in the console
        console.log("Leaderboard for " + filterBy + ": " + filterValue);
        leaderboard.forEach(entry => {
            console.log(`ID: ${entry.id}, Points: ${entry.points}`);
        });
    });
}
urlParams = new URLSearchParams(window.location.search);
uid = urlParams.get('id');
let state = '';
let district = '';
let pincode = '';
$.ajax({
    url: '../php/UserProfile.php',
    type: 'POST',
    data: { id: uid },
    success: function (response) {
        if (response.error) {
            console.log(response.error);
        } else {
            state = response.data.state;
            pincode = response.data.pincode;
            district = response.data.district;
            generateLeaderboard('state', state);
        }
    },
    error: function () {
        console.log('An error occurred while fetching user information.');
    }
}); // Get the selected value (pincode, state, district)  // Ask for filter value

// Listen for changes in the dropdown and regenerate the leaderboard
$('#leader').change(function () {
    const selectedFilter = $(this).val();
    filterValue = '';
    if (selectedFilter == 'state')
        filterValue = state;
    else if (selectedFilter == 'pincode')
        filterValue = pincode;
    else if (selectedFilter == 'district')
        filterValue = district;
    if (filterValue) {
        generateLeaderboard(selectedFilter, filterValue);  // Regenerate the leaderboard based on the filter
    } else {
        console.log("No filter value entered");
    }
});

// Initial leaderboard generation with no filter
// Default to no filter

