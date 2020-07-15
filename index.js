var firebase = require("firebase/app")

require("firebase/auth")
require("firebase/database")

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

var express = require("express")
var expressApp = express()

const PORT = process.env.PORT || 5000

expressApp.use(express.static("public"))
expressApp.use(express.urlencoded())
expressApp.set("view engine", "pug")

expressApp.listen(PORT)

expressApp.get('/', function (req, res) {
    res.sendFile("index.html")
})

expressApp.post('/signin', function (req, res) {
    var fwoNumber = req.body.fwo_input

    firebase.auth().signInWithEmailAndPassword(`${fwoNumber}@example.com`, req.body.pin_input).catch(function(error) {
        var errorCode = error.code
        var errorMessage = error.message

        res.redirect("/?error=signInFailed")
        return
    })

    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            res.redirect("/viewfunds")
            return
        } else {
            // user signed out
        }
    })
})

expressApp.get('/viewfunds', function (req, res) {
    var userId = firebase.auth().currentUser.uid

    var fwoNumber
    var fwoAmount
    var developmentAmount

    database.ref(`/users/${userId}`).once("value").then(function(snapshot) {
        fwoNumber = snapshot.val().fwo_number
        fwoAmount = snapshot.val().fwo_givings
        developmentAmount = snapshot.val().development_givings
    })

    res.render("./viewfunds",  { "fwo_number": fwoNumber, "fwo_amount": fwoAmount, "development_amount": developmentAmount })
})