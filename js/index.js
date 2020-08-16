if (getParameterByName("church") != null) {
    var church = getParameterByName("church")

    document.getElementById("church_input").value = church
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

var churchIDNames = {}
firebase.database().ref("idAliases").once("value").then(function(snapshot) {
    churchIDNames = snapshot.val()
})

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        firebase.database().ref("/admin/" + user.uid).once("value").then(function(snapshot) {
            if (snapshot.val()) {
                window.location.href = "./admin-index.html?church=" + snapshot.val().church
                return
            }

            document.getElementById("signing_in_p").style.visibility = "visible"
            var churchCode = user.email.split("@")[1].split(".")[0]
            window.location.href = `./viewfunds.html?church=${churchCode}`
            return
        })

        return
    } else {
        // user signed out
    }
})

function signIn() {
    firebase.auth().signInWithEmailAndPassword(`${document.getElementById("id_input").value.padStart(4, '0')}@${document.getElementById("church_input").value.toLowerCase()}.com`, document.getElementById("pin_input").value.toLowerCase() + "..").catch(function(error) {
        var errorCode = error.code
        var errorMessage = error.message

        window.location.href = "./index.html?message=signInFailed"
        return
    })
}

function churchSelectChanged() {
    switch (document.getElementById("church_input").value) {
        case "select-a-church":
            document.getElementById("id_input_label").innerHTML = "ID:"
            break;

        default:
            document.getElementById("id_input_label").innerHTML = churchIDNames[document.getElementById("church_input").value] + ":"
            break;
    }
}