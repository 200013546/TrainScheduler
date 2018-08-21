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
    // clearInterval(updateInterval);

    // YOUR TASK!!!
    // Code in the logic for storing and retrieving the most recent user.
    // Don't forget to provide initial data to your Firebase database.
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
    // updateInterval = setInterval(updateChart, 1000 * 30);
});

$(".del-train").on("click", function (event) {
    event.preventDefault();

    // YOUR TASK!!!
    // Code in the logic for storing and retrieving the most recent user.
    // Don't forget to provide initial data to your Firebase database.
    console.log($("#button-id").val());
    console.log($(this).val());

    // name = $("#name-input").val().trim();
    // destination = $("#destination-input").val().trim();
    // firstTrain = $("#firstTrain-input").val().trim();
    // frequency = $("#frequency-input").val().trim();

    // // Code for the push
    // dataRef.ref("train").push({

    //     name: name,
    //     destination: destination,
    //     firstTrain: firstTrain,
    //     frequency: frequency,
    //     dateAdded: firebase.database.ServerValue.TIMESTAMP
    // });
});



// Firebase watcher + initial loader HINT: This code behaves similarly to .on("value")
dataRef.ref("train").on("child_added", function (childSnapshot) {

    // Log everything that's coming out of snapshot
    console.log(childSnapshot.val());
    console.log(childSnapshot.val().name);
    console.log(childSnapshot.val().destination);
    console.log(childSnapshot.val().firstTrain);
    console.log(childSnapshot.val().frequency);
    console.log(childSnapshot.val().dateAdded);

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
        " </td><td> " + tMinutesTillTrain + "</td></tr>");
    // " </td><td><button type='button' class='btn btn-danger btn-sm del-train' button_id=" + childSnapshot.val().dateAdded + "><span id='delete'>DEL</span></button></td></tr>");

    // Handle the errors
}, function (errorObject) {
    console.log("Errors handled: " + errorObject.code);
});

dataRef.ref("train").orderByChild("dateAdded").limitToLast(1).on("child_added", function (snapshot) {
    // Change the HTML to reflect
    $("#name-display").text(snapshot.val().name);
    $("#destination-display").text(snapshot.val().destination);
    $("#firstTrain-display").text(snapshot.val().firstTrain);
    $("#frequency-display").text(snapshot.val().frequency);
});

// Update table with new minutes left
// var updateInterval = setInterval(updateChart, 1000 * 60);

// Update clock
setInterval(function () {
    var currentTime = moment().format("MMM Do, YYYY hh:mm:ss A")
    $("#currentTime").html(currentTime);
}, 1000);

function removeTrain() {
    dateAdded = $("#button-id").val();
    dateAdded = $("#button-id").val();
    dateAdded = $("#button-id").val();

    //  console.log($("#button-id").val());
    console.log(this);
    console.log(dateAdded);
    console.log(dateAdded);


    // Code for the push
    // dataRef.ref("train").push({

    //     name: name,
    //     destination: destination,
    //     firstTrain: firstTrain,
    //     frequency: frequency,
    //     dateAdded: firebase.database.ServerValue.TIMESTAMP
    // });

}

// $(document).on("click", ".del-train", removeTrain);

$(document).ready(function () {
    updateChart();
});