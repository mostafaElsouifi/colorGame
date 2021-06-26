/* game rules *********
 1. the game starts with player 1 with hard mode      done
 2. each player has 3 attempts in every turn           done
 3- the attempts decreasing by when the player choose the wrong answer and  if the player turn the game to the easy mode he will lose all atempts 

 4 - if the player choose the corrrect answer his score will be added by 1 and the next player will start his turn  done

 5. if he lose all attempts he wont earn any score and the next player will catch his turn  done 

 6. the player win when his score reach to 5 .  done
 */

 /*

 problems need to fix later 

 1. after clicked the correct answer and the colors change to the correct need to stop clicking on squares and generate new colors for another player    done 

 2. addEventListener to mode buttons              done

 */

 
// set variables 
var colors, scores, attempts, activePlayer, winningScore, numSquares,  pickedColor, gamePlaying;


// DOM selectors
var dom = {
    squares: document.querySelectorAll(".squares"),
    messageDisplay: document.querySelector(".messageDispaly"),
    h1: document.querySelector("h1"),
    newGameBtn: document.querySelector(".newGame-btn"),
    colorDisplay: document.querySelector(".colorDisplay"),
    newColorsBtn: document.querySelector(".newColor-btn"),
    modeButtons: document.querySelectorAll(".modeButton")
};

reset();

// add event listeners 


// 1. event to squares 
for(var i = 0; i < dom.squares.length; i++){
    dom.squares[i].addEventListener("click", function(){
        if(gamePlaying){
        var clickedColor = this.style.backgroundColor;
        if(clickedColor === pickedColor){
            dom.messageDisplay.textContent = "correct!";
            changeColor(clickedColor);
            dom.h1.style.backgroundColor = clickedColor;
            scores[activePlayer] += 1;
            document.getElementById("score-" + activePlayer).textContent = scores[activePlayer];
            
            if(scores[activePlayer] === winningScore){
                document.getElementById("player-" + activePlayer + "-panel").classList.remove("active");
                document.getElementById("player-" + activePlayer + "-panel").classList.add("winner");
            document.querySelector("#name-" + activePlayer + " i").classList.remove("fa-play");
            document.querySelector("#name-" + activePlayer + " i").classList.add("fa-trophy");
            gamePlaying = false;
            }else{
                refreshColors();
                nextPlayer();
            }
           
        }else{
            dom.messageDisplay.textContent = "try again";
            this.style.backgroundColor = "#232323";
            attempts -= 1;
            document.getElementById("attempts-" + activePlayer).textContent = attempts;
            if(attempts === 0){
                refreshColors();
                nextPlayer();
            }
        }
    }
    });
}

// add event listener to mode buttons 
for(var i = 0; i < dom.modeButtons.length; i++){
    dom.modeButtons[i].addEventListener("click", function(){
        if(this.textContent === "easy"){
            colors = createColors(3);
            pickedColor = pickRandomColor(3);
            dom.colorDisplay.textContent = pickedColor;
            this.classList.add("selected");
            dom.modeButtons[1].classList.remove("selected");
            for(var i = 0; i < dom.squares.length; i++){
                if(colors[i]){
                    dom.squares[i].style.backgroundColor = colors[i];
                }else{
                    dom.squares[i].style.display = "none";
                }
            }

        }else if (this.textContent === "hard"){
            colors = createColors(6);
            pickedColor = pickRandomColor(6);
            dom.colorDisplay.textContent = pickedColor;
            this.classList.add("selected");
            dom.modeButtons[0].classList.remove("selected");
            for(var i = 0; i < dom.squares.length; i++){
                    dom.squares[i].style.display = "block";
                    dom.squares[i].style.backgroundColor = colors[i];
                  
                
            }


        }
    })
}


// event to new game
dom.newGameBtn.addEventListener("click", function(){
    reset();
})


// event new colors to generate new colors

dom.newColorsBtn.addEventListener("click", function(){

    if(gamePlaying){
    dom.h1.style.backgroundColor = "steelBlue";
    colors = createColors(6);
    pickedColor = pickRandomColor(6);
    dom.colorDisplay.textContent = pickedColor;
    for(var i = 0; i < dom.squares.length; i++){
        dom.squares[i].style.backgroundColor = colors[i];
    }
    
}
})



// generate random color 
function generateRandomColor(){
    var r = Math.floor(Math.random() * 256);
    var g = Math.floor(Math.random() * 256);
    var b = Math.floor(Math.random() * 256);
    return "rgb(" + r + ", " + g + ", " + b + ")"; 
}

// create  colors 
function createColors(num){
    var arr = [];
    for(var i = 0; i < num; i++){
        arr.push(generateRandomColor())
    };
    return arr;
}


