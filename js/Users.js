const urlParams = new URLSearchParams(window.location.search);
const fname = urlParams.get('fname');
const lname = urlParams.get('lname');

console.log('First Name:', fname);
console.log('Last Name:', lname);

document.getElementById('UserName').innerHTML = "Hi , "+ fname +" "+lname;