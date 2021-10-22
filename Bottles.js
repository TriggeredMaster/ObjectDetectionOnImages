img = "";
status = "";
list_of_objects = [];

function preload() {
    img = loadImage('Bottles.jpg'); //this is to load the dog cat image
}

function setup() {
    canvas = createCanvas(640, 420); //Code to create a canvas
    canvas.center(); //this is to center the canvas
    objectDetector = ml5.objectDetector("cocossd", modelLoaded); //this is to call the function and the cocossd in a variable
    document.getElementById("status").innerHTML = "Status : Detecting Objects"; //this is used to Show the status Detecting in a label
}

function modelLoaded() {
    console.log("Model Loaded");
    status = true;
    objectDetector.detect(img, gotResult);
}

function Back() {
    window.location.replace("index.html");
}


function draw() {
    image(img, 0, 0, 640, 420); //this is to identify that img is the webcam/main picture

    // //Dog Code Starts here

    // fill("#FF0000"); //this is to make the rectangle thingy
    // text("Dog", 45, 75); //this is to add the text
    // noFill(); //this is done so that the inner space would be transparent 
    // stroke("#FF0000"); //this is done to give the outline of the rectangle
    // rect(30, 60, 450, 350); //this is done to make the rectangle with outline and inner space transparent

    // //Dog Code Ends here

    // //Cat Code Starts here

    // fill("#FF0000");
    // text("Cat", 320, 120);
    // noFill();
    // stroke("#FF0000");
    // rect(300, 90, 270, 320);

    //Cat Code Ends here

    if (status != "") {
        var i;
        for (i = 0; i < list_of_objects.length; i++) {
            document.getElementById("status").innerHTML = "Status : Object Detected";

            fill("#FF0000");
            percent = floor(list_of_objects[i].confidence * 100);
            text(list_of_objects[i].label + " " + percent + "%", list_of_objects[i].x + 15, list_of_objects[i].y + 15);
            noFill();
            stroke("#FF0000");
            rect(list_of_objects[i].x, list_of_objects[i].y, list_of_objects[i].width, list_of_objects[i].height);
        }
    }
}


function gotResult(error, results) {
    if (error) {
        console.log(error);
    }
    console.log(results);
    list_of_objects = results;
}