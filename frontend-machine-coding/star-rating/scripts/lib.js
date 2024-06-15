let starEntity = "&#9733";
let defaultConfig = {
  container: "#stars",
  count: 5,
  onColor: "yellow",
  offColor: "white",
  size: "3rem",
};

export class Rate {
  constructor(config) {
    this.config = JSON.parse(JSON.stringify(defaultConfig));
    this.init(config);
  }

  init(config) {
    Object.keys(config).forEach((key) => {
      this.config[key] = config[key];
    });

    this.createStars();
  }

  createStars() {
    this.container = document.querySelector(this.config.container);

    if (!this.container) return;

    let frag = document.createDocumentFragment();

    for (let index = 0; index < this.config.count; index++) {
      let star = document.createElement("span");
      star.innerHTML = starEntity;
      star.style.fontSize = this.config.size;
      star.style.color = this.config.offColor;
      star.style.cursor = "pointer";
      star.dataset.rate = index + 1;

      frag.appendChild(star);
    }

    this.container.appendChild(frag);
    this.stars = this.container.children;
    this.filledStars = 0;

    this.container.addEventListener("click", this.onClick.bind(this));
    this.container.addEventListener("mouseover", this.onMouseOver.bind(this));
    this.container.addEventListener("mouseleave", this.onMouseLeave.bind(this));
  }

  onClick(e) {
    let clickedStar = Number(e.target.dataset.rate);

    if (!clickedStar) return;

    for (let index = 0; index < this.filledStars; index++) {
      this.stars[index].style.color = this.config.offColor;
    }

    for (let index = 0; index < clickedStar; index++) {
      this.stars[index].style.color = this.config.onColor;
    }

    this.filledStars = clickedStar;
  }
  onMouseOver(e) {
    let hoveredStar = Number(e.target.dataset.rate);

    if (!hoveredStar) return;

    for (let index = 0; index < this.config.count; index++) {
      this.stars[index].style.color = this.config.offColor;
    }

    for (let index = 0; index < hoveredStar; index++) {
      this.stars[index].style.color = this.config.onColor;
    }
  }
  onMouseLeave() {
    for (let index = 0; index < this.config.count; index++) {
      this.stars[index].style.color = this.config.offColor;
    }

    for (let index = 0; index < this.filledStars; index++) {
      this.stars[index].style.color = this.config.onColor;
    }
  }
}
