// You'll create a trivia game that shows only one question 
// until the player answers 
// it or their time runs out.
// If the player selects the correct answer, show a screen 
// congratulating them 
///for choosing the right option. 
// After a few seconds, display the next question -- do this 
// without user input.
// The scenario is similar for wrong answers and time-outs.


// If the player runs out of time, tell the player that time's up 
// and display 
// the correct answer. Wait a few 
// seconds, then show the next question.
// If the player chooses the wrong answer, tell the player they 
// selected the wrong 
// option and then display 
// the correct answer. Wait a few seconds, then show the next question.
const possibleOperators = ['+', '-', 'X', '/']
var currentOperator;
var number1;
var number2;
var correctAnswer;

//If the button is clicked game starts
$(document).ready(function() {    
    playGame();

    //Listeners
    enterKeyforAttackButtonListener();

    currentOperator = randomOperator();
    twoRandomNumbers(currentOperator);
});

//Changes menu into battleScreen after pressing play
function playGame () {
    $('#playButton').on('click', function() {
        $('#dancingPikachu').hide();
        $('#playButton').hide();
        $('#menu').addClass('d-none');
        $('#battleScreen').removeClass('d-none');
    });
}

function enterKeyforAttackButtonListener () {
    $(document).bind('keypress', function(e) {
        if (e.keyCode == 13) {
            $('#attackButton').trigger('click');
            $('#attackButton').css({
                "background": "#D10000",
                "background-image": "linear-gradient(to bottom, #D10000, #E84C41)",
                "color": "rgba(255, 255, 255, 0.733)",
            });
            setTimeout(function() {
                $('#attackButton').css({
                    "background": "#F63E3E",
                    "background-image": "linear-gradient(to bottom, #F63E3E, #D00000)",
                    "color": "white",
                });
              }, 300);
        }
    });
}

//make a fuciton that gives a random currentOperator
function randomOperator () {
    return possibleOperators[Math.floor(Math.random()*4)];
}

//make a funciton that gives a random integer
//if it is multiplication, make it 1 to 12
//if it is division, make it so that there is no decimals
//let adding and subtracting be whatever
function twoRandomNumbers (operator) {
    if (operator === '+') {
        number1 = Math.floor(Math.random()*100)
        number2 = Math.floor(Math.random()*100)
        correctAnswer = number1 + number2;
        console.log(number1);
        console.log(number2);   
        console.log(correctAnswer);
    } else if (operator === '-') {
        number1 = Math.floor(Math.random()*100)
        number2 = Math.floor(Math.random()*100)
        correctAnswer = number1 - number2;
        console.log(number1);
        console.log(number2);   
        console.log(correctAnswer);
        // alert('-');
    } else if (operator === 'X') {
        number1 = Math.floor(Math.random()*13)
        number2 = Math.floor(Math.random()*13)
        correctAnswer = number1 * number2;
        console.log(number1);
        console.log(number2);   
        console.log(correctAnswer);
        // alert('X');
    } else {
        number1 = Math.floor(Math.random()*145)
        number2 = Math.floor(Math.random()*13)
        
        // for (let index = 12; index > 0  ; index--) {
        //     const element = array[index];
            
        // }
        correctAnswer = number1 + number2;
        console.log(number1);
        console.log(number2);   
        console.log(correctAnswer);
        // alert('/');
    }
}

//make a function that calculates the answer
//ans stores it into a global wariable

//make a function that starts the timer
//make a losing scenario for when the timer runs out
//make a way for the user to send an attack by just
//pressing enter
//make a funciton that takes the value of the input,
//as well as the current time
//and then compares it with the answer
//if it is correct, and the time is less than 10 seconds
//you do 20 damage, Charizard then does 5 damage
//if it is correct, and the time is less than 30 seconds,
//you do 10 damage, Charizard then does 10 damage
//if it is correct, and the time is less than a minute
//you do 5 damage, Charaizard then does 15 damage,
//if you're wrong, or time runs out, then you don't attack
//and charizard attacks you, Charizard does 20 damage

// On the final screen, show the number of correct answers, incorrect answers, and an 
// option to restart the 
// game (without reloading the page).




