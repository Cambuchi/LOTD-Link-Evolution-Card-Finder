// module to create the footer with javascript
const createFooter = () => {
  const footer = document.createElement('div');
  footer.id = 'footer';
  footer.textContent = 'Copyright © 2021 Cam Nguyen';

  return footer;
};

export default createFooter;
