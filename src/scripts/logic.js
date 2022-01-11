// module to coordinate dom manipulation and search functionality

import * as DOM from './dom';

// all search is based on the master JSON card list
import masterData from '../assets/data/LinkEvolutionCardList.json';

// load the initial information with the data and set page number
const load = () => {
  DOM.populateCards(masterData, 1);
  DOM.paginate(masterData, 1);
};

// search function, return a trimmed card list based on search value
const search = () => {
  let input = document.getElementById('search');
  // simple search that looks for index of input text in card text
  let filter = input.value.toUpperCase();
  let newList = masterData.filter((object) => {
    if (object['Card Name'].toUpperCase().indexOf(filter) > -1) {
      return object;
    }
  });
  return newList;
};

// actual trigger of the search, changes DOM based on new searched list
const searchConfirm = () => {
  let newList = search();
  DOM.populateCards(newList, 1);
  DOM.paginate(newList, 1);
};

// create the search listener on the input text element
const createSearch = () => {
  let input = document.getElementById('search');
  // wrap the keyup event in a time delay so that the Yugipedia API is not
  // flooded with calls on every keyup event, essentially keeps reseting a
  // timeout function on every keyup, and after 1 second of no keyup event
  // actually triggers the search
  let timeout = null;

  input.addEventListener('keyup', function (e) {
    clearTimeout(timeout);
    timeout = setTimeout(function () {
      searchConfirm();
    }, 1000);
  });
};

export { load, createSearch };
