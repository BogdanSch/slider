"use strict";

let imagePathes = sliderConfig.imagePathes;

let currentSlide = 0;
let timer;
let effect = "none";
let allEffects = [];
let animationDuration = sliderConfig.animationDuration;

const sliderImage = document.getElementById("sliderImage");
const nextButton = document.getElementById("next");
const previousButton = document.getElementById("prev");

const startSlideshowButton = document.getElementById("start");
const stopSlideshowButton = document.getElementById("stop");

const effectsForm = document.forms.effects;
const miniaturesContainer = document.querySelector(".slider__minies");
let miniatures = [];

for (let i = 0; i < effectsForm.length; i++) {
  allEffects.push(effectsForm[i].value);
  effectsForm[i].addEventListener("change", (event) => {
    clearEffects();
    if (effectsForm[i].checked) {
      effect = effectsForm[i].value;
    }
  });
}

function addEffect() {
  sliderImage.classList.add(effect);
}

function clearEffects() {
  for (const effect of allEffects) {
    sliderImage.classList.remove(effect);
  }
}

nextButton.addEventListener("click", showNextSlide);
previousButton.addEventListener("click", showPreviousSlide);
startSlideshowButton.addEventListener("click", startSlideshow);
stopSlideshowButton.addEventListener("click", stopSlideshow);

function startSlideshow() {
  stopSlideshow();
  timer = setInterval(showNextSlide, 3000);
}
function stopSlideshow() {
  clearInterval(timer);
}

function showNextSlide() {
  addEffect();
  setTimeout(() => {
    currentSlide++;
    if (currentSlide >= imagePathes.length) {
      currentSlide = 0;
    }
    sliderImage.src = imagePathes[currentSlide];
  }, animationDuration / 2);
  setTimeout(clearEffects, animationDuration);
}

function showPreviousSlide() {
  addEffect();
  setTimeout(() => {
    currentSlide--;
    if (currentSlide <= 0) {
      currentSlide = imagePathes.length - 1;
    }
    sliderImage.src = imagePathes[currentSlide];
  }, animationDuration / 2);
  setTimeout(clearEffects, animationDuration);
}

function generateMiniatures() {
  for (let i = 0; i < imagePathes.length; i++) {
    const imageFullName = imagePathes[i].split("/")[2];
    const image = document.createElement("img");
    image.src = imagePathes[i];
    image.alt = imageFullName;
    image.className = "mini";
    image.setAttribute("data-sl-img", imageFullName);
    miniaturesContainer.appendChild(image);
    miniatures.push(image);
  }
}

if (sliderConfig.showMiniatures) {
  generateMiniatures();

  miniatures.forEach((miniature) => {
    miniature.addEventListener("click", showNextSlideByMiniature);
  });

  function showNextSlideByMiniature(event) {
    let imageMini = event.target;
    let imageFullName = imageMini.getAttribute("data-sl-img");
    addEffect();
    setTimeout(clearEffects, animationDuration);
    sliderImage.src = `./images/${imageFullName}`;
  }
}
