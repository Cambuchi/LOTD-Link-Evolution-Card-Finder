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

// retrieve the card image from the Yugipedia API response, if unable to get
// the card image, then return a plain card back image as a placeholder
const getCardImage = async (cardName) => {
  try {
    // Yugipedia API does not allow '&' or '#' signs in API calls
    const cleanedName = cardName.replace('&', '%26').replace('#', '');
    const wikiCardResponse = await requestCardInfo(cleanedName);
    // parse out the image link from the response
    const source = wikiCardResponse['query']['pages'];
    const cardImageLink = source[Object.keys(source)[0]]['original']['source'];
    return cardImageLink;
  } catch (e) {
    // if error in getting card image, return a default image
    return cardBack;
  }
};

// make the API request from Yugipedia and return a JSON response
const requestCardInfo = async (cardName) => {
  const response = await fetch(
    `https://yugipedia.com/api.php?action=query&titles=${cardName}&format=json&prop=pageimages&piprop=original`,
  );
  return response.json();
};

// populate the cards content container with current card list & page number
const populateCards = (cardArray, pageNum) => {
  // don't change card if pageNum is invalid
  let numPages = Math.ceil(cardArray.length / 5);
  if (pageNum === 0 || pageNum === numPages + 1) {
    return;
  }
  // using the page number, determine what slice of the list to populate with
  pageNum -= 1;
  let start = 0 + pageNum * 5;
  let end = 5 + pageNum * 5;
  let data = cardArray.slice(start, end);
  // create a promise array so that card order is maintained despite async
  let promiseCardArray = [];
  for (let i = 0; i < data.length; i++) {
    promiseCardArray.push(getCardImage(data[i]['Card Name']));
  }
  // use a Promise.all in order to maintain sort order of the card list
  Promise.all(promiseCardArray).then((cardImage) => {
    let content = document.getElementById('cards');
    content.innerHTML = '';
    for (let i = 0; i < data.length; i++) {
      addCard(data[i], cardImage[i]);
    }
  });
};

// create the pagination for the current card list and page number
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
  // target area to scroll up to on page clicks
  let scroll = document.getElementById('cards').offsetTop;
  // remove previous event handlers (so event handlers don't pile up)
  next.onclick = null;
  previous.onclick = null;
  // add the new click event handlers for previous and next
  next.onclick = function () {
    populateCards(cardArray, pageNum + 1);
    paginate(cardArray, pageNum + 1);
    window.scrollTo({ top: scroll - 130, behavior: 'smooth' });
  };
  previous.onclick = function () {
    populateCards(cardArray, pageNum - 1);
    paginate(cardArray, pageNum - 1);
    window.scrollTo({ top: scroll - 130, behavior: 'smooth' });
  };

  // logic for paginating when there are more than 7 pages
  if (numPages > 7) {
    // pagination logic for when number is in the middle ranges (3 > x > max-2)
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
      // pagination logic for when page number is at the start ranges (x < 4)
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
      // pagination logic for page number at the end ranges (x > max - 3)
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

// add a single pagination number, applying appropriate event handler, content,
// and styling
const addPaginateNum = (cardArray, i, pageNum) => {
  // target the pagination number container
  const pageNums = document.getElementById('page-nums');
  // target area to scroll up to on page clicks
  let scroll = document.getElementById('cards').offsetTop;
  // create the pagination number
  const paginateNum = document.createElement('div');
  paginateNum.classList = 'paginate-num';
  paginateNum.id = `${i}`;
  paginateNum.textContent = i;
  // apply styling if number matches current number
  if (pageNum === i) {
    paginateNum.classList.add('active');
  }
  // apply event handlers for when number gets clicked
  paginateNum.onclick = function () {
    populateCards(cardArray, i);
    paginate(cardArray, i);
    window.scrollTo({ top: scroll - 130, behavior: 'smooth' });
  };
  // add number into number container
  pageNums.append(paginateNum);
};

// add a "..." pagination item for long pagination lists
const addPaginateSkips = () => {
  // target the pagination number container
  const pageNums = document.getElementById('page-nums');
  // create the pagination skip
  const paginateSkip = document.createElement('div');
  paginateSkip.classList = 'paginate-skip';
  paginateSkip.textContent = '. . .';
  //add the pagination skip
  pageNums.append(paginateSkip);
};

export { populateCards, paginate };
