
var DEAL_STATE = "DEAL";
var PLAYER_STATE = "PLAYER_STATE";
var COMPARE_STATE = "COMPARE_STATE";
var DEALER_STATE = "DEALER_STATE";
var BET_STATE = "BET_STATE";
var REFRESH_STATE = "REFRESH_STATE";



// declare winner variables
var playerWon = '***Player won!***'
var dealerWon = '***Dealer wins! Pay up...***'
var tie = '***TIE! No one wins. Pay up...***'
var hitStay = '...Do you want to hit or stay?'

// 21 or Bust variables
var twentyOne = '~~ 21 !! ~~'
var busted = '!__BUST__!'

var cardDeck = [];
var playerCards = [];
var dealerCards = [];
var playerWins = 0;
var dealerWins = 0;
var playerMoney = 400;
var dealerMoney = 0;
var playerBet = 0;

setGameState(REFRESH_STATE);

var updateStats = function() {
    $('#playerW').html(playerWins);
    $('#dealerW').html(dealerWins);
    $('#playerM').html("$" + playerMoney);
    $('#dealerM').html("$" + dealerMoney);
    $('#playerB').html("$" + playerBet);
}

var dealerTotal = function(total) {

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
    if (CURRENT_STATE === REFRESH_STATE) {
        $('.bet').prop("disabled", true);
        $('#hit').prop("disabled", true);
        $('#stay').prop("disabled", true); 

    } else if (CURRENT_STATE === DEAL_STATE) {
        updateStats();
        $("#better").removeClass("betBox");
        $('.bet').prop("disabled", true);
        $('#hit').prop("disabled", false);
        $('#stay').prop("disabled", false);
        $('#new_game').prop("disabled", true);
        startGame();
    } else if (CURRENT_STATE === DEALER_STATE) {
        updateStats();
        $("#better").removeClass("betBox");
        $('.bet').prop("disabled", true);
        $('#hit').prop("disabled", true);
        $('#stay').prop("disabled", true);
        $('#new_game').prop("disabled", true);
        dealerHit();
    } else if (CURRENT_STATE === BET_STATE) {
        updateStats();
        createDeck();
        $("#better").addClass("betBox");
        $('.bet').prop("disabled", false);
        $('#hit').prop("disabled", true);
        $('#stay').prop("disabled", true);
        $('#new_game').prop("disabled", true);
    } else if (CURRENT_STATE === COMPARE_STATE) {
        updateStats();
        $("#better").removeClass("betBox");
        $('.bet').prop("disabled", true);
        $('#hit').prop("disabled", true);
        $('#stay').prop("disabled", true);
        $('#new_game').prop("disabled", false);
        compareHands();
    } else if (CURRENT_STATE === PLAYER_STATE) {
        $("#better").removeClass("betBox");
        $('#new_game').prop("disabled", true);
    }
}

  function createDeck() {
    for (var i = 1; i <= 52; i++) {
        cardDeck.push(i);
    }
}

var randomC = ''
function getRandomCard(cardDeck) {
    randomC = Math.floor(Math.random() * cardDeck.length);
    card = cardDeck[randomC];
    cardDeck.splice(randomC, 1);
    return card;

}

var deal = function(cardNum) {
    var cardsArray = [];
    for (var i = 0; i < cardNum; i++) {
        // choose a random card
        var randCard = getRandomCard(cardDeck);
        cardsArray.push(randCard);
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
        $('#hitOrStay').html(playerTotal + twentyOne);
        bustOr21(twentyOne);
        setGameState(COMPARE_STATE);
    } else if (dealerTotal === 21) {
        $('#dealerTotal').html(dealerTotal + twentyOne);
        bustOr21(twentyOne);
        setGameState(COMPARE_STATE);
    } else {
        $('#dealerTotal').html(dealerTotal);
        $('#hitOrStay').html(playerTotal + hitStay);
        setGameState(PLAYER_STATE);
    }
};

var dealerHit = function() {
    console.log(dealerCards);
    var total = checkTotal(dealerCards);
        if(total <= 16) {
            $('#dealerTotal').html(total);
            dealerCards = dealerCards.concat(deal(1));
            cardCreator(dealerCards[dealerCards.length - 1], "#dealerTarget");
            setGameState(DEALER_STATE);
        } else if(total > 21) {
            $('#dealerTotal').html(total + busted);
            bustOr21(busted);
            dealerStay();
        } else if(total === 21) {
            $('#dealerTotal').html(total + twentyOne);
            bustOr21(twentyOne);
            dealerStay();
        } else {
            $('#dealerTotal').html(total);
            dealerStay();
        }
};


var playerHit = function() {
    playerCards = playerCards.concat(deal(1));
    cardCreator(playerCards[playerCards.length - 1], "#playerTarget");
    var Ptotal = checkTotal(playerCards);
    var Dtotal = checkTotal(dealerCards);

    if (Ptotal === 21) {
        $('#hitOrStay').html(Ptotal + twentyOne);
        $('#dealerTotal').html(Dtotal);
        playerWins++;
        setGameState(COMPARE_STATE);
        bustOr21(twentyOne);
    } else if (Ptotal < 21) {
        $('#hitOrStay').html(Ptotal + hitStay);
        $('#dealerTotal').html(Dtotal);
        setGameState(PLAYER_STATE);
    } else if (Ptotal > 21) {
        $('#hitOrStay').html(Ptotal + busted);
        $('#dealerTotal').html(Dtotal);
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

function checkTotal(cards) {
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
    $('#hitOrStay').html(playerTotal);
    $('#dealerTotal').html(dealerTotal);
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
    cardDeck = [];
    $('#playerTarget').html("");
    $('#dealerTarget').html("");
    $('#winner_spot').html("");
    $('#bust_21').html("");
    $('#hitOrStay').html("");
    $('#dealerTotal').html("");
    setGameState(BET_STATE);
});
