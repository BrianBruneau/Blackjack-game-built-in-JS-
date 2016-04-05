var DEAL_STATE = "DEAL";
var PLAYER_STATE = "PLAYER_STATE";
var COMPARE_STATE = "COMPARE_STATE";
var DEALER_STATE = "DEALER_STATE";
var BET_STATE = "BET_STATE";

// the game starts in the deal state.
var CURRENT_STATE = DEAL_STATE;


var playerCards = [];
var dealerCards = [];
var playerWins = 0;
var dealerWins = 0;
var playerMoney = 400;
var dealerMoney = 3000;
var playerBet = 0;

var bet1 = 5;
var bet2 = 10;
var bet3 = 30;


function setGameState(gamestate) {
    CURRENT_STATE = gamestate;
    executeState();
}

function executeState() {
    if (CURRENT_STATE === PLAYER_STATE) {

    } else if (CURRENT_STATE === DEAL_STATE) {
        startGame();
    } else if (CURRENT_STATE === DEALER_STATE) {
        dealerHit();
    } else if (CURRENT_STATE === BET_STATE) {
        //enable bet button
    } else if (CURRENT_STATE === COMPARE_STATE) {
        compareHands();
    }
}

var deal = function(cardNum) {
    var cardsArray = [];
    for (var i = 0; i < cardNum; i++) {
        var randCard = getRandomInt(1, 52);
        cardsArray.push(checkValue(randCard));
    }
    return cardsArray;
};

var bet = function(event) {
    var name = event.target.name;
    if(name === 'bet30') {
        if (playerMoney >= 30) {
            playerBet += 30;
            playerMoney -= 30;
            console.log(playerMoney);
            setGameState(DEAL_STATE);
        } else if (playerMoney < 30) {
            console.log('Not enough money to bet!')
            setGameState(DEAL_STATE);
        }
    } else if (name === 'bet10') {

    }
}

var dealerHit = function() {
    console.log(dealerCards);
    var total = checkTotal(dealerCards);
        if(total <= 16) {
            dealerCards = dealerCards.concat(deal(1));
            setGameState(DEALER_STATE);
        } else if(total > 21) {
            console.log('Dealer BUSTS!');
            dealerStay();
        } else if(total === 21) {
            console.log('21!');
            dealerStay();
        } else {
            dealerStay();
        }
};


var playerHit = function() {
    playerCards = playerCards.concat(deal(1));
    console.log(playerCards);
    var total = checkTotal(playerCards);
    if (total === 21) {
        playerWins++;
        setGameState(COMPARE_STATE);
        console.log('21!');
    } else if (total < 21) {
        setGameState(PLAYER_STATE);
        console.log(total + ' Do you want to Hit, or Stay?');
    } else if (total > 21) {
        dealerWins++;
        console.log('BUST! Dealer wins this hand..');
        setGameState(COMPARE_STATE);
    }

};

var dealerStay = function() {
    setGameState(COMPARE_STATE);
};

var playerStay = function() {
    setGameState(DEALER_STATE);
};


function getRandomInt(min, max) {
   return Math.floor(Math.random() * (max - min + 1)) + min;
}

var startGame = function() {
    playerCards = playerCards.concat(deal(2));
    dealerCards = dealerCards.concat(deal(2));
    console.log(playerCards, dealerCards);
    var playerTotal = checkTotal(playerCards);
    var dealerTotal = checkTotal(dealerCards);
    
    if (playerTotal === 21) {
        console.log('21!');
        setGameState(COMPARE_STATE);
    } else if (dealerTotal === 21) {
        console.log('21!');
        setGameState(COMPARE_STATE);
    } else {
        setGameState(BET_STATE);
    }
};

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
};

var checkTotal = function(cards) {
    var total = 0;
    for(var i in cards) {
        total += cards[i]; 
    }

    console.log(total);
    return total;
};

var compareHands = function() {
    playerTotal = checkTotal(playerCards);
    dealerTotal = checkTotal(dealerCards);
    if (dealerTotal > 21 || playerTotal <= 21 && playerTotal > dealerTotal) {
        console.log('Player wins!');
        playerWins++;
    } else if (playerTotal > 21 || dealerTotal <= 21 && dealerTotal > playerTotal) {
        console.log('Dealer wins! Pay up...');
        dealerWins++;
    }
    //enable New Game button
};

$('#bet30').click(bet);

startGame();
