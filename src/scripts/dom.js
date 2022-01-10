// module to handle all of the DOM manipulation functions

import cardBack from '../assets/images/CardBackEN.png';

// adds a single card to the content areas
const addCard = async (cardInfo, cardImageLink) => {
  // target the content area to add a card to
  const cards = document.getElementById('cards');
  // create the card container
  const card = document.createElement('li');
  card.classList = 'card';
  // container for card image
  const cardImage = new Image();
  cardImage.src = cardImageLink;
  cardImage.classList = 'card-image';
  cardImage.style = '--img-ratio: 0.685';
  // container for card information
  const cardInfoContainer = document.createElement('div');
  cardInfoContainer.classList = 'card-info';
  // add data from card object into card info container
  // add the card name
  const cardName = document.createElement('h3');
  cardName.classList = 'card-name';
  cardName.textContent = cardInfo['Card Name'];
  cardInfoContainer.append(cardName);
  // add the card booster pack
  const cardBooster = document.createElement('p');
  cardBooster.classList = 'card-booster';
  cardBooster.textContent =
    'Location: ' + cardInfo['Link Evolution Booster Pack'];
  cardInfoContainer.append(cardBooster);
  // add the alternate location to farm
  const cardAlternate = document.createElement('p');
  cardAlternate.classList = 'card-alternate';
  cardAlternate.textContent =
    'Alternate Location: ' + cardInfo['Link Evolution Alternate Location'];
  cardInfoContainer.append(cardAlternate);
  // add the card rarity
  const cardRarity = document.createElement('p');
  cardRarity.classList = 'card-rarity';
  cardRarity.textContent = 'Rarity: ' + cardInfo['Rarity'];
  cardInfoContainer.append(cardRarity);
  // add the booster pack image
  const boosterImage = new Image();
  boosterImage.src = cardInfo['Booster Pack Image Link'];
  boosterImage.classList = 'booster-image';
  // append the card sections
  card.append(cardImage);
  card.append(cardInfoContainer);
  card.append(boosterImage);
  // add the card to the content area
  cards.append(card);
};

const getCardImage = async (cardName) => {
  try {
    const cleanedName = cardName.replace('&', '%26').replace('#', '');
    const wikiCardResponse = await requestCardInfo(cleanedName);
    const source = wikiCardResponse['query']['pages'];
    const cardImageLink = source[Object.keys(source)[0]]['original']['source'];

    return cardImageLink;
  } catch (e) {
    return cardBack;
  }
};

const requestCardInfo = async (cardName) => {
  const response = await fetch(
    `https://yugipedia.com/api.php?action=query&titles=${cardName}&format=json&prop=pageimages&piprop=original`,
  );
  return response.json();
};

const populateCards = (cardArray, pageNum) => {
  pageNum -= 1;
  let start = 0 + pageNum * 5;
  let end = 5 + pageNum * 5;

  let data = cardArray.slice(start, end);

  let promiseCardArray = [];

  for (let i = 0; i < data.length; i++) {
    promiseCardArray.push(getCardImage(data[i]['Card Name']));
  }

  Promise.all(promiseCardArray).then((cardImage) => {
    let content = document.getElementById('cards');
    content.innerHTML = '';
    for (let i = 0; i < data.length; i++) {
      addCard(data[i], cardImage[i]);
    }
  });
};

