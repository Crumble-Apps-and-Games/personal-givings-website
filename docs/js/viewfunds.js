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
        var churchCode = getParameterByName("church")
        firebase.database().ref(churchCode + "/users/" + userID).once("value").then(function(snapshot) {
            userData = snapshot.val()

            document.getElementById("fwo_number_h1").innerHTML += userData.fwo_number

            document.getElementById("fwo_amount_td").innerHTML += userData.fwo_givings
            document.getElementById("fwo_amount_td").innerHTML = document.getElementById("fwo_amount_td").innerHTML.replace("undefined", "0.00")
            document.getElementById("dev_amount_td").innerHTML += userData.development_givings
            document.getElementById("dev_amount_td").innerHTML = document.getElementById("dev_amount_td").innerHTML.replace("undefined", "0.00")
            document.getElementById("ua_amount_td").innerHTML += userData.united_appeal_givings
            document.getElementById("ua_amount_td").innerHTML = document.getElementById("ua_amount_td").innerHTML.replace("undefined", "0.00")
            document.getElementById("wd_amount_td").innerHTML += userData.world_development_givings
            document.getElementById("wd_amount_td").innerHTML = document.getElementById("wd_amount_td").innerHTML.replace("undefined", "0.00")
            document.getElementById("lp_amount_td").innerHTML += userData.lambeg_appeal_givings
            document.getElementById("lp_amount_td").innerHTML = document.getElementById("lp_amount_td").innerHTML.replace("undefined", "0.00")
            document.getElementById("total_amount_td").innerHTML += userData.total_givings
            document.getElementById("total_amount_td").innerHTML = document.getElementById("total_amount_td").innerHTML.replace("undefined", "0.00")

            firebase.database().ref(churchCode + "/date/dateValue").once("value").then(function(snapshot2) {
                document.getElementById("data_h2").innerHTML += snapshot2.val()

                document.getElementById("show_on_load_div").style.visibility = "visible"
                document.getElementById("loading_p").remove()
            })
        })
        return
    } else {
        // user signed out
    }
})