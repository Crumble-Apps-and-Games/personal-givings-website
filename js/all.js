function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

if (getParameterByName("message") != null) {
    var message = getParameterByName("message")

    if (message == "signInFailed") {
        var errorNode = document.createElement("b")
        errorNode.innerHTML = "Sign in failed. Try again."
        document.body.appendChild(document.createElement("br"))
        document.body.appendChild(errorNode)
    } else if (message == "signedOutSuccessfully") {
        var errorNode = document.createElement("b")
        errorNode.innerHTML = "Signed out successfully. You may now close this window"
        document.body.appendChild(document.createElement("br"))
        document.body.appendChild(errorNode)
    }
}