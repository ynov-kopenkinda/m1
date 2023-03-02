// @ts-check

const render = (structure, selector) => {
  const { props, children, type } = structure;
  const element = document.createElement(type);
  for (const [prop, value] of Object.entries(props)) {
    element[prop] = value;
  }
  if (typeof children === "string") {
    element.innerText = children;
  } else if (children !== undefined) {
    if (Array.isArray(children)) {
      for (const child of children) {
        element.appendChild(render(child));
      }
    } else {
      element.appendChild(render(children));
    }
  }

  if (selector !== undefined) {
    const root = document.querySelector(selector);
    root.appendChild(element);
  }
  return element;
};

const niveau1 = {
  type: "a",
  props: {
    href: "ynov.com",
    style: "color: #23b2a4; font-size: 40px",
  },
  children: `Lien vers ynov`,
};

const niveau2 = {
  type: "div",
  props: {
    id: "container",
    style: "padding: 10px 30px; background: #23b2a4; display: inline-block",
  },
  children: {
    type: "a",
    props: {
      href: "http://ynov.com",
      target: "_blank",
      class: "link",
      style: "text-decoration: none",
    },
    children: [
      {
        type: "p",
        props: {
          style: "color: white; font-size: 25px",
        },
        children: "YNOV",
      },
      {
        type: "p",
        props: {
          style: "color: white; font-size: 25px",
        },
        children: "YNOV",
      },
    ],
  },
};

window.addEventListener("load", () => {
  render(niveau2, "#root"); // une fois que ça fonctionne avec la variable "niveau1", remplacer par "niveau2"
});
