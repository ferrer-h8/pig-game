/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
//Gloabl variables
var score, roundScore, activePlayer;

//Default values
score = [0,0];
roundScore = 0;
activePlayer = 0;

//Hiding the dice
document.querySelector('.dice').style.display = 'none';
//Setting default value for html elements
document.getElementById('score-0').textContent = '0';
document.getElementById('score-1').textContent = '0';
document.getElementById('current-0').textContent = '0';
document.getElementById('current-1').textContent = '0';

//ROLL DICE
document.querySelector('.btn-roll').addEventListener('click', function(){
  //Random number (dice value)
  var dice = Math.floor(Math.random() * 6) + 1;
  console.log(dice);

  //display the result
  var diceDOM = document.querySelector('.dice');
  //set img
  diceDOM.src = 'dice-' + dice + '.png';
  diceDOM.style.display = 'block';

  //update round score only IF the rolled number was not 1
  if (dice !== 1) {
    //Add score
    roundScore += dice;
    //set current score
    document.querySelector('#current-' + activePlayer).textContent = roundScore;
  }else{
    nextPlayer();
  }

});


document.querySelector('.btn-hold').addEventListener('click', function() {
  // Add current score to global score
  score[activePlayer] += roundScore;
  // Update UI
  document.querySelector('#score-' + activePlayer).textContent = score[activePlayer];

  // Check if player won the game
  if (score[activePlayer] >= 20) {
      document.querySelector('#name-' + activePlayer).textContent = 'WINNER!';
      document.querySelector('.dice').style.display = 'none';
      document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
      document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
  }else{
      nextPlayer();
  }

});


function nextPlayer() {
  //Next player
  document.getElementById('current-' + activePlayer).textContent = '0';
  //Add/Remove class
  document.querySelector('.player-0-panel').classList.toggle('active');
  document.querySelector('.player-1-panel').classList.toggle('active');
  //Hide dice
  document.querySelector('.dice').style.display = 'none';

  roundScore = 0;
  activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
}
