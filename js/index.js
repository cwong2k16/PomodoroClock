//buttonIDs: "breakAdd", "breakSub", "sessionAdd", "sessionSub"

var breakLength = 5;    // 5 minutes
var sessionLength = 25; // 25 minutes
var breakCopy = breakLength * 60000; // convert minutes to milliseconds 
var sessionCopy = sessionLength * 60000; // convert minutes to milliseconds
var playing = false;    // toggle this for playing/pausing
var currTimeSess = -1;
var currTimeBreak = -1;
var inBreak = false;
var interval;

var test = 5405000;

$(document).ready(function(){
    $("button").click(function(){
        if(this.id === "breakAdd" || this.id === "breakSub"){
            if(this.id === "breakAdd"){
                breakLength++;
                breakCopy = breakLength*60000;
            }
            else{
                breakLength--;
                breakCopy = breakLength * 60000;
            }
            $("#breakTimeset").text(breakLength);
        }
        else if(this.id === "sessionAdd" || this.id === "sessionSub"){
            if(this.id === "sessionAdd"){
                sessionLength++;
                sessionCopy = sessionLength * 60000;
            }
            else{
                sessionLength--;
                sessionCopy = sessionLength * 60000;
            }
            $("#sessionTimeset").text(sessionLength);
        }
        else{
            playing = !playing;
            if(playing)
                $("#playpause").attr('src', '/assets/pause.png');
            else
                $("#playpause").attr('src', '/assets/play.png');
            play();
        }
    });
});

function play(){
    if(playing)
        interval = setInterval(tick, 1000);
    else
        clearInterval(interval);
}

function tick(){
    if(!inBreak){
        if(sessionCopy >= 0){
            console.log("SESSION: " + sessionCopy);
            document.getElementById("timer").innerHTML = "SESSION: " + format(sessionCopy);
            sessionCopy -= 1000;
        }
        else{
            inBreak = true;
            sessionCopy = sessionLength*60000;
        }
    }
    else{
        if(breakCopy >= 0){
            console.log("BREAK: " + breakCopy);
            document.getElementById("timer").innerHTML = "BREAK: " + format(breakCopy);
            breakCopy-=1000;
        }
        else{
            inBreak = false;
            breakCopy = breakLength*60000;
        }            
    }
}

function format(sessionCopy){
    var hours = Math.floor(sessionCopy/3600000);
    var minutes = Math.floor((sessionCopy-hours*3600000)/60000);
    var seconds = Math.floor(((sessionCopy-hours*3600000) - minutes*60000)/1000);
    
    return "hours: " + hours + "; " + "minutes: " + minutes + "; " + "seconds: " + seconds;
}