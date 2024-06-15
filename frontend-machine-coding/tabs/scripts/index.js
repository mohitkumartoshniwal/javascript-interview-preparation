import { Tab } from "./lib.js";

new Tab({
  container: ".tabs-container",
  data: [
    {
      title: "home",
      content: `
        <p>Home page</p>`,
    },
    {
      title: "pricing",
      content: `
        <p>Pricing page</p>`,
    },
    {
      title: "checkout",
      content: `
          <p>Checkout page</p>`,
    },
  ],
});
