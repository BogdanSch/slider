export class Slider {
  constructor(config) {
    this.imagePathes = config.imagePathes;
    this.currentSlide = 0;
    this.timer;
    this.effect = "none";
    this.allEffects = [];
    this.animationDuration = config.animationDuration;
    this.autoplayDuration = config.autoplayDuration;
    this.showMiniatures = config.showMiniatures;
  }
  init() {
    this.sliderImage = document.getElementById("sliderImage");
    this.nextButton = document.getElementById("next");
    this.previousButton = document.getElementById("prev");
    this.startSlideshowButton = document.getElementById("start");
    this.stopSlideshowButton = document.getElementById("stop");
    this.effectsForm = document.forms.effects;
    this.miniaturesContainer = document.querySelector(".slider__minies");
    this.miniatures = [];

    for (let i = 0; i < this.effectsForm.length; i++) {
      this.allEffects.push(this.effectsForm[i].value);
      this.effectsForm[i].addEventListener("change", (event) => {
        this.clearEffects();
        if (this.effectsForm[i].checked) {
          this.effect = this.effectsForm[i].value;
        }
      });
    }

    this.nextButton.addEventListener("click", () => this.showNextSlide());
    this.previousButton.addEventListener("click", () =>
      this.showPreviousSlide()
    );
    this.startSlideshowButton.addEventListener("click", () =>
      this.startSlideshow()
    );
    this.stopSlideshowButton.addEventListener("click", () =>
      this.stopSlideshow()
    );

    if (this.showMiniatures) {
      this.generateMiniatures();

      this.miniatures.forEach((miniature) => {
        miniature.addEventListener("click", (event) =>
          this.showNextSlideByMiniature(event)
        );
      });
    }
  }

  addEffect() {
    this.sliderImage.classList.add(this.effect);
  }

  clearEffects() {
    for (const effect of this.allEffects) {
      this.sliderImage.classList.remove(effect);
    }
  }

  startSlideshow() {
    this.stopSlideshow();
    this.timer = setInterval(() => this.showNextSlide(), this.autoplayDuration);
  }

  stopSlideshow() {
    clearInterval(this.timer);
  }

  showNextSlide() {
    this.addEffect();
    setTimeout(() => {
      this.currentSlide++;
      if (this.currentSlide >= this.imagePathes.length) {
        this.currentSlide = 0;
      }
      this.sliderImage.src = this.imagePathes[this.currentSlide];
    }, this.animationDuration / 2);
    setTimeout(() => this.clearEffects(), this.animationDuration);
  }

  showPreviousSlide() {
    this.addEffect();
    setTimeout(() => {
      this.currentSlide--;
      if (this.currentSlide < 0) {
        this.currentSlide = this.imagePathes.length - 1;
      }
      this.sliderImage.src = this.imagePathes[this.currentSlide];
    }, this.animationDuration / 2);
    setTimeout(() => this.clearEffects(), this.animationDuration);
  }

  generateMiniatures() {
    for (let i = 0; i < this.imagePathes.length; i++) {
      const imageFullName = this.imagePathes[i].split("/")[2];
      const image = document.createElement("img");
      image.src = this.imagePathes[i];
      image.alt = imageFullName;
      image.className = "mini";
      image.setAttribute("data-sl-img", imageFullName);
      this.miniaturesContainer.appendChild(image);
      this.miniatures.push(image);
    }
  }

  showNextSlideByMiniature(event) {
    let imageMini = event.target;
    let imageFullName = imageMini.getAttribute("data-sl-img");
    this.addEffect();
    setTimeout(() => this.clearEffects(), this.animationDuration);
    setTimeout(() => {
      this.sliderImage.src = `./images/${imageFullName}`;
    }, this.animationDuration / 2);
  }
}
