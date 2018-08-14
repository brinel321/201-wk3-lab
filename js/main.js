'use strict'; //highlights any mistakes made with variables
console.log('js is linked');

//constructor to build products
function Products(filename, productname) {
  this.filename = filename;
  this.productname = productname;
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

//this function randomly generates product indexes and then displays the corresponding products; is called everytime the page is loaded and when the user clicks a product when they still have available clicks left.
function displayNewProducts() {
  var currentProductIndex = [];
  var chart = document.getElementById("Chart")

  chart.style.display = "none";
  do {//this loop generates product indexes that are different from each other and from the last set of products showm.
    for (var k = 0; k < numProductsDisplayed; k++){
      currentProductIndex[k] = Math.floor(Math.random() * Products.allProducts.length);
      lastIndexUsed[k + numProductsDisplayed] = currentProductIndex[k];
    }

    var isLastRepeated = checkRepeatIndex(lastIndexUsed);

  } while (isLastRepeated === true);

  for(var i=0; i < numProductsDisplayed; i++){//this loop displays the products and indicats to the project's corresponding object that they've been shown.
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

//fuction used to display the results from the user survey; is called when the user has reached maximum number of clicks.
// function displayResults (){
//   var testImages = document.getElementById("testImages");
//   testImages.style.display = "none";

  // for( var i = 0; i < Products.allProducts.length; i++){
  //   var printImages = document.getElementById("results");
  //   var img = document.createElement('img');
  //   // var timesChosen = document.createElement('h2');
  //   // var percentChosen = document.createElement('h2');

  //   img.src = Products.allProducts[i].filename;
  //   // timesChosen.innerHTML = ('Times Chosen: ' + Products.allProducts[i].votes);
  //   // percentChosen.innerHTML = ('Percent Chosen: ' + ((Products.allProducts[i].votes/Products.allProducts[i].shown)*100));
  //   printImages.appendChild(img);
  //   // printImages.appendChild(timesChosen);
  //   // printImages.appendChild(percentChosen);
  // }
// }

//the function either decides whether new images should be displayed or if the results should be displayed; is called everytime an image is clicked.
function imageClicked(e){

  Products.allProducts[lastIndexUsed[e.target.dataset.index]].votes++;
  numPoductsClicked++;

  if (numPoductsClicked < numMaxClicks){
    displayNewProducts();
  }else{
    // displayResults();
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

function displayChart() {
 
  // need something similar for the numbers
  var namesArray = [];
  var votesArray = [];
  var testImages = document.getElementById("testImages");
  var chart = document.getElementById("Chart");

  testImages.style.display = "none";
  chart.style.display = "inline-block";

  for (var i = 0; i < Products.allProducts.length; i++) {
    // also add numbers to the new array
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
        data: votesArray, // these numbers seem important
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
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero:true,
            suggestedMax: 6
          }
        }]
      }
    }
  });
}

//execution code
// function createElements(numProducts){
//   for(var j = 0; j < numProducts; j++){
//     var printImages = document.getElementById("testImages");
//     var imgEl = document.createElement('img')[j];

//     imgEl.src = imgPrint[j].src;
//     printImages.appendChild(imgEl);
//   }
// }


// createElements(numProductsDisplayed);
// displayNewProducts();
createEventListers(numProductsDisplayed);
displayNewProducts();
