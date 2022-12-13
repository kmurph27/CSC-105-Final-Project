const body = document.querySelector("body");
const main = document.querySelector(".main");
const picture = document.querySelector("#picture");
const pictureSrc = document.querySelector("#pic-source");
const revealBtn = document.querySelector(".reveal-btn");
const mainBanner = document.querySelector("#main-banner");
const balloons = ["./img/1.png", "./img/2.png", "./img/3.png", "./img/4.png"];
const createdBalloons = [];

revealBtn.addEventListener("click", () => {
  createRevealImg();
  createBalloons();
  mainBanner.remove();
  revealBtn.remove();
});

function createRevealImg() {
  pictureSrc.setAttribute("srcset", "./img/reveal.png");
  const revealImg = document.createElement("img");
  revealImg.setAttribute("src", "./img/reveal_small.png");
  revealImg.classList.add("reveal-img");
  revealImg.classList.add("banner");
  picture.appendChild(revealImg);
  body.classList.add("active");
  let interval = setInterval(() => {
    let opacity = +revealImg.style.opacity;
    if (opacity < 1) {
      opacity += 0.1;
      revealImg.style.opacity = `${opacity}`;
    } else {
      clearInterval(interval);
    }
  }, 100);
}

function createBalloons() {
  let max = 15;
  let width = 300;
  for (let i = 0; i < max; i++) {
    const newBalloon = document.createElement("img");
    let randomImg = Math.floor(Math.random() * balloons.length);
    let randomSign = Math.floor(Math.random() * 2);
    if (randomSign == 1) {
      width *= -1;
    }
    let randomPos = Math.floor(Math.random() * width);
    let randomSpeed = Math.floor(Math.random() * 15);
    if (randomSpeed < 8) {
      randomSpeed = 8;
    }
    newBalloon.classList.add("balloon");
    newBalloon.setAttribute("src", balloons[randomImg]);
    newBalloon.style.transform = `translate(${randomPos}px, 800px)`;
    body.appendChild(newBalloon);
    createdBalloons.push(newBalloon);
    let interval = setInterval(() => {
      newBalloon.style.transform = `translate(${randomPos}px, -1000px)`;
      newBalloon.style.transition = `transform ${randomSpeed}s`;
      clearInterval(interval);
    }, 100);
  }
}
