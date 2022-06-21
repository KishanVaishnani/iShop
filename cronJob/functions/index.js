const functions = require("firebase-functions");
const firebase = require("firebase-admin");
firebase.initializeApp()
var firestore = firebase.firestore()

exports.resetCreditsForFreeUsers = functions.pubsub
    .schedule('0 1 * * *')
    .onRun(async (context) => {
        const shoppingCart = firestore.collection('ShoppingCart');
        shoppingCart.delete();
        return null;
    })