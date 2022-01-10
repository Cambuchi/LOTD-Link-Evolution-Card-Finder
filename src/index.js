// import styles
import './styles/modern-normalize.css';
import './styles/main.css';
import './styles/cards.css';

// import modules
import initialize from './scripts/initialize';
import { load, createSearch } from './scripts/logic';

// IIFE to encapsulate site creation
(() => {
  // create the initial page structure
  initialize();
  // load initial page data
  load();
  // add search functionality
  createSearch();
})();