const paginate = (cardArray, pageNum) => {
  // determine number of pages based on array length, limit to 5 per page
  let numPages = Math.ceil(cardArray.length / 5);
  // if pageNum is out of range (previous or next at the limits), do nothing
  if (pageNum === 0 || pageNum === numPages + 1) {
    return;
  }
  // clear the current page numbers on deck
  let pageNums = document.getElementById('page-nums');
  pageNums.innerHTML = '';
  // change the next and previous buttons to apply to current card list
  let next = document.getElementById('next');
  let previous = document.getElementById('previous');
  // remove previous event handlers (so event handlers don't pile up)
  next.onclick = null;
  previous.onclick = null;
  // add the new click event handlers for previous and next
  next.onclick = function () {
    populateCards(cardArray, pageNum + 1);
    paginate(cardArray, pageNum + 1);
  };
  previous.onclick = function () {
    populateCards(cardArray, pageNum - 1);
    paginate(cardArray, pageNum - 1);
  };

  // logic for paginating when there are more than 7 pages
  if (numPages > 7) {
    // pagination logic for when number is in the middle ranges
    if (pageNum > 3 && pageNum < numPages - 2) {
      for (let i = 1; i < 2; i++) {
        addPaginateNum(cardArray, i, pageNum);
      }
      addPaginateSkips();
      for (let i = pageNum - 1; i < pageNum + 2; i++) {
        addPaginateNum(cardArray, i, pageNum);
      }
      addPaginateSkips();
      for (let i = numPages; i <= numPages; i++) {
        addPaginateNum(cardArray, i, pageNum);
      }
      // pagination logic for when page number is at the start ranges
    } else if (pageNum === 1) {
      for (let i = 1; i < pageNum + 4; i++) {
        addPaginateNum(cardArray, i, pageNum);
      }
      addPaginateSkips();
      for (let i = numPages - 1; i <= numPages; i++) {
        addPaginateNum(cardArray, i, pageNum);
      }
    } else if (pageNum === 2) {
      for (let i = 1; i < pageNum + 3; i++) {
        addPaginateNum(cardArray, i, pageNum);
      }
      addPaginateSkips();
      for (let i = numPages - 1; i <= numPages; i++) {
        addPaginateNum(cardArray, i, pageNum);
      }
    } else if (pageNum === 3) {
      for (let i = 1; i < pageNum + 2; i++) {
        addPaginateNum(cardArray, i, pageNum);
      }
      addPaginateSkips();
      for (let i = numPages - 1; i <= numPages; i++) {
        addPaginateNum(cardArray, i, pageNum);
      }
      // pagination logic for when page number is at the end ranges
    } else if (pageNum === numPages) {
      for (let i = 1; i < 3; i++) {
        addPaginateNum(cardArray, i, pageNum);
      }
      addPaginateSkips();
      for (let i = pageNum - 3; i <= numPages; i++) {
        addPaginateNum(cardArray, i, pageNum);
      }
    } else if (pageNum === numPages - 1) {
      for (let i = 1; i < 3; i++) {
        addPaginateNum(cardArray, i, pageNum);
      }
      addPaginateSkips();
      for (let i = pageNum - 2; i <= numPages; i++) {
        addPaginateNum(cardArray, i, pageNum);
      }
    } else if (pageNum === numPages - 2) {
      for (let i = 1; i < 3; i++) {
        addPaginateNum(cardArray, i, pageNum);
      }
      addPaginateSkips();
      for (let i = pageNum - 1; i <= numPages; i++) {
        addPaginateNum(cardArray, i, pageNum);
      }
    }
    // when there are 7 or less pages, just render all of the pagination nums
  } else if (numPages <= 7) {
    for (let i = 1; i <= numPages; i++) {
      addPaginateNum(cardArray, i, pageNum);
    }
  }
};

const addPaginateNum = (cardArray, i, pageNum) => {
  const pageNums = document.getElementById('page-nums');
  const paginateNum = document.createElement('div');
  paginateNum.classList = 'paginate-num';
  paginateNum.id = `${i}`;
  paginateNum.textContent = i;

  if (pageNum === i) {
    paginateNum.classList.add('active');
  }

  paginateNum.onclick = function () {
    populateCards(cardArray, i);
    paginate(cardArray, i);
  };

  pageNums.append(paginateNum);
};

const addPaginateSkips = () => {
  const pageNums = document.getElementById('page-nums');
  const paginateSkip = document.createElement('div');
  paginateSkip.classList = 'paginate-skip';
  paginateSkip.textContent = '. . .';

  pageNums.append(paginateSkip);
};

export { populateCards, paginate };
