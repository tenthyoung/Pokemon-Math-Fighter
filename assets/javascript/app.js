const possibleOperators = ['+', '-', 'X', '/']
var currentOperator;
var number1;
var number2;
var correctAnswer;
var intervalTimer;
var enemyHealth = $('#enemyHealth'); //Selector
var yourHealth = $('#yourHealth'); //Selector
const compositeNumbers = [4, 6, 8, 9, 10, 12, 14, 15, 16, 18, 20, 21, 22, 24, 25, 26, 27, 28, 30, 32, 33, 34, 35, 36, 38, 39, 40, 42, 44, 45, 46, 48, 49, 50, 51, 52, 54, 55, 56, 57, 58, 60, 62, 63, 64, 65, 66, 68, 69, 70, 72, 74, 75, 76, 77, 78, 80, 81, 82, 84, 85, 86, 87, 88, 90, 91, 92, 93, 94, 95, 96, 98, 99, 100, 102, 104, 105, 106, 108, 110, 111, 112, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 124, 125, 126, 128, 129, 130, 132, 133, 134, 135, 136, 138, 140, 141, 142, 143, 144]
var currentTime = 60;
var sequenceStarted = false;
var numQuestions = 1;
var numCorrect = 0;

//If the button is clicked game starts
$(document).ready(function() {    
    playGame();

    // Activate Listeners
    enterKeyforAttackButtonListener();

    // Setting up Problem
    currentOperator = randomOperator();
    twoRandomNumbers(currentOperator);
    displayProblem();

});

// Changes menu into battleScreen after pressing play
function playGame () {
    $('#playButton').on('click', function() {
        // $('#dancingPikachu').hide();
        // $('#playButton').hide();
        $('#menu').addClass('d-none');
        $('#battleScreen').removeClass('d-none');
        startTimer();

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

            stopTimer();

            let userAnswer = $('#userAnswer').val();

            if (sequenceStarted == false) {
                sequenceStarted = true;
                isAnswerCorrect(userAnswer);
            }
        }
    });
}

function randomOperator () {
    return possibleOperators[Math.floor(Math.random()*4)];
}

function twoRandomNumbers (operator) {
    if (operator === '+') {
        number1 = Math.floor(Math.random()*100);
        number2 = Math.floor(Math.random()*100);
        correctAnswer = number1 + number2;
    } else if (operator === '-') {
        number1 = Math.floor(Math.random()*100);
        number2 = Math.floor(Math.random()*(number1)+1);
        correctAnswer = number1 - number2;
    } else if (operator === 'X') {
        number1 = Math.floor(Math.random()*13);
        number2 = Math.floor(Math.random()*13);
        correctAnswer = number1 * number2;
    } else {
        number1 = Math.floor(Math.random()*compositeNumbers.length);
        let isDivisible = false;
        let possibleNumber2 = 12;
        while (isDivisible != true) {
            if (number1 % possibleNumber2 == 0) {
                number2 = possibleNumber2;
                isDivisible = true;
            } else {
                possibleNumber2--;
            }
        }
        correctAnswer = number1 / number2;
    }
}

function displayProblem () {
    $('#number1').text(number1);
    $('#operator').text(currentOperator);
    $('#number2').text(number2);
}

function resetTimer() {
    currentTime = 60;
    $('#currentTime').text(currentTime);
}

function startTimer() {
    intervalTimer = setInterval(countDown, 1000);
    console.log(`Interval timer ID is: ${intervalTimer}`);
}

function countDown() {
    if (currentTime > 0) {
        currentTime--;
        $('#currentTime').text(currentTime);
    } else if (currentTime == 0) {
       wrongAnswerScenario();
       stopTimer();
       resetTimer();
    }

}

function stopTimer() {
    clearInterval(intervalTimer);
    console.log(`Interval cleared! ${intervalTimer}`);
}

function isAnswerCorrect(answer) {
    if (answer == correctAnswer) {
        console.log('Correct!');
        correctAnswerScenario();
        numCorrect++;
    } else {
        wrongAnswerScenario();
        console.log('Wrong!');
    }
}


function correctAnswerScenario () {
    let randomAttack = Math.floor(Math.random()*3); 

    if (currentTime > 40) {
        bubble('critical');
        setTimeout(function(){
            charizardAttack(randomAttack);
        },3000);
    } else if (currentTime > 20) {
        bubble();
        setTimeout(function(){
            charizardAttack(randomAttack);
        },3000);
    } else if (currentTime > 0) {
        scratch();
        setTimeout(function(){
            charizardAttack(randomAttack);
        },3000);
    }
}

function wrongAnswerScenario () {
    let randomAttack = Math.floor(Math.random()*9); 
    $('#prompt').text('Blastoise is confused!');

    charizardAttack(randomAttack);
}

function charizardAttack(choice) {
    let damagePossibilites = [8,10,12,15];
    let index = Math.floor(Math.random()*damagePossibilites.length);
    let damageToYourHealth = damagePossibilites[index];
    if (choice <= 3) {
        meteor('critical');
        setTimeout(function(){
            yourHealth.val(Number(yourHealth.val()) - 19);
        },3000)
     } else {
        meteor(' ',damageToYourHealth);
        setTimeout(function(){
            yourHealth.val(Number(yourHealth.val()) - damageToYourHealth);
        },3000)
    }


}

