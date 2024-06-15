let defaultConfig = {
  container: ".accordion-container",
  data: [
    {
      title: "title1",
      content: "content",
    },
  ],
};

let container;

export function Accordion(config) {
  config = JSON.parse(JSON.stringify(config));
  Object.keys(defaultConfig).forEach((key) => {
    defaultConfig[key] = config[key];
  });

  createAccordion();
}
function createAccordion() {
  container = document.querySelector(defaultConfig.container);

  if (!container) return;

  let frag = document.createDocumentFragment();

  defaultConfig.data.forEach(({ title, content }, index) => {
    let accordionEl = document.createElement("div");
    let accordionFrag = document.createDocumentFragment();

    let accordionHeader = document.createElement("div");
    accordionHeader.classList.add("header");
    accordionHeader.dataset.position = index;
    accordionHeader.innerHTML = title;

    let accordionContent = document.createElement("div");
    accordionContent.classList.add("content");
    accordionContent.innerHTML = content;

    accordionFrag.appendChild(accordionHeader);
    accordionFrag.appendChild(accordionContent);

    accordionEl.appendChild(accordionFrag);

    frag.appendChild(accordionEl);
  });

  container.appendChild(frag);
  container.addEventListener("click", onClick);
}

function onClick(e) {
  let position = e.target.dataset.position;

  if (isNaN(position)) return;

  let headerElements = document.querySelectorAll(".header");
  headerElements.forEach((headerElement) => {
    if (headerElement.getAttribute("data-position") === position) {
      headerElement.classList.toggle("active");
    }
  });
}
