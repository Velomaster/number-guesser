//Game values
let min = 1,
    max = 10,
    winningNum = getRandomNum(min, max);
    guessesLeft = 3;

//UI elements
const game = document.querySelector('#game'),
      minNum = document.querySelector('.min-num'),
      maxNum = document.querySelector('.max-num'),
      guessBtn = document.querySelector('#guess-btn'),
      guessInput = document.querySelector('#guess-input'),
      message = document.querySelector('.message');

//Assign UI min and max
minNum.textContent = min;
maxNum.textContent = max;

//Play again event listener
game.addEventListener('mousedown', function(e) {
  if(e.target.className === 'play-again'){
    window.location.reload();
  };
});

//Listen for guess
guessBtn.addEventListener('click', function() {
  let guess = parseInt(guessInput.value);

  //Validate input
  if(isNaN(guess) || guess < min || guess > max) {
    setMessage(`Please, enter a number between ${min} and ${max}`, 'red');
    return;
  };

  //Check if the number won
  if(guess === winningNum) {
    //GAME OVER - WON
    gameOver(true, `Number ${winningNum} is correct! Congratulations!`);
  } else {
    //GAME OVER - LOST
    //Wrong number
    guessesLeft -= 1;
    //Check if any guesses are left
    if(guessesLeft === 0) {
    gameOver(false, `GAME OVER. You lost. The correct number was ${winningNum}.`);
    } else {
      //GAME CONTINUES - WRONG ANSWER
      setMessage(`Guess is not correct. ${guessesLeft} guesses left.`, 'red');
      guessInput.value = '';
    };
  };
});

function gameOver(won, msg){
  let color;
  won === true ? color = 'green' : color = 'red';
    //Change border color
    guessInput.style.borderColor = color;
    //Set text color
    message.style.color = color;
    //Set message
    setMessage(msg);
    //Disable input
    guessInput.disabled = true;

    //Play again? 
    guessBtn.value = 'Play again';
    guessBtn.className += 'play-again';

};

//Set winning numnber
function getRandomNum(min, max){
return Math.floor(Math.random() * (max - min + 1) + min);
};

//Set message
function setMessage(msg, color) {
  message.style.color = color;
  message.textContent = msg;
};


