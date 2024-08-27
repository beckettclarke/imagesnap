/* IMAGE CONVERTER */
var format = 'png';
let imgInput = document.getElementById("iconv");
var ii = imgInput
imgInput.addEventListener("change", converte);
function converte(e){
  convert(e.target); // Makes sure the element is used instead of the event
}
function convert(e) {
  if (ii.files) {
    converting();
    let imageFile = ii.files[0]; //here we get the image file
    var reader = new FileReader();
    reader.readAsDataURL(imageFile);
    reader.onloadend = function (e) {
      var myImage = new Image(); // Creates image object
      myImage.src = e.target.result; // Assigns converted image to image object
      myImage.onload = function (ev) {
        var myCanvas = document.getElementById("myCanvas"); // Creates a canvas object
        var myContext = myCanvas.getContext("2d"); // Creates a contect object
        myCanvas.width = myImage.width; // Assigns image's width to canvas
        myCanvas.height = myImage.height; // Assigns image's height to canvas
        myContext.drawImage(myImage, 0, 0); // Draws the image on canvas
        // let imgData = myCanvas.toDataURL("image/"+format, 0.75); // Assigns image base64 string in jpeg format to a variable
        const img = myCanvas.toDataURL("image/"+format);
        console.log(img);
        if (format == "dataurl") {
          copy(img);
          console.log("Copied to clipboard!");
        } else {
          var a = document.createElement("a"); //Create <a>
          a.href = img; //Image Base64 Goes here
          var filename = document
            .getElementById("iconv")
            .files[0].name.replace(/\.[^/.]+$/, "");
          a.download = filename + "." + format; //File name Here
          a.click(); //Downloaded file
          // done("Success!");
          donedl();
        }
        ii.value = ""; // Clear the value of the file input element
      };
      myImage.onerror = function() {
        errorns(); // Call errorns() if image isn't supported
      };
    };
  }
}

function copy(text) {
  var input = document.createElement("textarea");
  input.innerHTML = text;
  document.body.appendChild(input);
  input.select();
  // var result = document.execCommand("copy");
  navigator.clipboard.writeText(input.value);
  document.body.removeChild(input);
  donecp();
}


const dropzone = document.getElementById('dropzone');
const fileInput = document.getElementById('iconv');

dropzone.addEventListener('dragover', (event) => {
  event.preventDefault();
  dropzone.classList.add('dragover');
});

dropzone.addEventListener('dragleave', () => {
  dropzone.classList.remove('dragover');
});

dropzone.addEventListener('drop', (event) => {
  event.preventDefault();
  dropzone.classList.remove('dragover');

  const files = event.dataTransfer.files;
  fileInput.files = files;
  convert(fileInput);

  // Handle files here
  console.log('Dropped files:', files);
});


fileInput.addEventListener('change', (event) => {
  const files = event.target.files;
  // Handle files here
  console.log('Selected files:', files);
});

function sf(f,e){
  format = f;
  document.querySelectorAll(".active").forEach(function(e){e.classList.remove('active')});
  e.classList.add('active');
}

var overlay=document.getElementById('overlay');
var oicon=document.getElementById('oicon');
var ostatus=document.getElementById('ostatus');

function converting(){
  overlay.classList.add('active');
  oicon.innerHTML="🔄";
  ostatus.innerHTML="Converting...";
}
function done(e,t,d){
  oicon.innerHTML=e;
  ostatus.innerHTML=t;
  var del;
  if(d){del=d}else{del=5E2}

  setTimeout(function(){overlay.classList.remove('active')},del)
}
// converting()
function donedl(){done('📥','Downloaded!')}
function donecp(){done('📋','Copied to clipboard!')}
function errorns(){done('❌','Image not supported!',3E3)}
// setTimeout(donecp,1E3);