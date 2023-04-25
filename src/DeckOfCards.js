import axios from "axios";
import { useState, useEffect } from "react";

const BASE_URL = "https://deckofcardsapi.com/api/deck";

/**
 *
 * Props: none
 *
 * State:
 * - deck : {success, deck_id, shuffled, remaining}
 * - cards: [{code, images, image, value, suit}, ...{}]
 * - remaining: number
 * - isLoading : boolean
 *
 * App -> DeckOfCards
 *
 */

function DeckOfCards() {
  const [deck, setDeck] = useState(null);
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  console.log(deck, "THE DECK STATE");

  useEffect(function fetchDeckOnMount() {
    async function fetchDeck() {
      const deckResult = await axios.get(`${BASE_URL}/new/shuffle/`);
      setDeck(deckResult.data);
    }
    fetchDeck();
    setIsLoading(false);
  }, []);

  async function getCard() {
    const card = await axios.get(`${BASE_URL}/${deck.deck_id}/draw/?count=1`);
    setCards((cards) => [...cards, card]);

    console.log(card, "THE CARD WE DREW");
  }

  if (isLoading === true) {
    return <div className="Loading">Loading Deck....</div>;
  }

  console.log(deck, "THE DECK STATE AFTER USE EFFECT");
  console.log(cards, "CARDS WE ADDED");

  return (
    <div className="DeckOfCards">
      <div className="Button">
        {cards.length < 52 ? (
          <button className="DeckOfCards-button" onClick={getCard}>
            Draw a card
          </button>
        ) : (
          <button onClick={() => alert("No cards remaining!")}>No Cards</button>
        )}
      </div>
      <div className="Cards">
        {cards.map((card) => {
          return (
            <img
              key={card.code}
              src={`${card.image}`}
              alt={`${card.code}`}
            ></img>
          );
        })}
      </div>
    </div>
  );
}

export default DeckOfCards;
