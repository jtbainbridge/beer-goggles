// Get the div, accordion-root for dynamic content
const app = document.getElementById('accordion-root');
// create a container div
const container = document.createElement('div');
container.setAttribute('class', 'accordion-container');
container.setAttribute('id', 'accordion-container');
// append the container to the app/accordion-root
app.appendChild(container);

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

export { buildAccordion };