let defaultConfig = {
  container: ".otp-input",
  count: 5,
};

export class OTPInput {
  constructor(config) {
    this.config = JSON.parse(JSON.stringify(defaultConfig));
    this.init(config);
  }

  init(config) {
    Object.keys(config).forEach((key) => {
      this.config[key] = config[key];
    });

    this.createOTP();
  }

  createOTP() {
    this.container = document.querySelector(this.config.container);

    if (!this.container) return;

    let frag = document.createDocumentFragment();

    for (let index = 0; index < this.config.count; index++) {
      let inputEl = document.createElement("input");
      inputEl.classList.add("otp");
      inputEl.setAttribute("type", "text");
      inputEl.setAttribute("inputmode", "numeric");
      inputEl.setAttribute("maxlength", "1");

      frag.appendChild(inputEl);
    }

    this.container.appendChild(frag);
    this.container.addEventListener("input", this.onInput.bind(this));
    this.container.addEventListener("keyup", this.onKeyUp.bind(this));
  }

  onInput(e) {
    let target = e.target;
    let value = target.value;

    if (isNaN(value)) {
      target.value = "";
      return;
    }

    if (value) {
      let nextElementSibling = target.nextElementSibling;
      if (nextElementSibling) {
        nextElementSibling.focus();
      }
    }
  }
  onKeyUp(e) {
    let target = e.target;
    let key = e.key.toLowerCase();

    if (["delete", "backspace"].includes(key)) {
      target.value = "";
      let previousElementSibling = target.previousElementSibling;

      if (previousElementSibling) {
        previousElementSibling.focus();
      }
    }
  }
}
