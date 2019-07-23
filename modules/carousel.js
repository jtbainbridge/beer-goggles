import { tns } from '../node_modules/tiny-slider/src/tiny-slider.js';

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

export { slider1, slider2 }