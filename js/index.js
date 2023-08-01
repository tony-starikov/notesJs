import Model from "./model.js";
import View from "./view.js";
import Controller from "./controller.js";

const currentDate = new Date();
const state = [
  {
    id: Date.now(),
    createdAt: currentDate.toDateString(),
    content: "Lorem ipsum 10.10.2010 dolor sit amet. 10.10.2011",
    category: "Task",
    dates: ["10.10.2010", "10.10.2011"],
    archived: false,
  },
  {
    id: Date.now() + 1,
    createdAt: currentDate.toDateString(),
    content: "Lorem 10.10.2020 ipsum dolor sit amet. 10.10.2021",
    category: "Task",
    dates: ["10.10.2020", "10.10.2021"],
    archived: false,
  },
  {
    id: Date.now() + 2,
    createdAt: currentDate.toDateString(),
    content:
      "Lorem ipsum dolor, 10.11.2000 sit amet consectetur adipisicing elit. Tempora, perferendis!",
    category: "Idea",
    dates: ["10.11.2000"],
    archived: false,
  },
  {
    id: Date.now() + 3,
    createdAt: currentDate.toDateString(),
    content: "Lorem ipsum 10.10.2012 dolor 10.10.2012 sit amet. 10.10.2012",
    category: "Task",
    dates: ["10.10.2012", "10.10.2012", "10.10.2012"],
    archived: false,
  },
  {
    id: Date.now() + 4,
    createdAt: currentDate.toDateString(),
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae esse id totam!",
    category: "Task",
    dates: false,
    archived: false,
  },
  {
    id: Date.now() + 5,
    createdAt: currentDate.toDateString(),
    content:
      "Lorem ipsum dolor sit amet 13.10.2013 consectetur adipisicing elit. Quae esse id totam!",
    category: "Random Thought",
    dates: ["13.10.2013"],
    archived: false,
  },
  {
    id: Date.now() + 6,
    createdAt: currentDate.toDateString(),
    content:
      "Lorem ipsum dolor, 10.11.2015 sit amet consectetur adipisicing elit. Tempora, perferendis!",
    category: "Idea",
    dates: ["10.11.2015"],
    archived: false,
  },
];

const model = new Model(state);
const view = new View();
const controller = new Controller(model, view);
