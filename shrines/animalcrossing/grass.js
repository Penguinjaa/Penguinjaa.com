const winterImages = ['grass/Grass10.png'];
const springImages = ['grass/Grass1.png', 'grass/Grass2.png'];
const summerImages = ['grass/Grass3.png', 'grass/Grass4.png'];
const fallImages = ['grass/Grass6.png', 'grass/Grass7.png', 'grass/Grass8.png', 'grass/Grass9.png'];

function setBackgroundByDate() {
    const currentDate = new Date();
    const month = currentDate.getMonth() + 1;
    let images;
    if (month >= 1 && month <= 2 || month === 12) {
    images = winterImages;
    } else if (month >= 3 && month <= 5) {
    images = springImages;
    } else if (month >= 6 && month <= 8) {
    images = summerImages;
    } else {
    images = fallImages;
    }
    const dayOfMonth = currentDate.getDate();
    const index = dayOfMonth % images.length;
    document.getElementById('grass').style.backgroundImage = `url('${images[index]}')`;
}

setBackgroundByDate();