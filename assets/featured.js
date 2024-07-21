    var images = [
        "/images/featured/strobby.jpg",
        "/images/featured/beedo.jpg",
        "/images/featured/jerm.jpg",
        "/images/featured/kodama.jpg",
        "/images/featured/olimar.jpg",
        "/images/featured/tacos.jpg",
        "/images/featured/waffle.jpg",
        "/images/featured/whomp.jpg",
        "/images/featured/akira3.jpg",
        "/images/featured/akira-bike.jpg",
        "/images/featured/akira-laser.jpg",
        "/images/featured/akira-title.jpg",
        "/images/featured/animal-crossing-title.jpg",
        "/images/featured/bomberman-cd.jpg",
        "/images/featured/discovery.jpg",
        "/images/featured/donda-cover.jpg",
        "/images/featured/eva.jpg",
        "/images/featured/eva-ep6.jpg",
        "/images/featured/evangelion-1.jpg",
        "/images/featured/hand.jpg",
        "/images/featured/ituneslovelockdown.jpg",
        "/images/featured/kanyegaj.jpg",
        "/images/featured/kids-see-ghosts.jpg",
        "/images/featured/macroblank.jpg",
        "/images/featured/macross.jpg",
        "/images/featured/mf-doom-madvillainy.jpg",
        "/images/featured/ac-fireworks.jpg",
        "/images/featured/sonic-3d-title.jpg",
        "/images/featured/taki.jpg",
        "/images/featured/tetsuo-bike.jpg",
    ];
    
    var preloadedImages = [];

function preloadImages() {
  for (var i = 0; i < images.length; i++) {
    var img = new Image();
    img.src = images[i];
    preloadedImages.push(img);
  }
}

function featuredImage() {
    var featuredImage = preloadedImages[Math.floor(Math.random() * preloadedImages.length)];

    var imageElement = document.createElement("img");
    imageElement.src = featuredImage.src;
    imageElement.style.width = "100%";
    imageElement.style.height = "100%";
    imageElement.style.objectFit = "cover"; 
    var container = document.getElementById("featured-image");
    container.innerHTML = "";
    container.appendChild(imageElement);
}

preloadImages();
featuredImage();
setInterval(featuredImage, 10000);