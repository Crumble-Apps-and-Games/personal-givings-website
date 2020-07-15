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

expressApp.listen(PORT)

expressApp.get('/', function (req, res) {
    res.sendFile("index.html")
})

expressApp.post('/signin', function (req, res) {
    var fwoNumber = req.body.fwo_input

    firebase.auth().signInWithEmailAndPassword(`${fwoNumber}@example.com`, req.body.pin_input).catch(function(error) {
        var errorCode = error.code
        var errorMessage = error.message

        res.redirect("/pages/index.html?error=signInFailed")
    })
})

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        
    } else {
        // user signed out
    }
})