function Sound(src) {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", src, true);
  xhr.responseType = "blob";
  var audio = document.createElement("audio");
  xhr.onload = function() {
    audio.src = URL.createObjectURL(xhr.response);
  };
  xhr.send();
  this.play = function() {
    if (!audio.paused) {
      audio.currentTime = 0;
    }
    audio.play();
  };
}