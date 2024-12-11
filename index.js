var buttonColours=["green","red","yellow","blue"];
var gamePattern=[];
var userClickedPattern=[];
var started=false;
var level=0;


$(document).keypress(function(){
  if(!started){
    $("h1").text("level "+ level);
    nextSequnce();
    started=true;
  }
});


$(".btn").click( function(){
  
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
animatePress(userChosenColour);
checkAnwer( userClickedPattern.length-1);

});







function nextSequnce () {
  userClickedPattern=[];
  level++;
  $("h1").text("level "+ level);
  var randomNumber=Math.floor(Math.random()*4);
  var randomChosenColur=buttonColours[randomNumber];
  gamePattern.push(randomChosenColur);
$("#"+ randomChosenColur).fadeIn(100).fadeOut(100).fadeIn(100);
playSound(randomChosenColur);
}



function checkAnwer(currentLevel){
  if(gamePattern[currentLevel] === userClickedPattern[currentLevel])
  
    {
      if(userClickedPattern.length===gamePattern.length){
        setTimeout(() => {
          nextSequnce();
        }, 1000);
      }
      
    }else{
      playSound("wrong");
      alert("press any key to restart");
      $("body").addClass("game-over");
      $("h1").text("GameOver, press anykey to restart");
      setTimeout(() => {
        $("body").removeClass("game-over");
      }, 300);
      
      startOver();
    }
}


function playSound(name){
  var audio=new Audio("sounds/"+ name +".mp3");
  audio.play();

}

function animatePress(currentcolour) {
  $("#"+ currentcolour).addClass("whenButtonPressed");
  setTimeout(() => {
    $("#"+ currentcolour).removeClass("whenButtonPressed");
  }, 100);
}


function startOver(){
  level=0;
  gamePattern=[];
  started=false;
}