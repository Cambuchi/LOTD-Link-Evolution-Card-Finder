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
  const cardName = document.createElement('h3');
  cardName.classList = 'card-name';
  cardName.textContent = cardInfo['Card Name'];
  cardInfoContainer.append(cardName);

  const cardBooster = document.createElement('p');
  cardBooster.classList = 'card-booster';
  cardBooster.textContent =
    'Location: ' + cardInfo['Link Evolution Booster Pack'];
  cardInfoContainer.append(cardBooster);

  const cardAlternate = document.createElement('p');
  cardAlternate.classList = 'card-alternate';
  cardAlternate.textContent =
    'Alternate Location: ' + cardInfo['Link Evolution Alternate Location'];
  cardInfoContainer.append(cardAlternate);

  const cardRarity = document.createElement('p');
  cardRarity.classList = 'card-rarity';
  cardRarity.textContent = 'Rarity: ' + cardInfo['Rarity'];
  cardInfoContainer.append(cardRarity);

  const boosterImage = new Image();
  boosterImage.src = cardInfo['Booster Pack Image Link'];
  boosterImage.classList = 'booster-image';

  card.append(cardImage);
  card.append(cardInfoContainer);
  card.append(boosterImage);

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
  console.log(data);

  let promiseCardArray = [];

  for (let i = 0; i < data.length; i++) {
    promiseCardArray.push(getCardImage(data[i]['Card Name']));
  }

  Promise.all(promiseCardArray).then((cardImage) => {
    for (let i = 0; i < data.length; i++) {
      addCard(data[i], cardImage[i]);
    }
  });
};

const paginate = (cardArray, pageNum) => {
  let numPages = Math.ceil(cardArray.length / 5);
  const pageNums = document.getElementById('page-nums');
  if (numPages > 6) {
    if (pageNum > 6 && pageNum < numPages - 3) {
      for (let i = 1; i < 3; i++) {
        addPaginateNum(i);
      }
      addPaginateSkips();
      for (let i = pageNum - 2; i < pageNum + 3; i++) {
        addPaginateNum(i);
      }
      addPaginateSkips();
      for (let i = numPages - 1; i <= numPages; i++) {
        addPaginateNum(i);
      }
    } else if (pageNum <= 6) {
      for (let i = 1; i < pageNum + 2; i++) {
        addPaginateNum(i);
      }
      addPaginateSkips();
      for (let i = numPages - 2; i <= numPages; i++) {
        addPaginateNum(i);
      }
    } else if (pageNum >= numPages - 3) {
      for (let i = 1; i < 4; i++) {
        addPaginateNum(i);
      }
      addPaginateSkips();
      for (let i = pageNum - 2; i <= numPages; i++) {
        addPaginateNum(i);
      }
    }
  } else if (numPages < 6) {
    for (let i = 1; i < numPages; i++) {
      addPaginateNum(i);
    }
  }
};

const addPaginateNum = (i) => {
  const pageNums = document.getElementById('page-nums');
  const paginateNum = document.createElement('div');
  paginateNum.classList = 'paginate-num';
  paginateNum.id = `${i}`;
  paginateNum.textContent = i;

  pageNums.append(paginateNum);
};

const addPaginateSkips = () => {
  const pageNums = document.getElementById('page-nums');
  const paginateSkip = document.createElement('div');
  paginateSkip.classList = 'paginate-skip';
  paginateSkip.textContent = '. . .';

  pageNums.append(paginateSkip);
};

export { addCard, populateCards, paginate };