// pick random color 
function pickRandomColor(num){
    var random = Math.floor(Math.random() * num);
    return colors[random];
}

// change color of the heading and all squares by the correct color 

function changeColor(correctColor){
    for(var i = 0; i < dom.squares.length; i++){
        dom.squares[i].style.backgroundColor = correctColor;
    }
}


// next player function 

function nextPlayer(){
    document.getElementById("player-" + activePlayer + "-panel").classList.remove("active");
    document.querySelector("#name-" + activePlayer + " i").classList.remove("fa-play");
    attempts = 3;
    document.getElementById("attempts-" + activePlayer).textContent = attempts
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    document.querySelector("#name-" + activePlayer + " i").classList.add("fa-play");
    document.getElementById("player-" + activePlayer + "-panel").classList.add("active");
}


// reset the game 

function reset(){
    activePlayer = 0;
    attempts = 3;
    scores = [0, 0];
    winningScore = 5;
    colors = [];
    numSquares = 6;
    dom.modeButtons[0].classList.remove("selected");
    dom.modeButtons[1].classList.add("selected");
    document.getElementById("player-0-panel").classList.remove("active");
    document.getElementById("player-1-panel").classList.remove("active");
    document.getElementById("player-0-panel").classList.add("active");
    document.getElementById("player-0-panel").classList.remove("winner");
    document.getElementById("player-1-panel").classList.remove("winner");
    document.querySelector("#name-0 i").classList.remove("fa-play");
    document.querySelector("#name-1 i").classList.remove("fa-play");
    document.querySelector("#name-0 i").classList.add("fa-play");
    document.querySelector("#name-0 i").classList.remove("fa-trophy");
    document.querySelector("#name-1 i").classList.remove("fa-trophy");
    gamePlaying = true;
    colors = createColors(6);
    pickedColor = pickRandomColor(6);
    dom.colorDisplay.textContent = pickedColor;
   
    document.getElementById("attempts-0").textContent = 3;
    document.getElementById("attempts-1").textContent = 3;
    document.getElementById("score-0").textContent = 0;
    document.getElementById("score-1").textContent = 0;
    dom.messageDisplay.textContent = "";
    dom.h1.style.backgroundColor = "steelBlue";
    for(var i = 0; i < dom.squares.length; i++){
        dom.squares[i].style.display = "block";
        dom.squares[i].style.backgroundColor = colors[i];
    }
    
}



function refreshColors(){
    gamePlaying = false;
    if(scores[0] !== 5 || scores[1] !== 5){
        setTimeout(function(){
        gamePlaying = true;
        colors = createColors(6);
        pickedColor = pickRandomColor(6);
       dom.colorDisplay.textContent = pickedColor;
       dom.h1.style.backgroundColor = "steelBlue";
       dom.messageDisplay.textContent = "";
       for(var i = 0; i < dom.squares.length; i++){
          dom.squares[i].style.backgroundColor = colors[i];
         }
    }, 1500)
}


}







/*

function newColorBtnAnimation(){
    var getColor = getComputedStyle(document.querySelector(".newColor-btn")).color;
    setInterval(function(){
        getColor ? document.querySelector(".newColor-btn").style.color = "green" : document.querySelector(".newColor-btn").style.color  = "rgb(70, 130, 180)";
        getColor = !getColor;
       document.querySelector(".newColor-btn").style.fontSize = "3rem";

    },500);

}
    
*/


/*
colorAnimation();
function colorAnimation(){
    // use setInterval function to make animation color on rgb ;
 var r = getComputedStyle(document.querySelector(".r")).color;
 var g = getComputedStyle(document.querySelector(".g")).color;
 var b = getComputedStyle(document.querySelector(".b")).color;
 var r1 = getComputedStyle(document.querySelector(".r-1")).color;
 var g1 = getComputedStyle(document.querySelector(".g-1")).color;
 var b1 = getComputedStyle(document.querySelector(".b-1")).color;

setInterval(function(){
  if(r && b && g && r1 && g1 && b1){
      document.querySelector(".r").style.color = "red";
      document.querySelector(".g").style.color = "green";
      document.querySelector(".b").style.color = "blue";
      document.querySelector(".r-1").style.color = "red";
      document.querySelector(".g-1").style.color = "green";
      document.querySelector(".b-1").style.color = "blue";
  }else{
    document.querySelector(".r").style.color = "white";
    document.querySelector(".g").style.color = "white";
    document.querySelector(".b").style.color = "white";
    document.querySelector(".r-1").style.color = "white";
    document.querySelector(".g-1").style.color = "white";
    document.querySelector(".b-1").style.color = "white";
  }
  r = !r;
},800)

}

*/