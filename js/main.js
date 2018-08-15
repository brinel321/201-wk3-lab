'use strict'; //highlights any mistakes made with variables
console.log('js is linked');

//constructor to build products
function Products(filename, productname, votes, shown) {
  this.filename = filename;
  this.productname = productname;
  this.votes = votes || 0;
  this.shown = shown || 0;
  Products.allProducts.push(this);
}

//global variables
Products.allProducts = [];
var numProductsDisplayed = 6;
var lastIndexUsed = [];
var numPoductsClicked = 1;
var numMaxClicks = 26;
var imgPrint = [];
var loadedProducts = JSON.parse(localStorage.getItem('products'));

//this function builds the framework to dynamically change the # of products displayed.
function numProductsToDisplay(){
  lastIndexUsed = Array(2*numProductsDisplayed);

  for( var x = 0; x < lastIndexUsed.length; x++){
    lastIndexUsed[x] = x;
  }

  for(var y = 0; y < numProductsDisplayed; y++){
    var testImages = document.getElementById("testImages");
    var img = document.createElement("img");

    img.dataset.index = y;
    img.src = '';
    testImages.appendChild(img);
  }
}

//this function builds product objects using the product constructor; object key/value pairs pulled from local storage -or- if visited for the first time, initiated.
function createProducts(){
  if (loadedProducts) {
    for (var i = 0; i < loadedProducts.length; i++) {
      new Products(loadedProducts[i].filename, loadedProducts[i].productname, loadedProducts[i].votes, loadedProducts[i].shown);
    }
  } else {//all objects built using the product constructor
    new Products('img/bathroom.jpg', 'iPad Roller');
    new Products('img/boots.jpg', 'Rubber Sandals');
    new Products('img/bubblegum.jpg', 'Terrible Gum');
    new Products('img/bag.jpg', 'R2D2 Bag');
    new Products('img/banana.jpg', 'Banana Slicer');
    new Products('img/chair.jpg', 'Chair');
    new Products('img/cthulhu.jpg', 'Cthulhu');
    new Products('img/dog-duck.jpg', 'Duck Beak');
    new Products('img/dragon.jpg', 'Dragon Fruit');
    new Products('img/pen.jpg', 'Pen Utensials');
    new Products('img/pet-sweep.jpg', 'Pet Sweep');
    new Products('img/scissors.jpg', 'Pizza Cutter');
    new Products('img/shark.jpg', 'Shark Bag');
    new Products('img/sweep.png', 'Kid Sweeper');
    new Products('img/tauntaun.jpg', 'Tantuan');
    new Products('img/unicorn.jpg', 'Unicorn Meat');
    new Products('img/usb.gif', 'USB');
    new Products('img/water-can.jpg', 'Water Can');
    new Products('img/wine-glass.jpg', 'Wine Glass');
  }
}

//this function randomly generates product indexes and then displays the corresponding products; is called everytime the page is loaded and when the user clicks a product when they still have available clicks left.
function displayNewProducts() {
  var currentProductIndex = [];
  var chart = document.getElementById("Chart");
  var scenario = document.getElementById("scenario");

  scenario.innerText = ('Scenario ' + numPoductsClicked);
  chart.style.display = "none";
  localStorage.setItem('products', JSON.stringify(Products.allProducts));

  do {//this loop generates product indexes that are different from each other and from the last set of products showm.
    for (var k = 0; k < numProductsDisplayed; k++){
      currentProductIndex[k] = Math.floor(Math.random() * Products.allProducts.length);
      lastIndexUsed[k + numProductsDisplayed] = currentProductIndex[k];
    }

    var isLastRepeated = checkRepeatIndex(lastIndexUsed);

  } while (isLastRepeated === true);

  for(var i=0; i < numProductsDisplayed; i++){//this loop displays the products and indicats to the product's corresponding object that it's been shown.
    Products.allProducts[currentProductIndex[i]].shown++;
    imgPrint[i].src = Products.allProducts[currentProductIndex[i]].filename;
    lastIndexUsed[i] = lastIndexUsed[i+numProductsDisplayed];
  }
}

//function used to check for duplicate numbers in the index array; called after numbers are generated.
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

//the function either decides whether new images should be displayed or if the results should be displayed; is called everytime an image is clicked.
function imageClicked(e){
  Products.allProducts[lastIndexUsed[e.target.dataset.index]].votes++;
  numPoductsClicked++;

  if (numPoductsClicked < numMaxClicks){
    displayNewProducts();
  }else{
    displayChart();
  }
}

//the function creates event listeners for the images displayed; it is called everytime the page loads.
function createEventListers(numProducts){
  for(var j = 0; j < numProducts; j++){
    imgPrint[j] = document.getElementsByTagName('img')[j];
    imgPrint[j].addEventListener('click', imageClicked);
  }
}

//the function creates a chart to provide visual representation of # of click; it is called when the maximum number of clicks has been reached.
function displayChart() {
  var namesArray = [];
  var votesArray = [];
  var testImages = document.getElementById("testImages");
  var chart = document.getElementById("Chart");
  var scenario = document.getElementById("scenario");

  scenario.innerText = 'Survey Results';
  testImages.style.display = "none";
  chart.style.display = "inline-block";

  for (var i = 0; i < Products.allProducts.length; i++) {
    namesArray.push(Products.allProducts[i].productname);
    votesArray.push(Products.allProducts[i].votes);
  }
  var ctx = document.getElementById('myChart').getContext('2d');
  var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: namesArray,
      datasets: [{
        label: '# of Votes',
        data: votesArray,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: 'rgb(0,0,0)',
        borderWidth: 1
      }]
    },
    options: {
      maintainAspectRatio: false,
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero:true,
            suggestedMax: 4,
            stepSize: 1,
          }
        }]
      }
    }
  });
}

//execution code
numProductsToDisplay();
createProducts();
createEventListers(numProductsDisplayed);
displayNewProducts();

