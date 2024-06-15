import { Carousel } from "./lib.js";

Carousel({
  container: ".carousel-container",
  data: [
    {
      src: "https://source.unsplash.com/a-cluster-of-stars-in-the-night-sky-w5N9CqsSnQ4",
    },
    {
      src: "https://source.unsplash.com/a-couple-of-tall-buildings-next-to-each-other-9bLnvxJcxgg",
    },
    {
      src: "https://source.unsplash.com/a-couple-of-people-that-are-standing-in-a-tunnel-tDqn8GeRgnU",
    },
  ],
  timeout: 3000,
  leftToRight: false,
});
