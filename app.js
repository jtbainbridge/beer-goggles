import { buildAccordion } from './modules/accordion.js';

let data = []; //Store raw API data here
let sorted = []; //Store sorted API data
const sortHigh = document.getElementById('sortHigh'); //get sort by abv high button
const sortLow = document.getElementById('sortLow'); //get sort by abv low button
const sortAZ = document.getElementById('sortAZ'); //get sort by name a-z button
const sortZA = document.getElementById('sortZA'); //get sort by name z-a button
let min; //store min value from filter input
let max;//store max value from filter input

// API Request
const request = new XMLHttpRequest();
request.open('GET', 'https://api.punkapi.com/v2/beers/', true);
request.onload = function () {
  // Store API object in a variable 'data'
  data = JSON.parse(this.response);
  // Check status of request
  if (request.status >= 200 && request.status < 400) {
    // call initial setup function
    setupApp(data)
  } else {
    document.getElementById('accordion-container').innerHTML = 'Sorry there has been an issue trying to fetch the data. Please try again later.'
    console.log('Error fetching data. Check URL or server status.')
  }
}
request.send();

// Initial setup
function setupApp(para) {
  initSort(para); //Sort data from API
  buildAccordion(sorted); //Build Accordion
  buildGrid(sorted); //Build Grid
}


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
  console.log('Grid built with ' + data.length + ' beers.')
};

function refreshGrid() {
  document.getElementById('container').innerHTML = '';
  buildGrid(sorted);
  console.log('Grid refreshed');
}

// initial sort by name A-Z
function initSort(para) {
  sorted = para.sort((a, b) => {
      if (a.name > b.name) {
          return 1;
      } else {
          return -1;
      }
  })
}

// Sort name by A-Z
function nameAZ(para) {
  sorted = para.sort((a, b) => {
      if (a.name > b.name) {
          return 1;
      } else {
          return -1;
      }
  })
  refreshGrid()
}

// Sort name by Z-A
function nameZA(para) {
  sorted = para.sort((a, b) => {
      if (a.name < b.name) {
          return 1;
      } else {
          return -1;
      }
  })
  refreshGrid()
}
// Sort ABV by high-low
function abvHigh(para) {
  sorted = para.sort((a, b) => {
      if (a.abv < b.abv) {
          return 1;
      } else {
          return -1;
      }
  })
  refreshGrid()
}

// Sort ABV by low-high
function abvLow(para) {
  sorted = para.sort((a, b) => {
      if (a.abv > b.abv) {
          return 1;
      } else {
          return -1;
      }
  })
  refreshGrid()
}

// Sorting button states and actions
const sorting = document.getElementById('sorting').getElementsByTagName('button'); // Grab sort buttons
const sortOptions = [nameAZ, nameZA, abvHigh, abvLow]; // create an array for sort functions
for (let i = 0; i < sorting.length; i++) {
  sorting[i].addEventListener('click', function() {
    sortOptions[i](sorted);
    let current = document.getElementsByClassName('activeSrt');
    current[0].className = current[0].className.replace('activeSrt', '');
    this.className += 'activeSrt';
  });
}

// Filter results and sort by largest first
function filterResults(para) {
  sorted = para.filter(beer => beer.abv >= min && beer.abv <= max);
};

// Event listener for filter button
filter.addEventListener('click', function () {
  min = document.getElementById('min').value;
  max = document.getElementById('max').value;
  if (min === '') {min = 0}; // logic added incase the field is left blank
  if (max === '') {max = 100}; // logic added incase the field is left blank
  filterResults(data);
  refreshGrid();
  console.log(sorted.length + ' filtered');
});

// Event listener for reset
reset.addEventListener('click', function () {
  document.getElementById('container').innerHTML = '';
  document.getElementById('min').value = '';
  document.getElementById('max').value = '';
  initSort(data);
  buildGrid(sorted);
  console.log('reset button hit');
})


// SLIDER OPTIONS
const slider1 = tns({
  container: '.my-slider1',
  items: 1,
  slideBy: 'page',
  mouseDrag: true,
  swipeAngle: false,
  speed: 400,
  navPosition: 'bottom',
  arrowKeys: true
});

const slider2 = tns({
  container: '.my-slider2',
  items: 3,
  slideBy: 'page',
  edgePadding: 10,
  controls: false,
  mouseDrag: true,
  swipeAngle: false,
  speed: 400,
  navPosition: 'bottom',
  responsive: {
      "350": {
          items: 2,
          controls: false
      },
      "500": {
          items: 3
      },
      "1024": {
          items: 4
      }
  }
});