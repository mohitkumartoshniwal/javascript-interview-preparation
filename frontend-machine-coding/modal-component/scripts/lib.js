let defaultConfig = {
  container: ".modal-container",
  buttonSelector: ".openButton",
  title: "title",
  content: `<p>content </p>`,
};

export class Modal {
  constructor(config) {
    this.config = JSON.parse(JSON.stringify(defaultConfig));
    this.init(config);
  }

  init(config) {
    Object.keys(config).forEach((key) => {
      this.config[key] = config[key];
    });
    this.createModal();
  }

  createModal() {
    this.container = document.querySelector(this.config.container);
    this.openButton = document.querySelector(this.config.buttonSelector);

    if (!this.container) return;
    if (!this.openButton) return;

    this.overlayEl = document.createElement("div");
    this.overlayEl.setAttribute("class", "overlay");
    document.body.appendChild(this.overlayEl);

    let modalHeader = document.createElement("div");
    modalHeader.innerHTML = `
    <div class="modal-header">
        <div class="title">${this.config.title}</div>
        <button>&times;</button>
    </div>
    `;

    let modalBody = document.createElement("div");
    modalBody.innerHTML = this.config.content;

    let frag = document.createDocumentFragment();

    frag.appendChild(modalHeader);
    frag.appendChild(modalBody);

    this.container.appendChild(frag);
    this.setupListeners();
  }

  setupListeners() {
    this.openButton.addEventListener("click", () => {
      this.overlayEl.classList.add("active");
      this.container.classList.add("active");
    });

    let closeBtn = this.container.querySelector("button");
    closeBtn.addEventListener("click", () => {
      this.overlayEl.classList.remove("active");
      this.container.classList.remove("active");
    });
  }
}
