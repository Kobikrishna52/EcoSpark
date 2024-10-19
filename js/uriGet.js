function getQueryParameter(name) {
    urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}



window.onload = function () {
    // Set the header name based on the query parameter
    const cardName = getQueryParameter('name');
    if (cardName) {
        document.getElementById('UserName').innerText = cardName;
    }
}

