//buttonIDs: "breakAdd", "breakSub", "sessionAdd", "sessionSub"

var breakLength = 5;    // 5 minutes
var sessionLength = 25; // 25 minutes
var playing = false;    // toggle this for playing/pausing
var currTimeSess = -1;
var currTimeBreak = -1;
var inBreak = false;;

$(document).ready(function(){
    $("button").click(function(){
        if(this.id === "breakAdd" || this.id === "breakSub"){
            if(this.id === "breakAdd"){
                breakLength++;
            }
            else{
                breakLength--;
            }
            $("#breakTimeset").text(breakLength);
        }
        else if(this.id === "sessionAdd" || this.id === "sessionSub"){
            if(this.id === "sessionAdd"){
                sessionLength++;
            }
            else{
                sessionLength--;
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

function play(){
    if(!inBreak){
        var additMillis = (sessionLength * 60) * 1000; // convert user's desired minutes to seconds, and then to milliseconds
        var destinationTime = (new Date().getTime()) + additMillis;
        var difference = destinationTime - (new Date()).getTime();
        if(difference > 0){
            setInterval(function(){
                difference = destinationTime - (new Date()).getTime();
                console.log("SESSION: " + difference);
            }, 1000);
        }
        else{
            inBreak = true;
        }
    }
    else{
        var additMillis = (breakLength * 60) * 1000; // convert user's desired minutes to seconds, and then to milliseconds
        var destinationTime = (new Date().getTime()) + additMillis;
        var difference = destinationTime - (new Date()).getTime();
        if(difference > 0){
            setInterval(function(){
                difference = destinationTime - (new Date()).getTime();
                console.log("BREAK: " + difference);
            }, 1000);
        }
        else{
            inBreak = false;
        }
    }
}

