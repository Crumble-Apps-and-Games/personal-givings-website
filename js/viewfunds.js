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

function signOut() {
    firebase.auth().signOut().then(function() {
        window.location.href = "./index.html?message=signedOutSuccessfully"
    })
}

var fundsTable = document.getElementById("funds-table")

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        var userID = user.uid;
        firebase.database().ref("/users/" + userID).once("value").then(function(snapshot) {
            userData = snapshot.val()

            document.getElementById("fwo_number_h1").innerHTML += userData.fwo_number

            document.getElementById("fwo_amount_td").innerHTML += userData.fwo_givings
            document.getElementById("dev_amount_td").innerHTML += userData.development_givings
            document.getElementById("ua_amount_td").innerHTML += userData.united_appeal_givings
            document.getElementById("wd_amount_td").innerHTML += userData.world_development_givings
            document.getElementById("lp_amount_td").innerHTML += userData.lambeg_appeal_givings
            document.getElementById("total_amount_td").innerHTML += userData.total_givings
        })
        return
    } else {
        // user signed out
    }
})