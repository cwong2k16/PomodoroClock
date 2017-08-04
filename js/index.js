//buttonIDs: "breakAdd", "breakSub", "sessionAdd", "sessionSub"

var breakLength = 5;    // 5 minutes
var sessionLength = 25; // 25 minutes
var breakCopy = breakLength;
var sessionCopy = sessionLength;
var playing = false;    // toggle this for playing/pausing
var currTimeSess = -1;
var currTimeBreak = -1;
var inBreak = false;
var interval;

$(document).ready(function(){
    $("button").click(function(){
        if(this.id === "breakAdd" || this.id === "breakSub"){
            if(this.id === "breakAdd"){
                breakLength++;
                breakCopy = breakLength;
            }
            else{
                breakLength--;
                breakCopy = breakLength;
            }
            $("#breakTimeset").text(breakLength);
        }
        else if(this.id === "sessionAdd" || this.id === "sessionSub"){
            if(this.id === "sessionAdd"){
                sessionLength++;
                sessionCopy = sessionLength;
            }
            else{
                sessionLength--;
                sessionCopy = sessionLength;
            }
            $("#sessionTimeset").text(sessionLength);
        }
        else{
            playing = !playing;
            if(playing){
                $("#playpause").attr('src', '/assets/pause.png');
                play();
            }
            else{
                $("#playpause").attr('src', '/assets/play.png');
                pause();
            }
        }
    });
});

//if(!inBreak){
//    var additMillis = (sessionLength * 60) * 1000; // convert user's desired minutes to seconds, and then to milliseconds
//    var destinationTime = (new Date().getTime()) + additMillis;
//    var difference = destinationTime - (new Date()).getTime();
//    if(difference > 0){
//        setInterval(function(){
//            difference = destinationTime - (new Date()).getTime();
//            console.log("SESSION: " + difference);
//        }, 1000);
//    }
//    else{
//        inBreak = true;
//    }
//}

function play(){
    var additMillis;
    var destinationTime;
    var difference;
    if(!inBreak){
        additMillis = (sessionCopy * 60) * 1000; // convert user's desired minutes to seconds, and then to milliseconds
        destinationTime = (new Date().getTime()) + additMillis;
        difference = destinationTime - (new Date()).getTime();
    }
    else {
        additMillis = (breakCopy * 60) * 1000; // convert user's desired minutes to seconds, and then to milliseconds
        destinationTime = (new Date().getTime()) + additMillis;
        difference = destinationTime - (new Date()).getTime();
    }
    
    var diff = difference;
    interval = setInterval(function(){
        if(!inBreak){
            additMillis = sessionCopy*1000;
            destinationTime = (new Date().getTime()) + additMillis;
            diff = destinationTime - (new Date()).getTime();
            if(diff > 0){
                console.log("SESSION: " + diff + " " + sessionCopy);
                sessionCopy--;
                additMillis = sessionCopy*1000;
                destinationTime = (new Date().getTime()) + additMillis;
                diff = destinationTime - (new Date()).getTime();
            }
            else{
                inBreak = true;
                sessionCopy = sessionLength;
            }
        }
        else{
            additMillis = breakCopy * 1000; // convert user's desired minutes to seconds, and then to milliseconds
            destinationTime = (new Date().getTime()) + additMillis;
            diff = destinationTime - (new Date()).getTime();
            if(diff > 0){
                console.log("BREAK: " + diff);
                breakCopy--;
                additMillis = breakCopy * 1000; // convert user's desired minutes to seconds, and then to milliseconds
                destinationTime = (new Date().getTime()) + additMillis;
                diff = destinationTime - (new Date()).getTime();
            }
            else{
                inBreak = false;
                breakCopy = breakLength;
            }            
        }
    }, 1000);
}

