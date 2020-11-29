/*
 " THE FROG GAME "
 Author: Shashank MG
 Date: 20 / 11 / 2020
*/

var flag = false,
  timeBox,
  frog,
  gameName,
  begin,
  destroyTimer,
  body = document.body;

// Sounds - howler
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

const setup = () => {
  body.classList.remove("body2");
  body.classList.add("body1");
  timeBox = document.createElement("div");
  frog = document.createElement("img");
  frog.src = "frog.gif";
  frog.alt = "wild-frog";

  gameName = document.createElement("h1");
  gameName.textContent = "The Frog Game";
  gameName.classList.add("gamename");
  body.appendChild(gameName);
};
setup();

const beginGame = () => {
  if (start === false) {
    gameName.style.marginTop = "30px";
    if (flag) {
      body.removeChild(gameName);
      body.removeChild(frog);
      body.removeChild(timeBox);
      setup();
    }
    begin = document.createElement("div");
    begin.classList.add("beginwindow");
    body.appendChild(begin);

    frog.classList.add("introfrog");
    begin.appendChild(frog);

    const button = document.createElement("button");
    button.textContent = "PLAY";
    button.classList.add("startbutton");

    button.addEventListener("click", () => {
      start = true;
      body.removeChild(begin);

      if (start) {
        // Code for timer
        {
          let wait = 5;
          let countdown = document.createElement("div");
          let instructions = document.createElement("div");
          countdown.classList.add("takeoff");
          body.appendChild(countdown);

          instructions.textContent =
            "Instructions: Use Arrow Keys to move the Frog. Overcome the obstacles to reach the pond.";
          instructions.classList.add("rules");

          body.appendChild(instructions);
          instructions.appendChild(countdown);

          const id = setInterval(() => {
            if (wait >= 0)
              countdown.textContent = `The game begins in ${wait--}!!`;
          }, 1000);

          setTimeout(() => {
            body.classList.add("body2");
            let i = 15;

            clearInterval(id);
            body.removeChild(instructions);

            timeBox.textContent = "Time Left: 16";
            body.appendChild(timeBox);
            timeBox.style.fontSize = "35px";
            const id1 = setInterval(() => {
              if (i >= 0) timeBox.textContent = `Time Left: ${i--}`;
              else clearInterval(id1);
            }, 1000);
          }, 7000);
        }

        // Code for 'Jumping frog'

        setTimeout(() => {
          const road = document.createElement("div");
          let frogLeft = 0,
            frogTop = 0;
          {
            let i,
              k = 0,
              initial = 0,
              inRange = 0;
            frog.classList.add("playingfrog");

            body.appendChild(frog);

            i = parseFloat(getComputedStyle(frog).getPropertyValue("left"));
            k = parseFloat(getComputedStyle(frog).getPropertyValue("top"));
            initial = k;

            document.onkeydown = function (e) {
              let downLimit =
                initial -
                20 +
                parseFloat(getComputedStyle(road).getPropertyValue("height"));
              console.log(downLimit);
              inRange = parseFloat(
                getComputedStyle(frog).getPropertyValue("right")
              );
              switch (e.keyCode) {
                case 37:
                  if (i >= 0 && k <= 550) i -= 5;
                  frog.style.left = (i + "px").toString();
                  frogjump();
                  break;
                case 38:
                  if (k >= initial + 40) k -= 5;
                  frog.style.top = (k + "px").toString();
                  frogjump();
                  break;
                case 39:
                  if (i < window.innerWidth - 70 && k >= initial + 30) i += 5;
                  frog.style.left = (i + "px").toString();
                  frogjump();
                  break;
                case 40:
                  if (k < downLimit) {
                    k += 5;
                    frog.style.top = (k + "px").toString();
                  }
                  if (
                    inRange >= 1 &&
                    inRange <= 167 &&
                    k < window.innerHeight - 80
                  ) {
                    k += 5;
                    frog.style.top = (k + "px").toString();
                  }
                  frogjump();
                  break;
                default:
                  break;
              }
              frogLeft = i;
              frogTop = k;
              // console.log(frogTop);
              // console.log(frogLeft - 197);
              if (k >= 580) {
                alert("Congrats!!! You Win!!");
                body.removeChild(obstacleDiv);
                start = false;
                flag = true;
                clearTimeout(destroyTimer);
                k = 0;
                beginGame();
              }
            };

            // Obstacles
            const car1 = document.createElement("img");
            const car2 = document.createElement("img");
            const car3 = document.createElement("img");
            const car4 = document.createElement("img");
            const car5 = document.createElement("img");
            const car6 = document.createElement("img");

            const pond = document.createElement("img");
            pond.src = "pond.png";
            let allcars = [car1, car2, car3, car4, car5, car6];

            for (let c of allcars) {
              c.src = "car.png";
              c.classList.add("cars");
            }

            let allDivs = [road, pond];

            road.classList.add("roads");
            road.style.width = window.innerWidth;

            for (let c of allcars) {
              road.appendChild(c);
            }

            pond.classList.add("pond");

            const obstacleDiv = document.createElement("div");
            obstacleDiv.classList.add("obstacles");
            body.appendChild(obstacleDiv);

            for (let d of allDivs) {
              obstacleDiv.appendChild(d);
            }
            const movecarsHorizontal = () => {
              const ranNum = [3, 2, 3, 3, 2];
              let w = parseFloat(
                getComputedStyle(road).getPropertyValue("width")
              );

              let horizontal =
                Math.floor((w * 2.3) / ranNum[Math.floor(Math.random() * 4)]) *
                Math.random();
              return horizontal;
            };

            const movecarsVertical = () => {
              let h = parseFloat(
                getComputedStyle(road).getPropertyValue("height")
              );
              const ranNum = [2, 2, 3, 2, 3];
              let vertical = Math.floor(
                ((h * 2.3) / ranNum[Math.floor(Math.random() * 4)]) *
                  Math.random()
              );
              return vertical;
            };

            setInterval(() => {
              const x1 = movecarsHorizontal();
              const y1 = movecarsVertical();
              car1.style.transform = `translate(${x1}px,${y1}px)`;

              const x2 = movecarsHorizontal();
              const y2 = movecarsVertical();
              car2.style.transform = `translate(${x2}px,${y2}px)`;

              const x3 = movecarsHorizontal();
              const y3 = movecarsVertical();
              car3.style.transform = `translate(${x3}px,${y3}px)`;

              const x4 = movecarsHorizontal();
              const y4 = movecarsVertical();
              car4.style.transform = `translate(${x4}px,${y4}px)`;

              const x5 = movecarsHorizontal();
              const y5 = movecarsVertical();
              car5.style.transform = `translate(${x5}px,${y5}px)`;

              const x6 = movecarsHorizontal();
              const y6 = movecarsVertical();
              car6.style.transform = `translate(${x6}px,${y6}px)`;
              // console.log("left", x1, "top", y1);
              // console.log(frogLeft, frogTop);
              for (let m = 0; m <= 51; m++) {
                // console.log(x1, x1 + m, frogLeft);
                if (x1 + m === frogLeft) {
                  console.log("hit");
                }
              }
              for (let n = 24; n >= 0; n--) {
                if (x1 - n === frogTop - 197) {
                  console.log("hit");
                }
              }
              // console.log(x1, y1);
            }, 500);
            console.log(
              getComputedStyle(road).getPropertyValue("bottom"),
              getComputedStyle(obstacleDiv).getPropertyValue("top")
            );
            // Timer Code
            destroyTimer = setTimeout(() => {
              if (timeBox.textContent === "Time Left: 0") {
                alert("you lost, try again!!");
                document.body.removeChild(obstacleDiv);
                start = false;
                flag = true;
                beginGame();
              }
            }, 17000);
            // console.dir(document.querySelectorAll("img")[1].parentElement);
          }
        }, 7000);
      }
    });
    begin.appendChild(button);
  }
};

beginGame();
