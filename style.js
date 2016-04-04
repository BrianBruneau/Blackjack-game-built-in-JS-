var DEAL_STATE = "DEAL";
var PLAYER_STATE = "PLAYER_STATE";

// the game starts in the deal state.
var CURRENT_STATE = DEAL_STATE;


var playerCards = [];
var dealerCards = [];
var playerWins = 0;
var dealerWins = 0;


function setGameState(gamestate) {
    CURRENT_STATE = gamestate;
    executeState();
}

function executeState() {
    if (CURRENT_STATE === PLAYER_STATE) {

    }
}

var deal = function(cardNum) {
    var cardsArray = [];
    for (var i = 0; i < cardNum; i++) {
        var randCard = getRandomInt(1, 52)
        cardsArray.push(checkValue(randCard));
    }
    return cardsArray;
}


var playerHit = function() {
    playerCards = playerCards.concat(deal(1));
    console.log(playerCards);
    var total = checkTotal();
    if (total === 21) {
        playerWins++;
        console.log('21! Player wins!');
    } else if (total < 21) {
        console.log(total + ' Do you want to Hit, or Stay?');
    } else if (total > 21) {
        dealerWins++;
        console.log('BUST! Dealer wins this hand..');
    }
    setGameState(PLAYER_STATE)

}




function getRandomInt(min, max) {
   return Math.floor(Math.random() * (max - min + 1)) + min;
}

var startGame = function() {
    playerCards = playerCards.concat(deal(2));
    dealerCards = dealerCards.concat(deal(2));
    console.log(playerCards, dealerCards);
    var total = checkTotal();
    if (total === 21) {
        playerWins++;
        console.log('21! Player wins!');
    } else if (total < 21) {
        console.log(total + ' Do you want to Hit, or Stay?');
    } else if (total > 21) {
        dealerWins++;
        console.log('BUST! Dealer wins this hand..');
    }
}

var checkValue = function(card) {
    var val; 
    if(card % 13 === 0 || card % 13 >= 10) {
        val = 10;
    } else if(card % 13 === 1) {
        val = 11;
    } else {
        val = card % 13;
    }
    return val;
}

var checkTotal = function() {
    var total = 0;
    for(var i in playerCards) { 
        total += playerCards[i]; 
    };

    console.log(total);
    return total;
}

startGame();
