var suit;
var face;

var cardCreator = function(suit, face, color) {
    face = checkValue(face)

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

    $("#target").append(card);
  }

