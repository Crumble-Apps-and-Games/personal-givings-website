url = new URL(window.location.href)

if (url.searchParams.get("error")) {
    var errorMessage = url.searchParams.get("error")

    if (errorMessage == "signInFailed") {
        var errorNode = document.createElement("b")
        errorNode.innerHTML = "Sign in failed. Try again."
        document.body.appendChild(errorNode)
    }
}