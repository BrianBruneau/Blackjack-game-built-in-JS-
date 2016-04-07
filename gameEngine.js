//gamestate variables
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

// Deck/Hand variables
var cardDeck = [];
var playerCards = [];
var dealerCards = [];

// score table variables.
var playerWins = 0;
var dealerWins = 0;
var playerMoney = 400;
var dealerMoney = 0;
var playerBet = 0;

setGameState(REFRESH_STATE);

// updates the score tables, whenever called.
var updateStats = function() {
    $('#playerW').html(playerWins);
    $('#dealerW').html(dealerWins);
    $('#playerM').html("$" + playerMoney);
    $('#dealerM').html("$" + dealerMoney);
    $('#playerB').html("$" + playerBet);
}

// displays WINNER message in provided location.
var declareWinner = function(winner) {
    $('#winner_spot').html(winner)
}
// displays BUST message in provided location.
var bustOr21 = function(player) {
    $('#bust_21').html(player)
}
// funntion to set the game state, which then sends the state to the execute function.
function setGameState(gamestate) {
    CURRENT_STATE = gamestate;
    executeState();
}

// executes which state the game is in. Determines the state, and runs whatever code that matches that state.
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

// creates a new deck for whenever necessary.
function createDeck() {
    for (var i = 1; i <= 52; i++) {
        cardDeck.push(i);
    }
}

// pulls a random card from the cardDeck, pushes it, then deletes it from the deck.
var randomC = ''
function getRandomCard(cardDeck) {
    randomC = Math.floor(Math.random() * cardDeck.length);
    card = cardDeck[randomC];
    cardDeck.splice(randomC, 1);
    return card;

}

// deals the amount of random cards specified, to the cards Array.
var deal = function(cardNum) {
    var cardsArray = [];
    for (var i = 0; i < cardNum; i++) {
        // choose a random card
        var randCard = getRandomCard(cardDeck);
        cardsArray.push(randCard);
  } 

    return cardsArray;
};
 
// determines which bet button is clicked, and the amount of the bet to place. 
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

// Starts game, deals cards, checks for 21.
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

// Dealer function to "Hit"
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

// Player function to "Hit"
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

// dealer stay function
var dealerStay = function() {
    setGameState(COMPARE_STATE);
};

// player stay function
var playerStay = function() {
    setGameState(DEALER_STATE);
};

// checks the card value(1-52), returns a value between (1-13) to be converted.
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

// checks the total of the 2 or more cards in your hand.
function checkTotal(cards) {
    var total = 0;
    for(var i in cards) {
        var value = checkValue(cards[i]);
        total += value; 
    }
    
    // Ace check 
    for(var i in cards) {
        var AceValue = checkValue(cards[i]);
        if (AceValue == 11 && total > 21) {
            total -= 10;
        }
    }

    console.log(total);
    return total;
};

// Compares the totals of the hands to determine winner.
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

// bet buttons function
$('.bet').click(bet);

// hit button function
$('#hit').click(function(event){
    playerHit();
});

// stay button function
$('#stay').click(function(event){
    playerStay();
});

// new game button functionality
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
