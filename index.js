const getDeck = async (num) => {
    const req = await fetch(`https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=${num}`);
    const deck = await req.json()
    // console.log(deck)
    return [deck, deck.deck_id]
}

const getCardElement = async (id, turn) => {
    const req = await fetch(`https://deckofcardsapi.com/api/deck/${id}/draw/?count=1`)
    const card = await req.json()
    const imgLink = card.cards[0].image
    const reqImg = await fetch(imgLink);
    const blob = await reqImg.blob();
    const url = URL.createObjectURL(blob);
    const img = document.createElement('img')
    img.src = url
    
    document.getElementById(turn).appendChild(img)
}


const runGame = async () => {
    const deck = await getDeck(1);
    const deckId = deck[1]
    let playerScore = 0
    let dealerScore = 0
    let turn = 'player'
    document.querySelector('button').addEventListener('click', async () => {
        if (turn == 'player') {
            let card = await getCardElement(deckId, turn);
            try {
                playerScore += parseInt(card.cards[0].value)
            } catch (e) {
                console.log(e)
                playerScore += 10
            }
            // playerScore += parseInt(card.cards[0].value) || 10
            console.log('player score ' + playerScore)
            turn = 'dealer'
        } else {
            let card = await getCardElement(deckId, turn)
            try {
                dealerScore += parseInt(card.cards[0].value)
            } catch (e) {
                dealerScore += 10
            }
            console.log('dealer score ' + dealerScore)

            turn = 'player'
        }

        // if ()
    })
}

runGame()



// const logic = async () => {
//     const deck = await getDeck(1); // returns an array [deck, deckId]
//     const deckId = deck[1] // deck id
//     const cards = await getCards(2, deckId); 
    
//     console.log(cards)
    
//     // console.log(await getCards())

// }

// logic()

// document.querySelector('button').addEventListener('click', async (e) => {
//     const deck = await getDeck(1); // returns an array [deck, deckId]
//     const deckId = deck[1] // deck id
//     const playerCards = await getCards(2, deckId);
//     let playerTotal = 0;
//     for (let card of playerCards.cards) {
//         playerTotal += parseInt(card.value)
//     }
//     console.log('plater total ' + playerTotal)
    
//     for (let card of playerCards.cards) {
//         let req = await fetch(card.image);
//         let blob = await req.blob();
//         let url = URL.createObjectURL(blob);
//         let img = document.createElement('img')
//         img.src = url
//         document.getElementById('player').appendChild(img)
        
//     }

//     const dealerCards = await getCards(2, deckId);
//     let dealerTotal = 0;
//     for (let card of dealerCards.cards) {
//         dealerTotal += parseInt(card.value)
//     }
//     console.log('dealer total ' + dealerTotal)

//     for (let card of dealerCards.cards) {
//         let req = await fetch(card.image);
//         let blob = await req.blob();
//         let url = URL.createObjectURL(blob);
//         let img = document.createElement('img')
//         img.src = url
//         document.getElementById('dealer').appendChild(img)

//     }
    
// })




// const getCard = async (num, id) => {
//     const response = await fetch(`https://deckofcardsapi.com/api/deck/${id}/draw/?count=${num}`)
//     const cards = await response.json()
//     for (let card of cards.cards)
//     fetch(`${card.image}`)
//     .then(response => response.blob())
//     .then(blob => {
//         const url = URL.createObjectURL(blob);
//         const img = document.createElement('img');
//         img.src = url;
//         document.getElementById('cards').appendChild(img)
//         // document.body.appendChild(img);
        
//   });
// }

// fetch(`https://deckofcardsapi.com/api/deck/new/draw/?count=1`)
//   .then(response => response.blob())
//   .then(blob => {
//     const url = URL.createObjectURL(blob);
//     const img = document.createElement('img');
//     img.src = url;
//     document.body.appendChild(img);
//   });



// document.getElementById('img').src = getDecks(1)

// const deck1 = getDeck(2)
// console.log(deck1.deck_id)
