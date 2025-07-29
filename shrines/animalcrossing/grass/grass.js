const images = [
  'Grass1.png',
  'Grass2.png',
  'Grass3.png',
  'Grass4.png',
  'Grass5.png',
  'Grass6.png',
  'Grass7.png',
  'Grass8.png',
  'Grass9.png',
  'Grass10.png'
];

function setBackgroundByDate() {
  const currentDate = new Date();
  const dayOfYear = getDayOfYear(currentDate);
  const index = Math.floor((dayOfYear / 365) * images.length);

  // Get the base URL of your images - modify this according to your directory structure
  const baseUrl = '';

  // Set the background image
  document.body.style.backgroundImage = `url('${baseUrl}${images[index]}')`;
}

function getDayOfYear(date) {
  const start = new Date(date.getFullYear(), 0, 0);
  const diff = date - start;
  const oneDay = 1000 * 60 * 60 * 24;
  return Math.floor(diff / oneDay);
}

setBackgroundByDate();