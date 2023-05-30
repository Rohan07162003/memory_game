var buttonColours =["red", "blue", "green", "yellow"];
var gamePattern=[];
var userclickedpattern=[];
var started = false;

var level = 0;
$(document).keypress(function() {
  if (!started) {
    $("h1").text("Level " + level);
    nextsequence();
    started = true;
  }
});
$(".butn").click(function(){
    var k=$(this).attr("id");
    userclickedpattern.push(k);
    playsound(k);
    animatecolor(k);
    checkanswer(userclickedpattern.length-1);
});
function checkanswer(currentlevel){
    if(gamePattern[currentlevel]===userclickedpattern[currentlevel]){
        console.log("success");
        if (userclickedpattern.length === gamePattern.length){

            //5. Call nextSequence() after a 1000 millisecond delay.
            setTimeout(function () {
              nextsequence();
            }, 1000);
    
        }
    }
    else{
        console.log("failure");
        playsound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        $("h1").text("Game Over, Press Any Key to Restart");
        startover();
    }
};
function nextsequence(){
    userclickedpattern = [];
    level++;
    $("h1").text("Level " + level);
    var x = Math.floor((Math.random() * 4) );
    var randomChosenColour=buttonColours[x];
    gamePattern.push(randomChosenColour);
    $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playsound(randomChosenColour)
};
function startover(){
    gamePattern=[];
    userclickedpattern=[];
    started = false;
    level = 0;
}
function playsound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}
function animatecolor(currentcolor){
    $("#"+currentcolor).addClass("pressed");
    setTimeout(function(){
        $("#"+currentcolor).removeClass("pressed");
    },100);
}

