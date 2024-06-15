let defaultConfig = {
  container: ".carousel-container",
  data: [
    {
      src: "https://unsplash.com/photos/a-cluster-of-stars-in-the-night-sky-w5N9CqsSnQ4",
    },
  ],
  timeout: 1000,
  leftToRight: true,
};

let container;
let imgElements;
let activeImageIndex = 0;
let VALUES = {
  NEXT: "next",
  PREV: "prev",
};
let autoPlayOffset;

export function Carousel(config) {
  config = JSON.parse(JSON.stringify(config));
  Object.keys(config).forEach((key) => {
    defaultConfig[key] = config[key];
  });
  autoPlayOffset = defaultConfig.leftToRight ? 1 : -1;
  createCarousel();
}

function createCarousel() {
  container = document.querySelector(defaultConfig.container);

  if (!container) return;

  let frag = document.createDocumentFragment();

  defaultConfig.data.forEach(({ src }) => {
    let imgElement = document.createElement("img");
    imgElement.src = src;
    frag.appendChild(imgElement);
  });

  frag.children[activeImageIndex].classList.add("active");

  let nextBtn = document.createElement("button");
  nextBtn.textContent = ">";
  nextBtn.dataset.value = VALUES.NEXT;
  nextBtn.classList.add(VALUES.NEXT);

  let prevBtn = document.createElement("button");
  prevBtn.textContent = "<";
  prevBtn.dataset.value = VALUES.PREV;
  prevBtn.classList.add(VALUES.PREV);

  frag.appendChild(prevBtn);
  frag.appendChild(nextBtn);

  container.appendChild(frag);

  imgElements = document.querySelectorAll("img");

  container.addEventListener("click", onClick);
  autoPlay();
}

function autoPlay() {
  setTimeout(autoPlay, defaultConfig.timeout);
  swapImages(autoPlayOffset);
}

function onClick(e) {
  let btnValue = e.target.dataset.value;

  if (!btnValue) return;

  let offset = btnValue === VALUES.NEXT ? 1 : -1;
  swapImages(offset);
}

function swapImages(offset) {
  imgElements.forEach((img) => {
    img.classList.remove("active");
  });

  if (activeImageIndex + offset >= defaultConfig.data.length) {
    activeImageIndex = 0;
  } else if (activeImageIndex + offset < 0) {
    activeImageIndex = defaultConfig.data.length - 1;
  } else {
    activeImageIndex = activeImageIndex + offset;
  }

  imgElements[activeImageIndex].classList.add("active");
}