function isHealthZero(didCharizardAttack = false) {
    console.log(`isHealthZero function invoked!`);
    if ( Number(yourHealth.val()) <= 0) {
        youLost();
    } else if ( Number(enemyHealth.val()) <= 0 ) {
        youWin();
    } else if (didCharizardAttack === true) {
        // newQuestion is called twice because this function runs every time there is an attack, but
        // newQuestion() should only run if charizard attacked
        newQuestion();
    }
}

function youLost() {
    console.log(`you lose!`);
    stopTimer();
    $('#gameOver').removeClass('d-none');
    $('#youLose').removeClass('d-none');
    $('.correctAnswers').text(numCorrect);
    $('.totalQuestions').text(numQuestions);

    setTimeout(function(){
        addReplayListener('lost');
    },1000)
}

function youWin() {
    stopTimer();
    $('#gameOver').removeClass('d-none');
    $('#youWin').removeClass('d-none');
    $('.correctAnswers').text(numCorrect);
    $('.totalQuestions').text(numQuestions);

    setTimeout(function(){
        addReplayListener('won');
    },1000)
}

function addReplayListener(mostRecentGameResult){
    if (mostRecentGameResult  === 'lost') {
        $('#replayLoseButton').on('click', function(){
            location.reload();
            // console.log('replaybutton clicked');
            // $('#gameOver').addClass('d-none');
            // $('#youLose').addClass('d-none');
            // $('#battleScreen').addClass('d-none');
            // $('#menu').removeClass('d-none');
        });
    } else {
        $('#replayWinButton').on('click', function(){
            location.reload();
            // console.log('replaybutton clicked');
            // $('#gameOver').addClass('d-none');
            // $('#youWin').addClass('d-none');
            // $('#battleScreen').addClass('d-none');
            // $('#menu').removeClass('d-none');
        });
    }
}

function newQuestion () {
    console.log(`newQuestion() run!`);
    setTimeout( function() {
        numQuestions++;
        $('#userAnswer').val('');
        $('#prompt').text('Solve the math problem!');
        currentOperator = randomOperator();
        twoRandomNumbers(currentOperator);
        displayProblem();

        resetTimer();

        // For some reason this runs twice after you get the answer correct
        startTimer();
        sequenceStarted = false;
    },5000);
}

function scratch () {
    $('#prompt').text('Blastoise used Scratch!');

    setTimeout(function() {
        $('#scratch').removeClass('d-none')
    }, 500);
    setTimeout(function() {
        $('#reverseScratch').removeClass('d-none')
        enemyHealth.val(Number(enemyHealth.val()) - 10);
    }, 1000);
    setTimeout(function() {
        $('#scratch').addClass('d-none')
        $('#reverseScratch').addClass('d-none')
        $('#prompt').text('It wasn\'t very effective...');
    }, 2500);
    isHealthZero();
}

function bubble(power) {
    $('#prompt').text('Blastoise used Bubble!');

    setTimeout(function () {
        setTimeout(function() {
            $('#bubble').removeClass('d-none')
            $('#bubble').addClass('animated shake infinite')
        }, 500);
        setTimeout(function() {
            $('#bubble').addClass('d-none')
            if (power == 'critical') {
                enemyHealth.val(Number(enemyHealth.val()) - 20);
                $('#prompt').text('It was super effective!');
                isHealthZero();
            } else {
                enemyHealth.val(Number(enemyHealth.val()) - 15);
                $('#prompt').text('It was effective!');
                isHealthZero();
            }
        }, 2000);
    },1000);
}

function meteor (power) {
    setTimeout(function () {
        setTimeout(function() {
            $('#meteorDiv').removeClass('d-none');
            $('#prompt').text('Charizard used Meteor!');
            $('#meteorDiv').addClass('animated slideInRight ');
            $('#meteor').addClass('animated slideInDown ');
        }, 500);
        setTimeout(function() {
            $('#meteorDiv').addClass('d-none');
            if (power == 'critical') {
                setTimeout(function(){
                    $('#prompt').text('Critical hit!');
                    console.log('critical hit');
                    didCharizardAtack = true;
                    isHealthZero(didCharizardAtack);
                },500);
            } else {
                setTimeout(function(){
                    $('#prompt').text('It was mildly effective!');
                    console.log('mildly effective');
                    didCharizardAtack = true;
                    isHealthZero(didCharizardAtack);
                },500);
            }
        }, 3000);
    },1000);    


}
//make 5 losing scenario for when the timer runs out

//make 5 funciton that takes the value of the input,
//as well as the current time
//and then compares it with the answer
//if it is correct, and the time is less than 10 seconds
//you do 20 damage, Charizard then does 5 damage
//if it is correct, and the time is less than 30 seconds,
//you do 10 damage, Charizard then does 10 damage
//if it is correct, and the time is less than 5 minute
//you do 5 damage, Charaizard then does 15 damage,
//if you're wrong, or time runs out, then you don't attack
//and charizard attacks you, Charizard does 20 damage

// On the final screen, show the number of correct answers, incorrect answers, and an 
// option to restart the 
// game (without reloading the page).




