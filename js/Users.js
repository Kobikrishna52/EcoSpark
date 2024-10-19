const urlParams = new URLSearchParams(window.location.search);
const fname = urlParams.get('fname');
const lname = urlParams.get('lname');

console.log('First Name:', fname);
console.log('Last Name:', lname);

document.getElementById('UserName').innerHTML = "Hi, " + fname + " " + lname;

let main = document.getElementById('search-main');
let res = document.getElementById('search-results');
let morebtn = document.getElementById('cont');
let more = document.getElementById('more');
isSelected = false;
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
    }
    else {
        more.style.display = "block";
        isSelected = true;
    }
});
isprofileSelected = false;
let profilebtn = document.getElementById('profile-btn');
let profile = document.getElementById('showprofile');
profilebtn.addEventListener('click', () => {
    if (isprofileSelected) {
        profile.style.display = "none";
        isprofileSelected = false;
    }
    else {
        profile.style.display = "block";
        isprofileSelected = true;
    }
});