const displayWidth = window.innerWidth - 100;
const displayHeight = 400;

const sizeOfDataSet = 200;

const options = {
  rootNode: '#knn',
  width: displayWidth,
  height: displayHeight,
  backgroundColor: 'white',
  borderColor: '#000000',
  circleRadius: 5,
  circleFill: 'grey',
  circleStroke: 'white'
};

const types = ['Class A', 'Class B', 'Class C'];

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function createRandomEllipsoidCoordinates(width, height, cx, cy) {
  const rho = Math.sqrt(Math.random());
  const phi = Math.random() * Math.PI * 2;
  const rands = { x: getRandomInt(-width / 2, width / 2), y: getRandomInt(-height / 2, height / 2) };
  const x = rho * Math.cos(phi) * width / 2 + cx + rands.x;
  const y = rho * Math.sin(phi) * height / 2 + cy + rands.y;
  return { x, y };
}
function createRandomData() {
  const ellipsoidOptions = {
    'Class A': {
      width: displayWidth / 0.5,
      height: displayWidth / 0.5,
      cx: displayWidth * 4,
      cy: displayHeight * 4
    },

    'Class B': {
      width: displayWidth / 0.5,
      height: displayWidth / 0.5,
      cx: displayWidth * 3,
      cy: displayHeight * 2.5
    },
    'Class C': {
      width: displayWidth / 0.7,
      height: displayWidth / 0.7,
      cx: displayWidth * 2,
      cy: displayHeight * 2
    }
  };

  return Array.apply(null, Array(sizeOfDataSet)).
    map(d => {
      let random = Math.random();
      let type = types[0]
      if (random < 0.33) {
        type = types[0]
      }
      else if (random < 0.66) {
        type = types[1]
      }
      else {
        type = types[2]
      }
      const { width, height, cx, cy } = ellipsoidOptions[type];
      const { x, y } = createRandomEllipsoidCoordinates(width, height, cx, cy);
      return { x, y, type };
    });

}
const data = createRandomData();
const k = 3;
const vis = new d3ml.KNNVisualization(data, options, types, k);
vis.draw();

// Removing option to enable weighted knn
var settings = document.getElementsByClassName('settings');
var weighted_settings = settings[0].childNodes[1];
settings[0].removeChild(weighted_settings);

// Relocating position for knn interface
var neighbors_settings = settings[0].childNodes[0];
neighbors_settings.classList.add('mt-3');
document.querySelector('#interface').appendChild(neighbors_settings);