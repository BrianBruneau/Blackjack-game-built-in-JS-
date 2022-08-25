# Project 1 : Game.

For my project, I have chosen to create the game of Blackjack.

## One peice at a time.

1. The first thing I did was start working on the javascript only. I built the majority of the logic and used a RandomIntegerGenerator for the card values. I was able to play the functioning game engine through the console.
3. The next thing I did was get my cards to show up on an HTML page, but I was still using the console to console.log random bugs and manually call each function. Ex playerHit();, playerStay, etc.
4. After I had most things working, and the cards were showing up on the page, I went about adding my buttons and score tables to the site. I was able to display winner scores, player money, player bet, in the tables. I got my buttons to call ther specific function.
5. Once that was all working, I went back into the Javascript and changed my RandomInteger function to an actual card Deck array that my deal functions could pull from. I did this to prevent the player/dealer form receiving matching or duplicate cards.
6. When the logic was all finished, and the game was working perfectly...ALMOST...every time, I started to put more work into the HTML and CSS. I styled my page in the ways I wanted, and got it looking pretty cool. It now looks like a decent blackjack game and plays as such!


## If I had more time

1. I would have added functionality for more than 1 player vs dealer.
2. I would have added a double down function, possibly.
3. Added a paypal function for users to gamble their lives away.


## Instructions..

1. Head to the game through the link provided below. 
2. Press the "new game" button. This will then prompt you to place a bet. $5, $10, or $30. (bet buttons will be highlighted.)
3. After you place your bet, the cards will be dealt. You have a chance to review your cards and the dealers cards, then you choose to either Hit or Stay.
4. If you Hit, and you dont bust(go over 21), you will be prompted again, either Hit, or Stay. If you stay, it will move on to the dealers turn.
5. The dealer will either hit, or stay. 
6. If the dealer busts, you win. If you bust, the dealer wins. If neither of you bust, the player with a higher total (total of the cards), wins.
7. That being said, if at any point either player gets 21, that player will automatically win and the game will end.
8. To start a new round, click on New game. Repeat.

## Link to Game.

https://blackjack-game-javscript.vercel.app/
