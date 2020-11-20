/*
 " THE FROG GAME "
 Author: Shashank MG
 Date: 20 / 11 / 2020
*/
// Sounds
var frogjumps = new Howl({
  src: ["newjmp.mp3"],
});

function frogjump() {
  frogjumps.play();
  frogjumps.volume(0.3);
}

var theme = new Howl({
  src: ["theme.mp3"],
  autoplay: true,
  loop: true,
});
theme.play();

var start = false;

document.body.style.backgroundColor = "#7feb7f";
const frog = document.createElement("img");
frog.src = "https://www.frog-life-cycle.com/graphics/Frog9.gif";
frog.alt = "wild-frog";

const gameName = document.createElement("h1");
gameName.textContent = "The Frog Game";
gameName.style.textAlign = "center";
gameName.style.fontSize = "50px";
gameName.style.color = "#0c4c0c";
gameName.style.fontFamily = "Nunito SemiBold";
gameName.style.marginTop = "0px";
document.body.appendChild(gameName);

if (start === false) {
  gameName.style.marginTop = "30px";

  const begin = document.createElement("div");
  begin.style.display = "block";
  begin.style.marginLeft = "auto";
  begin.style.marginRight = "auto";
  begin.style.width = "500px";
  begin.style.height = "500px";
  begin.style.backgroundColor = "#3be13b";
  begin.style.borderRadius = "4px";
  document.body.appendChild(begin);

  frog.style.height = "300px";
  frog.style.width = "300px";
  frog.style.display = "block";
  frog.style.marginLeft = "auto";
  frog.style.marginRight = "auto";
  frog.style.paddingTop = "20px";
  begin.appendChild(frog);

  const button = document.createElement("button");
  button.textContent = "Start The Game!!!";
  button.style.display = "block";
  button.style.marginRight = "auto";
  button.style.marginLeft = "auto";
  button.style.marginTop = "50px";
  button.style.fontFamily = "Nunito SemiBold";
  button.style.width = "200px";
  button.style.height = "50px";
  button.style.fontSize = "20px";
  button.style.alignItems = "center";

  button.addEventListener("click", () => {
    start = true;
    document.body.removeChild(begin);

    if (start) {
      // Code for timer
      {
        let wait = 5;
        let countdown = document.createElement("div");
        let instructions = document.createElement("span");
        countdown.style.display = "block";
        countdown.style.marginLeft = "auto";
        countdown.style.marginRight = "auto";
        countdown.style.width = "500px";
        countdown.style.height = "100px";
        countdown.style.marginTop = "160px";
        countdown.style.fontSize = "50px";
        document.body.appendChild(countdown);

        instructions.style.fontSize = "22px";
        instructions.style.display = "block";
        instructions.style.marginLeft = "auto";
        instructions.style.marginRight = "auto";
        instructions.style.width = "900px";
        instructions.style.height = "50px";
        instructions.textContent =
          "Instructions: Use Arrow Keys to move the Frog. Overcome the obstacles to reach the destination.";
        document.body.appendChild(instructions);
        instructions.appendChild(countdown);

        const id = setInterval(() => {
          if (wait >= 0)
            countdown.textContent = `The game begins in ${wait--}!!`;
        }, 1000);

        setTimeout(() => {
          document.body.style.backgroundColor = "#c3f6c3";
          let i = 30;
          const timeBox = document.createElement("div");
          clearInterval(id);
          document.body.removeChild(instructions);

          timeBox.textContent = "Time Left: 31";
          document.body.appendChild(timeBox);
          timeBox.style.fontSize = "35px";
          const id1 = setInterval(() => {
            if (i >= 0) timeBox.textContent = `Time Left: ${i--}`;
            else clearInterval(id1);
          }, 1000);
        }, 7000);
      }

      // Code for 'Jumping frog'

      setTimeout(() => {
        {
          let i,
            k = 0;
          frog.style.height = "50px";
          frog.style.width = "50px";
          frog.style.display = "block";
          frog.style.marginLeft = "auto";
          frog.style.marginRight = "auto";
          document.body.appendChild(frog);

          i = parseFloat(
            getComputedStyle(frog).getPropertyValue("margin-left")
          );

          document.onkeydown = function (e) {
            if (e.keyCode === 37) {
              if (i >= 0) i -= 2;
              frog.style.marginLeft = (i + "px").toString();
              frogjump();
            } else if (e.keyCode === 38) {
              if (k >= 0) k -= 2;
              frog.style.marginTop = (k + "px").toString();
              frogjump();
            } else if (e.keyCode === 39) {
              if (i < window.innerWidth - 70) i += 2;
              frog.style.marginLeft = (i + "px").toString();
              frogjump();
            } else if (e.keyCode === 40) {
              if (k < window.innerHeight - 80) k += 2;
              frog.style.marginTop = (k + "px").toString();
              frogjump();
            }
          };
        }
      }, 7000);
    }
  });
  begin.appendChild(button);
}
