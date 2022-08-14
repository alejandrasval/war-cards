let deckId;
const newDeckBtn = document.getElementById("new-deck");
const drawCardsBtn = document.getElementById("draw-cards");
const cards = document.getElementById("cards");
const message = document.getElementById("message");
const remainigCards = document.getElementById("remaining-cards");

function handleClick() {
  fetch("https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/")
    .then((res) => res.json())
    .then((data) => {
      deckId = data.deck_id;
    });
}

newDeckBtn.addEventListener("click", handleClick);
drawCardsBtn.addEventListener("click", function () {
  fetch(`https://apis.scrimba.com/deckofcards/api/deck/${deckId}/draw/?count=2`)
    .then((res) => res.json())
    .then((data) => {
      cards.children[0].innerHTML = `
          <img src=${data.cards[0].image} class="card" />
      `;
      cards.children[1].innerHTML = `
          <img src=${data.cards[1].image} class="card" />
      `;
      const winnerText = cardWinner(data.cards[0], data.cards[1]);
      message.innerHTML = winnerText;

      remainigCards.innerHTML = `Remaining cards: ${data.remaining}`;
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
    return "You're the winner! 🥂";
  } else if (card2Index > card1Index) {
    return "Machine is the winner! 🥂";
  } else {
    return "War! ⚔️ ";
  }
}
