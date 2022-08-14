let deckId;
let computerScore = 0;
let userScore = 0;
const newDeckBtn = document.getElementById("new-deck");
const drawCardsBtn = document.getElementById("draw-cards");
const user = document.getElementById("user");
const computer = document.getElementById("computer");
const message = document.getElementById("message");
const remainigCards = document.getElementById("remaining-cards");
const computerScoreEl = document.getElementById("computer-score");
const userScoreEl = document.getElementById("user-score");

function handleClick() {
  fetch("https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/")
    .then((res) => res.json())
    .then((data) => {
      deckId = data.deck_id;
      remainigCards.innerHTML = `Remaining cards: ${data.remaining}`;
    });
}

newDeckBtn.addEventListener("click", handleClick);
drawCardsBtn.addEventListener("click", function () {
  fetch(`https://apis.scrimba.com/deckofcards/api/deck/${deckId}/draw/?count=2`)
    .then((res) => res.json())
    .then((data) => {
      user.children[0].innerHTML = `
          <img src=${data.cards[0].image} class="card" />
      `;
      computer.children[0].innerHTML = `
          <img src=${data.cards[1].image} class="card" />
      `;
      const winnerText = cardWinner(data.cards[0], data.cards[1]);
      message.innerHTML = winnerText;

      remainigCards.innerHTML = `Remaining cards: ${data.remaining}`;

      if (data.remaining === 0) {
        drawCardsBtn.disabled = true;
        if (userScore > computerScore) {
          message.innerHTML = "You win! 🥳🎉";
        } else if (computerScore > userScore) {
          message.innerHTML = "Computer wins! 🤖";
        } else {
          message.innerHTML = "It's a tie game!";
        }
      }
    });
});

function cardWinner(card1, card2) {
  const values = [
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "JACK",
    "QUEEN",
    "KING",
    "ACE",
  ];
  const card1Index = values.indexOf(card1.value);
  const card2Index = values.indexOf(card2.value);
  console.log("card 1:", card1Index);
  console.log("card 2:", card2Index);

  if (card1Index > card2Index) {
    userScore++;
    userScoreEl.innerHTML = `My score: ${userScore}`;
    return "You're the winner! 🥂";
  } else if (card2Index > card1Index) {
    computerScore++;
    computerScoreEl.innerHTML = `Computer score: ${computerScore}`;
    return "Machine is the winner! 🥂";
  } else {
    return "War! ⚔️ ";
  }
}
