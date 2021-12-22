video = ""; 
status = "";
objects = [];

function setup(){
    canvas = createCanvas(600,400);
    canvas.center();
}
function preload(){
    video = createVideo("video.mp3");
    video.hide();
}

function draw() {
    image(video, 0, 0, 600, 400);

    if(status != ""){
        objectDetector.detect(video, gotResult);

        for (i=0 ;i<objects.length; i++){
        document.getElementById("status").innerHTML = "Status : Object Detected";
        document.getElementById("num_object").innerHTML = "Nuber of objects which are detected : " + objects.length;
        fill("#e6655e");
        percent = floor(objects[i].confidence * 100); 
        console.log(percent);
        text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
        noFill();
        stroke("#5eafe6");
        rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
}

function start(){
    objectDetector = ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
}

function modelLoaded(){
    console.log("Done!")
    status = true ; 
    video.loop();
    video.speed(1);
    video.volume(0);
}

function gotResult(error, results){
    if (error){
        console.log(error);
    }
    console.log(results);
    objects = results;
}