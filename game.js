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
          "Instructions: Use Arrow Keys to move the Frog. Overcome the obstacles to reach the pond.";
        document.body.appendChild(instructions);
        instructions.appendChild(countdown);

        const id = setInterval(() => {
          if (wait >= 0)
            countdown.textContent = `The game begins in ${wait--}!!`;
        }, 1000);

        setTimeout(() => {
          document.body.style.backgroundColor = "#c3f6c3";
          let i = 15;
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
          frog.style.position = "fixed";
          frog.style.zIndex = 1;

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

          // Obstacles

          const car1 = document.createElement("img");
          const car2 = document.createElement("img");
          const car3 = document.createElement("img");
          const car4 = document.createElement("img");
          const car5 = document.createElement("img");
          const car6 = document.createElement("img");
          const d1 = document.createElement("div");
          const d6 = document.createElement("div");
          let allcars = [car1, car2, car3, car4, car5, car6];

          for (let c of allcars) {
            c.src = "car.png";
            c.style.width = "70px";
            c.style.height = "70px";
            c.style.transition = "all 2s";
          }

          // car.style.position = "fixed";
          // car.style.zIndex = 1;
          let allDivs = [d1, d6];

          d1.style.marginTop = "60px";
          d1.style.width = window.innerWidth;
          d1.style.height = "400px";
          d1.style.backgroundColor = "silver";

          for (let c of allcars) {
            d1.appendChild(c);
          }

          d6.style.backgroundColor = "#8fcadd";
          d6.style.fontFamily = "Nunito SemiBold";
          d6.style.textAlign = "center";
          d6.textContent = "Finish";
          d6.style.height = "70px";

          const obstacleDiv = document.createElement("div");
          obstacleDiv.style.position = "relative";
          obstacleDiv.style.zIndex = -1;
          document.body.appendChild(obstacleDiv);

          for (let d of allDivs) {
            obstacleDiv.appendChild(d);
          }

          const movecars = () => {
            const ranNum = [6, 4, 2, 8, 9, 7, 5, 3, 1, 11];

            let horizontal = Math.floor(
              (parseFloat(getComputedStyle(d1).getPropertyValue("width")) /
                ranNum[Math.floor(Math.random() * 9)]) *
                Math.random()
            );

            let vertical = Math.floor(
              (parseFloat(getComputedStyle(d1).getPropertyValue("height")) /
                ranNum[Math.floor(Math.random() * 9)]) *
                Math.random()
            );
            return [horizontal, vertical];
          };

          setInterval(() => {
            const x1 = movecars();
            const y1 = movecars();
            const x2 = movecars();
            const y2 = movecars();
            const x3 = movecars();
            const y3 = movecars();

            const x4 = movecars();
            const y4 = movecars();
            const x5 = movecars();
            const y5 = movecars();
            const x6 = movecars();
            const y6 = movecars();

            car1.style.transform = `translate(${x1[0]}px,${y1[1]}px)`;
            car2.style.transform = `translate(${x2[0]}px,${y2[1]}px)`;
            car3.style.transform = `translate(${x3[0]}px,${y3[1]}px)`;

            car4.style.transform = `translate(${x4[0]}px,${y4[1]}px)`;
            car5.style.transform = `translate(${x5[0]}px,${y5[1]}px)`;
            car6.style.transform = `translate(${x6[0]}px,${y6[1]}px)`;
          }, 500);
        }
      }, 7000);
    }
  });
  begin.appendChild(button);
}
