class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    view.on("add", this.addNote.bind(this));
  }

  addNote({content, category}) {
    const dates = this.model.findDates(content);
    const currentDate = this.model.getDate();

    const note = this.model.addItem({
      id: Date.now(),
      createdAt: currentDate,
      content,
      category,
      dates,
      archived: false,
    });

    this.view.addItem(note);
  }
}

export default Controller;
