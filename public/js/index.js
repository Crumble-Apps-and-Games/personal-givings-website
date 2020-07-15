url = new URL(window.location.href)

if (url.searchParams.get("message")) {
    var message = url.searchParams.get("message")

    if (message == "signInFailed") {
        var errorNode = document.createElement("b")
        errorNode.innerHTML = "Sign in failed. Try again."
        document.body.appendChild(errorNode)
    } else if (message == "signedOutSuccessfully") {
        var errorNode = document.createElement("b")
        errorNode.innerHTML = "Signed out successfully. You may now close this window"
        document.body.appendChild(errorNode)
    }
}