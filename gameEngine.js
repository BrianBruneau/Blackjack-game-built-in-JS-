var DEAL_STATE = "DEAL";
var PLAYER_STATE = "PLAYER_STATE";
var COMPARE_STATE = "COMPARE_STATE";
var DEALER_STATE = "DEALER_STATE";
var BET_STATE = "BET_STATE";

// the game starts in the deal state.
var CURRENT_STATE = DEAL_STATE;

// declare winner variables
var playerWon = '***Player won!***'
var dealerWon = '***Dealer wins! Pay up...***'
var tie = '***TIE! No one wins. Pay up...***'

// 21 or Bust variables
var twentyOne = '~~ 21 !! ~~'
var busted = '!__BUST__!'


var playerCards = [];
var dealerCards = [];
var playerWins = 0;
var dealerWins = 0;
var playerMoney = 400;
var dealerMoney = 3000;
var playerBet = 0;

var bet1 = 5;
var bet2 = 10;
var bet3 = 'bet30';

var updateStats = function() {
    $('#playerW').html(playerWins);
    $('#dealerW').html(dealerWins);
    $('#playerM').html(playerMoney);
    $('#dealerM').html(dealerMoney);
    $('#playerB').html(playerBet);
}

var declareWinner = function(winner) {
    $('#winner_spot').html(winner)
}

var bustOr21 = function(player) {
    $('#bust_21').html(player)
}

function setGameState(gamestate) {
    CURRENT_STATE = gamestate;
    executeState();
}

function executeState() {
    if (CURRENT_STATE === PLAYER_STATE) {

    } else if (CURRENT_STATE === DEAL_STATE) {
        updateStats();
        $('#hit').prop("disabled", false);
        $('#stay').prop("disabled", false);
        startGame();
    } else if (CURRENT_STATE === DEALER_STATE) {
        updateStats();
        $('#hit').prop("disabled", true);
        $('#stay').prop("disabled", true);
        dealerHit();
    } else if (CURRENT_STATE === BET_STATE) {
        updateStats();
        window.alert('Please place a bet.')
        $('#hit').prop("disabled", true);
        $('#stay').prop("disabled", true);
    } else if (CURRENT_STATE === COMPARE_STATE) {
        updateStats();
        $('#hit').prop("disabled", true);
        $('#stay').prop("disabled", true);
        compareHands();
    }
}

var deal = function(cardNum) {
    var cardsArray = [];
    for (var i = 0; i < cardNum; i++) {
        do { 
        // choose a random card
        var randCard = getRandomInt(1, 52);
        
        // check to see if the card is already dealt
        var index = cardsArray.indexOf(randCard);
        var isUnique = index == -1;

        console.log("rand:", randCard, "indexOf:", index);
        if (isUnique) {
            console.log("yes added");
            cardsArray.push(randCard);
        } else {
            console.log("not added");
        }
    } while (!isUnique)
  } 

    return cardsArray;
};

var bet = function(event) {
    var name = event.target.name;
    if(name === 'bet30') {
        if (playerMoney >= 30) {
            playerBet += 30;
            playerMoney -= 30;
            updateStats();
            setGameState(DEAL_STATE);
        } else if (playerMoney < 30) {
            window.alert('Not enough money to bet that!')
            setGameState(BET_STATE);
        }
    } else if (name === 'bet10') {
        if (playerMoney >= 10) {
            playerBet += 10;
            playerMoney -= 10;
            updateStats();
            setGameState(DEAL_STATE);
        } else if (playerMoney < 10) {
            window.alert('Not enough money to bet that!')
            setGameState(BET_STATE);
        }
    } else if (name === 'bet5') {
        if (playerMoney >= 5) {
            playerBet += 5;
            playerMoney -= 5;
            updateStats();
            setGameState(DEAL_STATE);
        } else if (playerMoney < 5) {
            window.alert('Not enough money to bet that!')
            setGameState(DEAL_STATE);
        }
    }
}

