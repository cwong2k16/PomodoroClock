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
            $("#playpause").attr('src', '/assets/pause.png');
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
            breakCopy-=1000;
        }
        else{
            inBreak = false;
            breakCopy = breakLength*60000;
        }            
    }
}

