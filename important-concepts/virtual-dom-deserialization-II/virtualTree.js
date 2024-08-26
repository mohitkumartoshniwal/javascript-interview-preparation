export default {
  type: "div",
  props: {
    id: "root",
    className: "container",
    children: [
      {
        type: "div",
        props: {
          className: "header",
          children: {
            type: "h1",
            props: {
              children: "Welcome to My Web Page",
            },
          },
        },
      },
      {
        type: "div",
        props: {
          className: "content",
          children: [
            {
              type: "p",
              props: {
                children:
                  "This is a simple example of HTML structure using various tags.",
              },
            },
            {
              type: "a",
              props: {
                href: "https://www.example.com",
                className: "link",
                target: "_blank",
                children: "Visit Example.com",
              },
            },
          ],
        },
      },
      {
        type: "div",
        props: {
          className: "content",
          children: {
            type: "button",
            props: {
              className: "button",
              children: "Click Me",
            },
          },
        },
      },
      {
        type: "div",
        props: {
          className: "content",
          children: {
            type: "span",
            props: {
              className: "highlight",
              children: "This is a highlighted span element.",
            },
          },
        },
      },
    ],
  },
};