var dealerHit = function() {
    console.log(dealerCards);
    var total = checkTotal(dealerCards);
        if(total <= 16) {
            dealerCards = dealerCards.concat(deal(1));
            cardCreator(dealerCards[dealerCards.length - 1], "#dealerTarget");
            setGameState(DEALER_STATE);
        } else if(total > 21) {
            bustOr21(busted);
            dealerStay();
        } else if(total === 21) {
            bustOr21(twentyOne);
            dealerStay();
        } else {
            dealerStay();
        }
};


var playerHit = function() {
    playerCards = playerCards.concat(deal(1));
    cardCreator(playerCards[playerCards.length - 1], "#playerTarget");
    var total = checkTotal(playerCards);
    if (total === 21) {
        playerWins++;
        setGameState(COMPARE_STATE);
        bustOr21(twentyOne);
    } else if (total < 21) {
        setGameState(PLAYER_STATE);
        console.log(total + ' Do you want to Hit, or Stay?');
    } else if (total > 21) {
        dealerWins++;
        bustOr21(busted);
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
    updateStats();
    playerCards = playerCards.concat(deal(2));
    dealerCards = dealerCards.concat(deal(2));

    cardCreator(playerCards[0], "#playerTarget");
    cardCreator(playerCards[1], "#playerTarget");

    cardCreator(dealerCards[0], "#dealerTarget");
    cardCreator(dealerCards[1], "#dealerTarget");

    console.log(playerCards, dealerCards);
    var playerTotal = checkTotal(playerCards);
    var dealerTotal = checkTotal(dealerCards);
    
    if (playerTotal === 21) {
        bustOr21(twentyOne);
        setGameState(COMPARE_STATE);
    } else if (dealerTotal === 21) {
        bustOr21(twentyOne);
        setGameState(COMPARE_STATE);
    } else {
        setGameState(PLAYER_STATE);
    }
};

var highFaces = function(card) {
    var face;
    if (card === 1 || 
        card === 14 || 
        card === 27 ||
        card === 40) {
            face = "A";
    } else if (card === 11 ||
        card === 24 ||
        card === 37 ||
        card === 50) {
            face = "J";
    } else if (card === 12 ||
        card === 25 ||
        card === 38 ||
        card === 51) {
            face = "Q";
    } else if (card === 13 ||
        card === 26 ||
        card === 39 ||
        card === 52) {
            face = "K";
    } else {
        face = 10;
    }
    return face;
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
};

var checkTotal = function(cards) {
    var total = 0;
    for(var i in cards) {
    var value = checkValue(cards[i]);
        total += value; 
    }
    
    // 
    for(var i in cards) {
        var AceValue = checkValue(cards[i]);
        if (AceValue == 11 && total > 21) {
            total -= 10;
        }
    }

    console.log(total);
    return total;
};

var compareHands = function() {
    playerTotal = checkTotal(playerCards);
    dealerTotal = checkTotal(dealerCards);
    var playerReturn = (playerBet * 2)
    if (dealerTotal > 21 || playerTotal <= 21 && playerTotal > dealerTotal) {
        declareWinner(playerWon);
        playerMoney += playerReturn;
        playerBet = 0;
        playerWins++;
        updateStats();
    } else if (playerTotal > 21 || dealerTotal <= 21 && dealerTotal > playerTotal) {
        declareWinner(dealerWon);
        dealerMoney += playerBet;
        playerBet = 0;
        dealerWins++;
        updateStats();
    } else if (playerTotal === dealerTotal) {
        declareWinner(tie);
        dealerMoney += playerBet;
        playerBet = 0;
        updateStats();
    }
    //enable New Game button
};

$('.bet').click(bet);


$('#hit').click(function(event){
    playerHit();
});

$('#stay').click(function(event){
    playerStay();
});

$('#new_game').click(function(event){
    playerCards = [];
    dealerCards = [];
    $('#playerTarget').html("");
    $('#dealerTarget').html("");
    $('#winner_spot').html("");
    $('#bust_21').html("");
    setGameState(BET_STATE);
});
