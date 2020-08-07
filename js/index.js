url = new URL(window.location.href)

if (url.searchParams.get("message")) {
    var message = url.searchParams.get("message")

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

var firebaseConfig = {
    apiKey: "AIzaSyD8tpGXe_T2dBda_nmDvw-yBU2Nei_FnQQ",
    authDomain: "hhpc-weekly-givings-website.firebaseapp.com",
    databaseURL: "https://hhpc-weekly-givings-website.firebaseio.com",
    projectId: "hhpc-weekly-givings-website",
    storageBucket: "hhpc-weekly-givings-website.appspot.com",
    messagingSenderId: "861520292247",
    appId: "1:861520292247:web:4392f3600045bdeac7fcd2",
    measurementId: "G-0ZX7NWDH4Z"
}

firebase.initializeApp(firebaseConfig)

var database = firebase.database()

function signIn() {
    firebase.auth().signInWithEmailAndPassword(`${document.getElementById("fwo_input").value}@example.com`, document.getElementById("pin_input").value).catch(function(error) {
        var errorCode = error.code
        var errorMessage = error.message

        window.location.href = "./index.html?message=signInFailed"
        return
    })

    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            window.location.href = "./viewfunds.html"
            return
        } else {
            // user signed out
        }
    })
}