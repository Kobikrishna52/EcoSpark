urlParams = new URLSearchParams(window.location.search);
fname = urlParams.get('fname');
lname = urlParams.get('lname');

console.log('First Name:', fname);
console.log('Last Name:', lname);

document.getElementById('UserName').innerHTML = "Hi, " + fname + " " + lname;

let main = document.getElementById('search-main');
let res = document.getElementById('search-results');
let morebtn = document.getElementById('cont');
let more = document.getElementById('more');
let profilebtn = document.getElementById('profile-btn');
let profile = document.getElementById('showprofile');
let isSelected = false;
let isprofileSelected = false;

// Show the results when the search input is focused
main.addEventListener('focus', () => {
    res.style.display = "block";
});

// Hide the results when the input loses focus
main.addEventListener('blur', () => {
    res.style.display = "none";
});

morebtn.addEventListener('click', () => {
    if (isSelected) {
        more.style.display = "none";
        isSelected = false;
    } else {
        more.style.display = "block";
        isSelected = true;
    }
});

profilebtn.addEventListener('click', () => {
    if (isprofileSelected) {
        profile.style.display = "none";
        isprofileSelected = false;
    } else {
        profile.style.display = "block";
        isprofileSelected = true;
    }
});

// Close profile and more divs when clicking outside of them
document.addEventListener('click', (event) => {
    // Check if the click is outside of the 'more' div and button
    if (!more.contains(event.target) && !morebtn.contains(event.target)) {
        more.style.display = "none";
        isSelected = false;
    }

    // Check if the click is outside of the 'profile' div and button
    if (!profile.contains(event.target) && !profilebtn.contains(event.target)) {
        profile.style.display = "none";
        isprofileSelected = false;
    }
});
