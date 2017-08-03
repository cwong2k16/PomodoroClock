//buttonIDs: "breakAdd", "breakSub", "sessionAdd", "sessionSub"

var breakLength = 5;    // 5 minutes
var sessionLength = 25; // 25 minutes

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
    });
});