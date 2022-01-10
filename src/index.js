// import styles
import './styles/modern-normalize.css';
import './styles/main.css';
import './styles/cards.css';

// import modules
import initialize from './scripts/initialize';
import * as DOM from './scripts/dom';

import data from './assets/data/LinkEvolutionCardList.json';

const exampleSingleCard1 = {
  'Card Name': '"A" Cell Breeding Device',
  'Link Evolution Booster Pack': 'Tetsu Trudge Booster Pack',
  Rarity: 'Common',
  'Link Evolution Alternate Location': 'Challenge>GX>Amnael',
  'Booster Pack Image Link':
    'https://ms.yugipedia.com//9/96/TetsuTrudgePack-LE.png',
};

const exampleSingleCard2 = {
  'Card Name': 'Number 81: Superdreadnought Rail Cannon Super Dora',
  'Link Evolution Booster Pack': 'Cathy Katherine Booster Pack',
  Rarity: 'Rare',
  'Link Evolution Alternate Location': 'N/A',
  'Booster Pack Image Link':
    'https://ms.yugipedia.com//3/36/CathyKatherinePack-LE.png',
};

const exampleSingleCard3 = {
  'Card Name': 'Accellight',
  'Link Evolution Booster Pack': 'Kite Tenjo Booster Pack',
  Rarity: 'Rare',
  'Link Evolution Alternate Location': '',
  'Booster Pack Image Link':
    'https://ms.yugipedia.com//d/d7/KiteTenjoPack-LE.png',
};

window.data = data;

// IIFE to encapsulate site creation
(() => {
  // create the initial page structure
  initialize();
  DOM.populateCards(data, 1);
  DOM.paginate(data, 1);
})();
