let data = []; //Store raw API data here
let sorted = []; //Store sorted API data
const sortHigh = document.getElementById('sortHigh'); //get sort by abv high button
const sortLow = document.getElementById('sortLow'); //get sort by abv low button
const sortAZ = document.getElementById('sortAZ'); //get sort by name a-z button
const sortZA = document.getElementById('sortZA'); //get sort by name z-a button
let min; //store min value from filter input
let max;//store max value from filter input

// Get the div, accordion-root for dynamic content
const app = document.getElementById('accordion-root');
// create a container div
const container = document.createElement('div');
container.setAttribute('class', 'accordion-container');
container.setAttribute('id', 'accordion-container');
// append the container to the app/accordion-root
app.appendChild(container);

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

// Build Accordion
function buildAccordion(para) {
  para.forEach(beer => {
    // 1. Create a div with a card class
    const card = document.createElement('div');
    card.setAttribute('class', 'accItem');

    // 2. Create a button for the beer title
    const accBtn = document.createElement('button');
    accBtn.setAttribute('class', 'accordion');
    accBtn.textContent = beer.name;

    // 3. Create a div for the more info content
    const accInfo = document.createElement('div');
    accInfo.setAttribute('class', 'accordion-content');

    // 4. Create the content items (description, brewed date, abv, img)
    const p1 = document.createElement('p');
    p1.textContent = beer.description;
    // Add brewed date
    const p2 = document.createElement('p');
    p2.textContent = `First brewed in ${beer.first_brewed}`;
    // Add ABV value
    const p3 = document.createElement('p');
    p3.textContent = `ABV ${beer.abv}%`;
    // Add image
    const imgSpan = document.createElement('span');
    const imgTag = document.createElement('img');
    imgTag.setAttribute("src", beer.image_url);
    imgSpan.appendChild(imgTag);

    // 5. Append the items from (4.) to the div in (3.)
    accInfo.appendChild(imgSpan);
    accInfo.appendChild(p1);
    accInfo.appendChild(p2);
    accInfo.appendChild(p3);

    // Each card will contain:
    card.appendChild(accBtn);
    card.appendChild(accInfo);

    // Append the cards to the container element
    container.appendChild(card);
  })
  accordion();
  closeAll();
}

// Accordtion actions
function accordion() {
  const accordions = document.getElementsByClassName('accordion');
  for (let i = 0; i < accordions.length; i++) {
    accordions[i].addEventListener('click', function () {
      this.classList.toggle('is-open');
      const content = this.nextElementSibling;
      if (content.style.maxHeight) {
        // accordion is open, close it
        content.style.maxHeight = null;
      }
      else {
        // accordion is closed, open it
        content.style.maxHeight = content.scrollHeight + 'px';
      }
    });
  }
}

// Close Accordion
function closeAll() {
  const closeBtn = document.getElementById('close-btn');
  const accs = document.querySelectorAll('.accordion');
  closeBtn.addEventListener('click', function (event) {
    for (let i = 0; i < accs.length; i++) {
      accs[i].classList.remove('is-open');
      const content = accs[i].nextElementSibling;
      content.style.maxHeight = null;
    }
  });
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
const sorting = document.getElementById('sorting').getElementsByTagName('button'); //Grab sort buttons
const sortOptions = [nameAZ, nameZA, abvHigh, abvLow]; //create an array for sort functions
for (let i = 0; i < sorting.length; i++) {
  sorting[i].addEventListener('click', function() {
    sortOptions[i](sorted);
  });
}

// Event listener for filter button
filter.addEventListener('click', function () {
  console.log(sorted.length + ' filtered');
});

// Event listener for reset
reset.addEventListener('click', function () {
  console.log('reset button hit')
})