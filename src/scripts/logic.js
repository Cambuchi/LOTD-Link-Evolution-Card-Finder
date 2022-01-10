// module to coordinate dom manipulation and organize event handlers

import * as DOM from './dom';

import masterData from '../assets/data/LinkEvolutionCardList.json';

// load the initial information with the data and set page number
const load = () => {
  DOM.populateCards(masterData, 1);
  DOM.paginate(masterData, 1);
};

// search function, return a trimmed card list based on search value
const search = () => {
  let input = document.getElementById('search');
  let filter = input.value.toUpperCase();
  let newList = masterData.filter((object) => {
    if (object['Card Name'].toUpperCase().indexOf(filter) > -1) {
      return object;
    }
  });
  return newList;
};

const searchConfirm = () => {
  let newList = search();

  DOM.populateCards(newList, 1);
  DOM.paginate(newList, 1);
};

const createSearch = () => {
  let input = document.getElementById('search');
  let timeout = null;

  input.addEventListener('keyup', function (e) {
    clearTimeout(timeout);
    timeout = setTimeout(function () {
      searchConfirm();
    }, 1000);
  });
};

export { load, createSearch };
