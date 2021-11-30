var fish = document.getElementById("fish");
var board = document.getElementById("board");

window.addEventListener("keydown", (e) => {
  var top = parseInt(window.getComputedStyle(fish).getPropertyValue("top"));
  if (e.key == "ArrowUp" && top > 0) {
    fish.style.top = top - 10 + "px";
  }
  else if (e.key == "ArrowDown" && top <= 660) {	
    fish.style.top = top + 10 + "px";
  }

  if (e.key == "ArrowRight" || e.keyCode == 32) {
    var buble = document.createElement("div");
    buble.classList.add("bubles");
    board.appendChild(buble);

    var movebuble = setInterval(() => {
      var sharks = document.getElementsByClassName("sharks");

      for (var i = 0; i < sharks.length; i++) {
        var shark = sharks[i];
        if (shark != undefined) {
          var sharkbound = shark.getBoundingClientRect();
          var bublebound = buble.getBoundingClientRect();

          if (
            bublebound.left <= sharkbound.left &&
            bublebound.right <= sharkbound.right &&
            bublebound.top >= sharkbound.top &&
            bublebound.bottom <= sharkbound.bottom
          ) {
            shark.parentElement.removeChild(shark); 
            //Scoreboard
            document.getElementById("points").innerHTML =
              parseInt(document.getElementById("points").innerHTML) + 1;
          }
        }
      }
      var bubleleft = parseInt(
        window.getComputedStyle(buble).getPropertyValue("left")
      );

      if (bubleleft >= 700) {
        clearInterval(movebuble);
      }

      buble.style.top = top + "px";
      buble.style.left = bubleleft + 3 + "px";
    });
  }
});
  var generatesharks = setInterval(() => {
  var shark = document.createElement("div");
  shark.classList.add("sharks");
  var sharkbottom = parseInt(
    window.getComputedStyle(shark).getPropertyValue("bottom")
  );
  shark.style.bottom = Math.floor(Math.random() * 640) + "px";

  board.appendChild(shark);
}, 500);

var movesharks = setInterval(() => {
  var sharks = document.getElementsByClassName("sharks");

  if (sharks != undefined) {
    for (var i = 0; i < sharks.length; i++) {
      var shark = sharks[i]; 
      var sharkright = parseInt(
        window.getComputedStyle(shark).getPropertyValue("right")
      );
      if (sharkright >= 600) {
        alert("Game Over :'(");
        clearInterval(movesharks);
        window.location.reload();
      }

      shark.style.right = sharkright + 25 + "px";
    }
  }
}, 500);
