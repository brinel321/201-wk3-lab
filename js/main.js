'use strict'; //highlights any mistakes made with variables
console.log('js is linked');

//constructor to build products
function Products(filename) {
  this.filename = filename;
  this.votes = 0;
  this.shown = 0;
  Products.allProducts.push(this);
}

//global variables
Products.allProducts = [];
var numProductsDisplayed = 3;
var lastIndexUsed = [0, 1, 2, 3, 4, 5];
// var lastIndexUsed = Array(numProductsDisplayed *2).fill(1);
var numPoductsClicked = 0;
var numMaxClicks = 25;
var imgPrint = [];

//all objects built using the product constructor
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

//this function randomly generates product indexes and then displays the corresponding products; is called everytime the page is loaded and when the user clicks a product when they still have available clicks left.
function displayNewProducts() {
  var currentProductIndex = [];

  do {
    for (var k = 0; k < numProductsDisplayed; k++){
      currentProductIndex[k] = Math.floor(Math.random() * Products.allProducts.length);
      lastIndexUsed[k + numProductsDisplayed] = currentProductIndex[k];
    }

    var isLastRepeated = checkRepeatIndex(lastIndexUsed);

  } while (isLastRepeated === true);

  for(var i=0; i < numProductsDisplayed; i++){
    Products.allProducts[currentProductIndex[i]].shown++;
    imgPrint[i].src = Products.allProducts[currentProductIndex[i]].filename;
    lastIndexUsed[i] = lastIndexUsed[i+numProductsDisplayed];
  }
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

//fuction used to display the results from the user survey; is called when the user has reached maximum number of clicks.
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

//the function either decides whether new images should be displayed or if the results should be displayed; is called everytime an image is clicked.
function imageClicked(e){

  // var countVotes = Products(e.target.src)[];

  // countVotes.votes++;

  // Products.allProducts.fileName(image).votes++;
  numPoductsClicked++;

  if (numPoductsClicked < numMaxClicks){
    displayNewProducts();
  }else{
    displayResults();
  }
}

//the function creates event listeners for the images displayed; it is called everytime the page loads.
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

//execution code
createEventListers(numProductsDisplayed);
displayNewProducts();