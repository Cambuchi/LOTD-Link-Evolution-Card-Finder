// module for creating the content section

// import cardData from '../assets/LinkEvolutionCardList.json';
import searchImage from '../assets/images/search.png';

const createContent = () => {
  const content = document.createElement('div');
  content.id = 'content';

  const searchbar = document.createElement('div');
  searchbar.id = 'searchbar';

  const searchIcon = new Image();
  searchIcon.src = searchImage;
  searchIcon.id = 'search-icon';

  const search = document.createElement('input');
  search.type = 'text';
  search.id = 'search';
  search.placeholder = 'Search for card names...';

  searchbar.append(searchIcon);
  searchbar.append(search);

  const cards = document.createElement('ul');
  cards.id = 'cards';

  const pagination = document.createElement('div');
  pagination.id = 'pagination';

  const previous = document.createElement('div');
  previous.id = 'previous';
  previous.textContent = '<';

  const pageNums = document.createElement('div');
  pageNums.id = 'page-nums';

  const next = document.createElement('div');
  next.id = 'next';
  next.textContent = '>';

  pagination.append(previous);
  pagination.append(pageNums);
  pagination.append(next);

  content.append(searchbar);
  content.append(cards);
  content.append(pagination);

  return content;
};

export default createContent;
