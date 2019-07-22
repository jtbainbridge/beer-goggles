// Get the div, accordion-root for dynamic content
const app = document.getElementById('accordion-root');
// create a container div
const container = document.createElement('div');
container.setAttribute('class', 'accordion-container');
// append the container to the app/accordion-root
app.appendChild(container);

// API Request
const request = new XMLHttpRequest();
request.open('GET', 'https://api.punkapi.com/v2/beers/', true);
request.onload = function () {
  // Store api object in a variable 'data'
  const data = JSON.parse(this.response);
  // Check status of request
  if (request.status >= 200 && request.status < 400) {
    data.forEach(beer => {
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
  } else {
    console.log('Error fetching data. Check URL or server status.')
  }
}
request.send();