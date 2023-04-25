import axios from "axios";
import { useState, useEffect } from "react";

const BASE_URL = "https://deckofcardsapi.com/api/deck";

function DeckOfCards() {
  const [deck, setDeck] = useState(null);
  const [card, setCard] = useState([]);
  const [remaining, setRemaining] = useState(52);
  const [isLoading, setIsLoading] = useState(true);

  console.log(deck, "THE DECK STATE");

  useEffect(function fetchDeckOnMount() {
    async function fetchDeck() {
      const deckResult = await axios.get(`${BASE_URL}/new/`);
      setDeck(deckResult.data);
    }
    fetchDeck();
    setIsLoading(false);
  }, []);

  function getCards() {
    async function getCard() {
      const card = await axios.get(`${BASE_URL}/${deck.deck_id}/draw/?count=1`);
      setRemaining((r) => r - 1);
      console.log(card, "THE CARD WE DREW");
    }
    getCard();
  }

  if (isLoading === true) {
    return <div className="Loading">Loading Deck....</div>;
  }

  console.log(remaining, "THE NUMBER REMAINING");
  console.log(deck, "THE DECK STATE AFTER USE EFFECT");

  return (
    <div className="DeckOfCards">
      {remaining > 0 ? (
        <button className="DeckOfCards-button" onClick={getCards}>
          Draw a card
        </button>
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default DeckOfCards;
