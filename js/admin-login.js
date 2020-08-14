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

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        database.ref("/admin/" + user.uid).once("value").then(function(snapshot) {
            if (!snapshot.val()) {
                firebase.auth().signOut()
                window.location.href = "./admin-login.html?message=notAdmin"
            }

            var churches = snapshot.val().churches

            if (churches) {
                window.location.href = "./admin-index.html"
            } else {
                window.location.href = "./admin-login.html?message=noAdmin"
            }
        })
        return
    } else {
        // user signed out
    }
})

function signIn() {
    firebase.auth().signInWithEmailAndPassword(document.getElementById("email_input").value, document.getElementById("password_input").value).catch(function(error) {
        var errorCode = error.code
        var errorMessage = error.message

        window.location.href = "./admin-login.html?message=signInFailed"
        return
    })
}