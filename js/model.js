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
}

export default Model;
