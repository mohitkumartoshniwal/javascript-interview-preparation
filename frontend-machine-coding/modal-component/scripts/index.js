import { Modal } from "./lib.js";

new Modal({
  container: ".modal-container",
  buttonSelector: ".openButton",
  title: "Title",
  content: `<p>Modal content </p>`,
});
