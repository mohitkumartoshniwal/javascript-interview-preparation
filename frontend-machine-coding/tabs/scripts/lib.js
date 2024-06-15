let defaultConfig = {
  container: ".tabs-container",
  data: [
    {
      title: "title1",
      content: "content",
    },
  ],
};

export class Tab {
  constructor(config) {
    this.config = JSON.parse(JSON.stringify(config));
    this.init(config);
  }

  init(config) {
    Object.keys(config).forEach((key) => {
      this.config[key] = config[key];
    });
    this.createTabs();
  }

  createTabs() {
    this.container = document.querySelector(this.config.container);

    if (!this.container) return;

    this.tabsHeader = document.createElement("div");
    this.tabsHeader.classList.add("tabs-header");

    this.tabsContent = document.createElement("div");
    this.tabsContent.classList.add("tabs-content");

    let frag = document.createDocumentFragment();
    let tabsHeaderFrag = document.createDocumentFragment();
    let tabsContentFrag = document.createDocumentFragment();

    for (let index = 0; index < this.config.data.length; index++) {
      let { title, content } = this.config.data[index];

      let tabHeader = document.createElement("div");
      tabHeader.setAttribute("data-tab-header", title);
      tabHeader.textContent = title.toUpperCase();
      tabsHeaderFrag.appendChild(tabHeader);

      let tabContent = document.createElement("div");
      tabContent.setAttribute("data-tab-content", title);
      tabContent.innerHTML = content;
      tabsContentFrag.appendChild(tabContent);
    }

    tabsHeaderFrag.childNodes[0].classList.add("active");
    tabsContentFrag.childNodes[0].classList.add("active");

    this.tabsHeader.appendChild(tabsHeaderFrag);
    this.tabsContent.appendChild(tabsContentFrag);

    frag.appendChild(this.tabsHeader);
    frag.appendChild(this.tabsContent);

    this.container.appendChild(frag);
    this.container.addEventListener("click", this.onClick.bind(this));
  }

  onClick(e) {
    let tabValue = e.target.dataset.tabHeader;
    if (!tabValue) return;

    [...this.tabsHeader.children].forEach((tabHeader) => {
      tabHeader.classList.remove("active");
      if (tabHeader.getAttribute("data-tab-header") === tabValue) {
        tabHeader.classList.add("active");
      }
    });

    [...this.tabsContent.children].forEach((tabContent) => {
      tabContent.classList.remove("active");
      if (tabContent.getAttribute("data-tab-content") === tabValue) {
        tabContent.classList.add("active");
      }
    });
  }
}
