// GRID
const gridApp = document.getElementById('grid-root');
// Create container for cards
const gridContainer = document.createElement('div');
gridContainer.setAttribute('class', 'container');
gridContainer.setAttribute('id', 'container');
gridApp.appendChild(gridContainer);

// Build a grid
function buildGrid(para) {
  para.forEach(beer => {
      // 1. Create a div with a card class
      const card = document.createElement('div');
      card.setAttribute('class', 'card');

      // 2. Create the content for the card
      const beerTitle = document.createElement('h3');
      beerTitle.textContent = beer.name;
          // Add image
      const imgSpan = document.createElement('span');
      const imgTag = document.createElement('img');
      imgTag.setAttribute('src', beer.image_url);
      imgSpan.appendChild(imgTag);
          // Add ABV
      const beerAbv = document.createElement('p');
      beerAbv.textContent = `ABV ${beer.abv}%`
          // Add CTA button
      const ctaButton = document.createElement('a');
      ctaButton.setAttribute('href', '');
      ctaButton.setAttribute('class', 'ctaButton')
      ctaButton.textContent = 'Add to cart';

      // 3. Each card will contain:
      card.appendChild(imgSpan);
      card.appendChild(beerTitle);
      card.appendChild(beerAbv);
      card.appendChild(ctaButton);

      // 4. Append the cards to the container element
      gridContainer.appendChild(card);
  })
  console.log('Grid built')
};

export { buildGrid };