// Constants

var MAX_ROWS = 5;
var MAX_COLS = 5;

// Event listeners

document.getElementById('file').addEventListener('change',onFileChange);
document.getElementById('image-table').addEventListener('click',onTableClick);

// Event handlers

function onFileChange(event) {

  var reader = new FileReader();
  var selectedFile = event.target.files[0];

  reader.readAsDataURL(selectedFile);

  // Runs a function once the reader has been loaded.

  reader.onload = (function(event) {

    var image = new Image();
    image.src = event.target.result;

    // Runs once the image has been loaded.

    image.onload = (function () {
      reloadNewImage(image);
    });
  });
}

function onTableClick(event) {

  // If no imageList has been pre-loaded, then return.
  if (imageList.length < 1) {
    return;
  }

  var index = 0;
  var tbody = document.getElementById('image-table');
  imageList = randomizeArray(imageList);

  var len1 = tbody.children.length;

  for(var i = 0; i < len1; i++) {
    var row = tbody.children[i];
    var len2 = row.children.length;

    for(var j = 0; j < len2; j++) {
      row.children[j].children[0].src = imageList[index];
      index++;
    }
  }
}

// Global variables
var imageList = [];

/**
* Given an image, loads it into the table and shuffle it.
*
* @param image   a base64 string.
* @return Array  an array with the base64 pieces of the given image.
*/
function reloadNewImage(image) {
  var index = 0;
  var tbody = document.getElementById('image-table');
  imageList = randomizeArray(getImageArray(image));

  var len1 = tbody.children.length;

  for(var i = 0; i < len1; i++) {
    var row = tbody.children[i];
    var len2 = row.children.length;

    for(var j = 0; j < len2; j++) {
      row.children[j].children[0].src = imageList[index];
      index++;
    }
  }

}


/**
* Given an image, returns an array containing the url of the images.
*
* @param image   a base64 string.
* @return Array  an array with the base64 pieces of the given image.
*/
function getImageArray(image) {

  var imageList = [];
  var width = image.width / MAX_ROWS;
  var height = image.height / MAX_COLS;

  for (var x = 0; x < MAX_ROWS; x++) {
    for (var y = 0; y < MAX_COLS; y++) {

      // Creates a new canvas for the image fragment.
      var canvas = document.createElement('canvas');
      var context = canvas.getContext('2d');

      context.drawImage(
        image,
        x * width, y * height, // Coordinate where to start clipping
        width, height, // The width/height of the clipped image
        0, 0, // Position to place the clipped image on the canvas
        canvas.width, canvas.height // Canvas size.
      );
      // Append the data URL to the matrix.
      imageList.push(canvas.toDataURL());
    }
  }
  return imageList;
}

/**
* Given an array, shuffles it.
*
* @param Array   an array.
* @return Array  a randomized array.
*/
function randomizeArray(arr) {

  // Essentially we'll randomly sort it.
  return arr.sort(function() { return 0.5 - Math.random() });
}
