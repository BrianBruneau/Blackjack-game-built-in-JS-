var suit;
var face;

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

var getColor = function(suit) {
  if (suit === "&clubs;" || suit === "&spades;") {
    return "blackCard";
  } else {
    return "redCard";
  }
}
