// Initialize Firebase
var config = {
    apiKey: "AIzaSyBz-H7b5a7rmeZ-PmrfPPRegWmXCwchuW8",
    authDomain: "gegt-alan8-18.firebaseapp.com",
    databaseURL: "https://gegt-alan8-18.firebaseio.com",
    projectId: "gegt-alan8-18",
    storageBucket: "gegt-alan8-18.appspot.com",
    messagingSenderId: "868587304318"
};
firebase.initializeApp(config);

var dataRef = firebase.database();

// Initial Values
var name = "";
var destination = "";
var firstTrain = 0;
var frequency = 0;

// Capture Button Click
$("#add-train").on("click", function (event) {
    event.preventDefault();
    name = $("#name-input").val().trim();
    destination = $("#destination-input").val().trim();
    firstTrain = $("#firstTrain-input").val().trim();
    frequency = $("#frequency-input").val().trim();

    // Code for the push
    dataRef.ref("train").push({

        name: name,
        destination: destination,
        firstTrain: firstTrain,
        frequency: frequency,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
    });
});

// Update chart here
function updateChart() {
    // Clear old entris before appending new ones
    $("#train-table > tbody").empty();

    // Firebase watcher + initial loader HINT: This code behaves similarly to .on("value")
    dataRef.ref("train").on("child_added", function (childSnapshot) {
        var tFrequency = childSnapshot.val().frequency;
        var firstTime = childSnapshot.val().firstTrain;
        var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
        var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
        var tRemainder = diffTime % tFrequency;
        var tMinutesTillTrain = tFrequency - tRemainder;
        var nextTrain = moment().add(tMinutesTillTrain, "minutes");

        // full list of items to the well
        $("#train-table > tbody").append("<tr><td> " + childSnapshot.val().name +
            " </td><td> " + childSnapshot.val().destination +
            " </td><td> " + childSnapshot.val().frequency +
            " </td><td> " + moment(nextTrain).format("hh:mm A") +
            " </td><td> " + tMinutesTillTrain +
            " </td></tr>");

        // Handle the errors
    }, function (errorObject) {
        console.log("Errors handled: " + errorObject.code);
    });
}

// Update table with new minutes left
var updateInterval = setInterval(updateChart, 1000 * 60);

// Update clock
setInterval(function () {
    var currentTime = moment().format("MMM Do, YYYY hh:mm:ss A")
    $("#currentTime").html(currentTime);
}, 1000);

$(document).ready(function () {
    updateChart();
});