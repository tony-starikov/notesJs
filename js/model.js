class Model {
  constructor(state = []) {
    this.state = state;
  }

  getItem(id) {
    return this.state.find((item) => item.id == id);
  }

  addItem(item) {
    this.state.push(item);

    return item;
  }

  updateItem(id, data) {
    const item = this.getItem(id);

    Object.keys(data).forEach((prop) => (item[prop] = data[prop]));

    const dates = this.findDates(item.content);

    item.dates = dates;

    return item;
  }

  removeItem(id) {
    const index = this.state.findIndex((item) => item.id == id);

    if (index > -1) {
      this.state.splice(index, 1);
    }
  }

  findDates(content) {
    const regex =
      /\s*(3[01]|[12][0-9]|0?[1-9])[/.-](1[012]|0?[1-9])[/.-]((?:19|20)\d{2})\s*/g;

    const dates = content.match(regex);

    return dates || false;
  }

  getDate() {
    const date = new Date();
    return date.toDateString();
  }

  countItems() {
    const count = {
      task: {
        active: 0,
        archived: 0,
      },
      idea: {
        active: 0,
        archived: 0,
      },
      random: {
        active: 0,
        archived: 0,
      },
    };

    const result = this.state.reduce((accumulator, item) => {
      if (item.category == "Task") {
        item.archived ? accumulator.task.archived++ : accumulator.task.active++;
      } else if (item.category == "Idea") {
        item.archived ? accumulator.idea.archived++ : accumulator.idea.active++;
      } else {
        item.archived
          ? accumulator.random.archived++
          : accumulator.random.active++;
      }
      return accumulator;
    }, count);

    return result;
  }
}

export default Model;
