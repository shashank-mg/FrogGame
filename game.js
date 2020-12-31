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
            timeBox.classList.add("optimize");
            body.appendChild(timeBox);

            const id1 = setInterval(() => {
              if (i >= 0) timeBox.textContent = `Time Left: ${i--}`;
              else clearInterval(id1);
            }, 1000);
          }, 7000);
        }

        setTimeout(() => {
          const road = document.createElement("div");
          {
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

            for (let c of allcars) road.appendChild(c);

            pond.classList.add("pond");

            const obstacleDiv = document.createElement("div");

            frog.classList.remove("introfrog");
            frog.classList.add("playingfrog");
            road.appendChild(frog);
            obstacleDiv.classList.add("obstacles");
            body.appendChild(obstacleDiv);

            for (let d of allDivs) obstacleDiv.appendChild(d);
            // Code for 'Jumping frog'
            {
              let i,
                k = 0,
                roadHeight = 0,
                roadWidth = 0,
                frogRight = 0,
                frogDown = 0;
              i = parseFloat(getComputedStyle(frog).getPropertyValue("left"));
              k = parseFloat(getComputedStyle(frog).getPropertyValue("top"));
              let getPositions = () => {
                roadHeight = parseFloat(
                  getComputedStyle(road).getPropertyValue("height")
                );
                roadWidth = parseFloat(
                  getComputedStyle(road).getPropertyValue("width")
                );
                frogRight = parseFloat(
                  getComputedStyle(frog).getPropertyValue("right")
                );
                frogDown = parseFloat(
                  getComputedStyle(frog).getPropertyValue("bottom")
                );
              };
              getPositions();

              window.addEventListener("resize", () => {
                getPositions();
                frogRight = parseFloat(
                  getComputedStyle(frog).getPropertyValue("right")
                );
                frogRight = roadWidth + roadWidth * (50 / 100);
              });

              document.onkeydown = function (e) {
                switch (e.keyCode) {
                  case 37:
                    if (i >= 0) i -= 5;
                    frog.style.left = (i + "px").toString();
                    frogjump();
                    break;
                  case 38:
                    if (k >= 0) k -= 5;
                    frog.style.top = (k + "px").toString();
                    frogjump();
                    break;
                  case 39:
                    if (
                      i < roadWidth - 65 &&
                      (frogRight >= 0 || frogRight < roadWidth)
                    ) {
                      i += 5;
                      frog.style.left = (i + "px").toString();
                    }
                    frogjump();
                    break;
                  case 40:
                    if (
                      k < roadHeight - 65 &&
                      (frogDown <= 0 || frogDown > -325)
                    ) {
                      k += 5;
                      frog.style.top = (k + "px").toString();
                    }
                    frogjump();
                    break;
                  default:
                    break;
                }
              };
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
            }, 500);
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
          }
        }, 7000);
      }
    });
    begin.appendChild(button);
  }
};

beginGame();
