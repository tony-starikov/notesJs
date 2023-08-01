class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    view.on("add", this.addNote.bind(this));
    view.on("archive", this.archiveNote.bind(this));
    view.on("unarchive", this.unarchiveNote.bind(this));
    view.on("remove", this.removeNote.bind(this));
    view.on("edit", this.editNote.bind(this));

    view.show(this.model.state);
    view.countItems(this.model.countItems());
  }

  addNote({ content, category }) {
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

    this.countNotes();

    this.view.addItem(note);
  }

  archiveNote({ id, archived }) {
    const note = this.model.updateItem(id, { archived });

    this.countNotes();

    this.view.archiveItem(note);
  }

  unarchiveNote({ id, archived }) {
    const note = this.model.updateItem(id, { archived });

    this.countNotes();

    this.view.unarchiveItem(note);
  }

  removeNote(id) {
    this.model.removeItem(id);

    this.countNotes();

    this.view.removeItem(id);
  }

  editNote({ id, content }) {
    const note = this.model.updateItem(id, { content });

    this.countNotes();

    this.view.editItem(note);
  }

  countNotes() {
    let count;
    try {
      count = this.model.countItems();
    } catch {
      alert("model error");
    }
    
    this.view.countItems(count);
  }
}

export default Controller;
