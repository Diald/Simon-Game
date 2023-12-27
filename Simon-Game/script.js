var buttonColors = ["red", 'green', 'blue', 'yellow'];
var gamePattern = [];
var userClickedPattern = []

var started = false;
var level = 0;

$(document).keypress(function(){
    if(!started){
        $('#level-title').html('Level '+ level);
        nextSequence();
        started = true;
    }
});


$('.btn').click(function(){
    var userChosenColor = $(this).attr('id');
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel){
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        console.log('success');
        if(gamePattern.length === userClickedPattern.length){
            setTimeout(function(){
                nextSequence();
            },1000);
        }
    }
    else{
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function () {
          $("body").removeClass("game-over");
        }, 200);
        $("h1").html("You have lost the game, Press any key to restart !");

        setTimeout(function(){
            startOver();
        },1000);
    }
}



function nextSequence(){
    userClickedPattern = [];
    level++;

    $("#level-title").text("Level " + level);
    var randomNumber = Math.floor(Math.random()*3);

    var randomChosenColor = buttonColors[randomNumber];

    gamePattern.push(randomChosenColor);

    $("#"+ randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
    animatePress(randomChosenColor);
}

function playSound(name){
    var audio = new Audio('sounds/' + name +'.mp3');
    audio.play();   
}

function animatePress(currentColor){
    $('#' + currentColor).addClass('pressed');
    setTimeout(function(){
        $('#' + currentColor).removeClass('pressed');
    },100);
}

function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
}