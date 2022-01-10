// initialize module establishing general html structure
// import styles of each section
import '../styles/header.css';
import '../styles/content.css';
import '../styles/footer.css';

// import modules for each section
import createHeader from '../scripts/header';
import createContent from '../scripts/content';
import createFooter from '../scripts/footer';

// create the page
const initialize = () => {
  // target the body
  const body = document.body;
  // create the header
  const header = createHeader();
  // create the content area
  const content = createContent();
  // create the footer
  const footer = createFooter();

  // append all to body
  body.append(header);
  body.append(content);
  body.append(footer);
};

export default initialize;
