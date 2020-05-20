
/*
YOUR 3 CHALLENGES
Change the game to follow these rules:
1. A player looses his ENTIRE score when he rolls two 6 in a row. After that, it's the next player's turn. (Hint: Always save the previous dice roll in a separate variable)
2. Add an input field to the HTML where players can set the winning score, so that they can change the predefined score of 100. (Hint: you can read that value with the .value property in JavaScript. This is a good oportunity to use google to figure this out :)
3. Add another dice to the game, so that there are two dices now. The player looses his current score when one of them is a 1. (Hint: you will need CSS to position the second dice, so take a look at the CSS code for the first one.)
*/


var scores, roundScore, activePlayer, gamePlaying;

init();

var lastDice;

//dice = Math.floor(Math.random() * 6) + 1;

//***document.querySelector('#current-' + activePlayer).textContent = dice; 
//zavarta se random chislo za tekushtiq player (activePlayer); 
//mojem da go narechem i setter, zashtoto zadavame nqkakva value

//document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em>'; //<em></em> pravi teksta italic, zaradi innerHTML mojem da zadadem tag, a ako bqhme napisali textContent mojem da zadavame samo tekst

//***var x = document.querySelector('#score-0').textContent; 
//prosto prochita value na elementa s tova ID i go zapazva v promenlivata x; 
//mojem da go narechem i getter zashtoto vzemame value


document.querySelector('.btn-roll').addEventListener('click', function() {
    if(gamePlaying) {
        //1. Random number
        var dice1 = Math.floor(Math.random() * 6) + 1;
        var dice2 = Math.floor(Math.random() * 6) + 1;


        //2. Display the result
        document.getElementById('dice-1').style.display = 'block';
        document.getElementById('dice-2').style.display = 'block';
        document.getElementById('dice-1').src = 'dice-' + dice1 + '.png';
        document.getElementById('dice-2').src = 'dice-' + dice2 + '.png';


        //3.Update the round score IF the rolled number was NOT a 1
        if (dice1 !== 1 && dice2 !==1) {
            //add score
            //roundScore = roundScore + dice
            roundScore += dice1 + dice2;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
            } else {
            //next player
                nextPlayer();
            }

        /*
        if (dice === 6 && lastDice === 6) {
            //player looses score
            scores[activePlayer] = 0;
            document.querySelector('#score-' + activePlayer).textContent = '0';
            nextPlayer();

        } else if (dice !== 1) {
        //add score
        //roundScore = roundScore + dice
        roundScore += dice;
        document.querySelector('#current-' + activePlayer).textContent = roundScore;
        } else {
        //next player
            nextPlayer();
        }

        lastDice = dice;
         //zapisvame posledniq dice number tuk  za da go izpolzvame
    */
    }

});

document.querySelector('.btn-hold').addEventListener('click', function(){
    if (gamePlaying) { //za da blokira butona da ne aktiven sled kato igrata e prikliuchila
        //add current score to GLOBAL score
        //scores[activePlayer] = scores[activePlayer] + roundScore
        scores[activePlayer] += roundScore

        //update the UI
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        var input = document.querySelector('.final-score').value; // vzemam value-to ot input field-a
        var winningScore;

        //undefined, 0, null or "" are COERCED to false
        //anything else is COERCED to true
        if (input) {
            winningScore = input;
        } else {
            winningScore = 100;
        }



        //check if player won the game
        if (scores[activePlayer] >= winningScore) {
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
            document.getElementById('dice-1').style.display = 'none';
            document.getElementById('dice-2').style.display = 'none';

            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying = false; //setting state of the variable to false will no longer allowed to continue the game of course with the if statement (gamePlaying)
        } else {
            //next player
            nextPlayer();
        }
    }
});

function nextPlayer(){
    if(activePlayer === 0) {
        activePlayer = 1;
    } else {
        activePlayer = 0;
    }
    roundScore = 0; //reset-vame roundScore da bade vinagi 0, vseki pat kogato se premine prez 1

    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active'); //toggle raboti kato add i remove. ako ima class active shte go remove-ne, ako nqma class active nqma shte go add-ne
    //ako player-0 ima class active, shte go premahne

    //document.querySelector('.player-0-panel').classList.remove('active');
    //document.querySelector('.player-1-panel').classList.add('active');

    document.getElementById('dice-1').style.display = 'none';
    document.getElementById('dice-2').style.display = 'none';

}

document.querySelector('.btn-new').addEventListener('click', init);

function init() {
    scores = [0, 0];
    activePlayer = 0;
    roundScore = 0;
    gamePlaying = true;

document.getElementById('dice-1').style.display = 'none';
document.getElementById('dice-2').style.display = 'none';

//mojem da promenqme CSS chrez JS kato izpolzvame metoda style i atributa  display
//pravim "dice-5.png" da ne se vijda parvonachalno pri otvarqne na igrata
//parvo izpolzvame style metoda, display e CSS property, a 'none' e CSS value that we attribute to this property 

document.getElementById('score-0').textContent = '0';
document.getElementById('score-1').textContent = '0';
document.getElementById('current-0').textContent = '0';
document.getElementById('current-1').textContent = '0';
//another way to select elemets by ID
//pravim score-0, score-1 kakto i current-0 i current-1 da stanat avtomatichno 0, bez da pipame po HTML

document.getElementById('name-0').textContent = 'Player 1';
document.getElementById('name-1').textContent = 'Player 2';

document.querySelector('.player-0-panel').classList.remove('winner');
document.querySelector('.player-1-panel').classList.remove('winner');
document.querySelector('.player-0-panel').classList.remove('active');
document.querySelector('.player-1-panel').classList.remove('active');
document.querySelector('.player-0-panel').classList.add('active');


}





