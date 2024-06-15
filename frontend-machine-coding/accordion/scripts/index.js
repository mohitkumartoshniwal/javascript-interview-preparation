import { Accordion } from "./lib.js";

Accordion({
  container: ".accordion-container",
  data: [
    {
      title: "Section 1",
      content:
        "<p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Explicabo quasi officiis, voluptatem id molestiae maiores aliquam ipsa harum, in ratione voluptas! Provident at ducimus nam reiciendis reprehenderit, labore fugit libero.</p>",
    },

    {
      title: "Section 2",
      content:
        "<p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Explicabo quasi officiis, voluptatem id molestiae maiores aliquam ipsa harum, in ratione voluptas! Provident at ducimus nam reiciendis reprehenderit, labore fugit libero.</p>",
    },
  ],
});
