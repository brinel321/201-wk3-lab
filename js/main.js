'use strict'; //highlights any mistakes made with variables
console.log('js is linked');

// constructor for products
function Products(filename) {
  this.filename = filename;
  this.votes = 0;
  this.shown = 0;
  Products.allProducts.push(this);
}

Products.allProducts = [];
var numProductsDisplayed = 3;
var lastIndexUsed = [0, 1, 2, 3, 4, 5];
// var lastIndexUsed = Array(Products.allProducts.length).fill(0);
var numPoductsClicked = 0;
var numMaxClicks = 25;
var imgPrint = [];

new Products('img/bathroom.jpg');
new Products('img/boots.jpg');
new Products('img/bubblegum.jpg');
new Products('img/bag.jpg');
new Products('img/banana.jpg');
new Products('img/chair.jpg');
new Products('img/cthulhu.jpg');
new Products('img/dog-duck.jpg');
new Products('img/dragon.jpg');
new Products('img/pen.jpg');
new Products('img/pet-sweep.jpg');
new Products('img/scissors.jpg');
new Products('img/shark.jpg');
new Products('img/sweep.png');
new Products('img/tauntaun.jpg');
new Products('img/unicorn.jpg');
new Products('img/usb.gif');
new Products('img/water-can.jpg');
new Products('img/wine-glass.jpg');


function displayThreeNewProducts() {
  // show new pictures to user
  var currentProductIndex = [];

  do {
    currentProductIndex[0] = Math.floor(Math.random() * Products.allProducts.length);
    currentProductIndex[1] = Math.floor(Math.random() * Products.allProducts.length);
    currentProductIndex[2] = Math.floor(Math.random() * Products.allProducts.length);
    lastIndexUsed[3] = currentProductIndex[0];
    lastIndexUsed[4] = currentProductIndex[1];
    lastIndexUsed[5] = currentProductIndex[2];

    var isLastRepeated = checkRepeatIndex(lastIndexUsed);
  } while (isLastRepeated === true);

  for(var i=0; i < 3; i++){
    Products.allProducts[currentProductIndex[i]].shown++;
    imgPrint[i].src = Products.allProducts[currentProductIndex[i]].filename;
  }

  lastIndexUsed[0] = lastIndexUsed[3];
  lastIndexUsed[1] = lastIndexUsed[4];
  lastIndexUsed[2] = lastIndexUsed[5];
}

function checkRepeatIndex(arrIndex) {
  var counts = [];
  for(var i = 0; i <= arrIndex.length; i++) {
    if(counts[arrIndex[i]] === undefined) {
      counts[arrIndex[i]] = 1;
    } else {
      return true;
    }
  }
  return false;
}

function displayResults (){
  var testImages = document.getElementById("testImages");
  testImages.style.display = "none";

  for( var i = 0; i < Products.allProducts.length; i++){
    var printImages = document.getElementById("results");
    var img = document.createElement('img');
    var timesChosen = document.createElement('h2');
    var percentChosen = document.createElement('h2');

    img.src = Products.allProducts[i].filename;
    timesChosen.innerHTML = ('Times Chosen: ' + Products.allProducts[i].votes);
    percentChosen.innerHTML = ('Percent Chosen: ' + ((Products.allProducts[i].votes/Products.allProducts[i].shown)*100));
    printImages.appendChild(img);
    printImages.appendChild(timesChosen);
    printImages.appendChild(percentChosen);
  }
}

function imageClicked(e){

  var image = e.target.dataset.index;

  Products.allProducts[image].votes++;
  numPoductsClicked++;

  if (numPoductsClicked < numMaxClicks){
    displayThreeNewProducts();
  }else{
    displayResults();
  }
}

//creates event listeners
function createEventListers(numProducts){
  for(var j = 0; j < numProducts; j++){
    var printImages = document.getElementById("testImages");
    var img = document.createElement('img');

    imgPrint[j] = document.getElementsByTagName('img')[j];
    imgPrint[j].addEventListener('click', imageClicked);
    img.src = '';
    printImages.appendChild(img);
  }
}

createEventListers(numProductsDisplayed);
displayThreeNewProducts();