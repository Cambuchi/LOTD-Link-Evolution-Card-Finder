const getJSONData = async () => {
  const response = await fetch('./LinkEvolutionCardList.json');
  return response.json();
};

const requestCardInfo = async (cardName) => {
  const response = await fetch(
    `https://yugipedia.com/api.php?action=query&titles=${cardName}&format=json&prop=pageimages&piprop=original`,
  );
  return response.json();
};

const addCardImages = async () => {
  const data = await getJSONData();
  let errors = [];
  console.log(data);
  let startIndex = 2000;
  for (let i = startIndex; i < startIndex + 1000; i++) {
    try {
      console.log(data[i]);
      let cardName = data[i]['Card Name'].replace('&', '%26').replace('#', '');
      console.log(cardName);
      let info = await requestCardInfo(cardName);
      console.log(info);
      let source = info['query']['pages'];
      console.log(source);
      let cardImageLink = source[Object.keys(source)[0]]['original']['source'];
      console.log(cardImageLink);
      data[i]['Card Image Link'] = cardImageLink;
      console.log(data[i]);
    } catch (e) {
      console.log(`ERROR: investigate api call for ${data[i]['Card Name']}`);
      errors.push(data[i]['Card Name']);
      continue;
    }
  }
  console.log(data);
  console.log(errors);
  return data;
};

// let data = addCardImages();
