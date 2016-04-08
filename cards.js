var suit;
var face;
// Creates the peices of the card, and appends them together. Then sends the full card to the page.
var cardCreator = function(cardNumber, place) {
    var suit = getSuit(cardNumber);
    var color = getColor(suit);

    var value = checkValue(cardNumber)

    if (value === 10 || value === 11) {
      face = highFaces(cardNumber);
    } else {
      face = value;
    }

    var card = document.createElement("div");
      card.className = "outline shadow rounded " + color;

    var cardTop = document.createElement("div");
      cardTop.className = "top";

    var spanTopTitle = document.createElement("span");
      spanTopTitle.textContent = face;

    var spanTopSuit = document.createElement("span");
      spanTopSuit.innerHTML = suit

    var bigSuit = document.createElement("h1");
      bigSuit.innerHTML = suit;

    var cardBottom = document.createElement("div");
      cardBottom.className = "bottom"

    var spanBottomTitle = document.createElement("span");
      spanBottomTitle.textContent = face;

    var spanBottomSuit = document.createElement("span");
      spanBottomSuit.innerHTML = suit;


    cardTop.appendChild(spanTopTitle);
    cardTop.appendChild(spanTopSuit);
    cardBottom.appendChild(spanBottomTitle);
    cardBottom.appendChild(spanBottomSuit);
    card.appendChild(cardTop);
    card.appendChild(bigSuit);
    card.appendChild(cardBottom);

    $(place).append(card);
  }

// uses the previously converted variable to determine the suit.
var getSuit = function(cardNumber) {
  if (cardNumber >= 1 && cardNumber <= 12) {
    return "&clubs;";
  } else if (cardNumber >= 13 && cardNumber <= 24) {
    return "&diams;";
  } else if (cardNumber >= 25 && cardNumber <= 36) {
    return "&hearts;";
  } else if (cardNumber >= 37 && cardNumber <= 52) {
    return "&spades;";
  }
}
// uses the determined suit to assign color.
var getColor = function(suit) {
  if (suit === "&clubs;" || suit === "&spades;") {
    return "blackCard";
  } else {
    return "redCard";
  }
}
// determines which values are equal to face cards, and if not a face card, it returns the value as the face.
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
