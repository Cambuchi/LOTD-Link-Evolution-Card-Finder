// module for creating the content section

import searchImage from '../assets/images/search.png';

const createContent = () => {
  // create content container
  const content = document.createElement('div');
  content.id = 'content';

  // create the blurb
  const blurb = document.createElement('div');
  blurb.id = 'blurb';
  blurb.textContent =
    'Yu-Gi-Oh! Legacy of the Duelist: Link Evolution has over 10,000 cards to' +
    ' collect! For people like me who have not kept up with the Yu-Gi-Oh ' +
    "franchise and have no clue what 5D's, Zexal, Arc-V, or VRAINS means, " +
    'this card finder was made for you. Finding cards when you have no idea ' +
    'who "Gong Strong" or "Soul Burner" is can be a real hassle. This finder ' +
    'presents additional information to help ' +
    'alleviate this. Enjoy pictures of both the  card and booster pack ' +
    'characters, alternate farm locations, and information on rarity. ' +
    "It's time to D-D-D-D-Duel! (Note: after typing your search, there is a " +
    'slight delay before the search is performed. This avoids flooding the ' +
    'Yugipedia API with requests on each keyup.)';

  // create the searchbar
  const searchbar = document.createElement('div');
  searchbar.id = 'searchbar';
  // add the searchbar image
  const searchIcon = new Image();
  searchIcon.src = searchImage;
  searchIcon.id = 'search-icon';
  // add the searchbar text input
  const search = document.createElement('input');
  search.type = 'text';
  search.id = 'search';
  search.placeholder = 'Search for card names...';
  // append search items into the searchbar
  searchbar.append(searchIcon);
  searchbar.append(search);

  // create the card list
  const cards = document.createElement('ul');
  cards.id = 'cards';

  // create the pagination area
  const pagination = document.createElement('div');
  pagination.id = 'pagination';
  // create the previous pagination button
  const previous = document.createElement('div');
  previous.id = 'previous';
  previous.textContent = '<';
  // create the container for the pagination numbers
  const pageNums = document.createElement('div');
  pageNums.id = 'page-nums';
  // create the next pagination button
  const next = document.createElement('div');
  next.id = 'next';
  next.textContent = '>';
  // append pagination items into the paginate container
  pagination.append(previous);
  pagination.append(pageNums);
  pagination.append(next);

  // append all items into the content container
  content.append(blurb);
  content.append(searchbar);
  content.append(cards);
  content.append(pagination);

  return content;
};

export default createContent;
