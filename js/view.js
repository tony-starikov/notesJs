import { createElement, EventEmitter } from "./helpers.js";
class View extends EventEmitter {
  constructor() {
    super();
    this.form = document.getElementById("noteForm");
    this.noteContent = document.getElementById("noteContent");
    this.noteCategory = document.getElementById("noteCategory");
    this.activeNotesList = document.getElementById("activeNotesList");
    this.archiveNotesList = document.getElementById("archiveNotesList");

    this.form.addEventListener("submit", this.handleAdd.bind(this));
  }

  findListItem(id) {
    return this.activeNotesList.querySelector(`[data-id="${id}"]`);
  }

  findArchivedListItem(id) {
    return this.archiveNotesList.querySelector(`[data-id="${id}"]`);
  }

  createElement(note) {
    const createdAt = createElement(
      "h6",
      { className: "text-muted small" },
      `Created: ${note.createdAt}`
    );
    const category = createElement(
      "h6",
      { className: "text-muted small" },
      `Category: ${note.category}`
    );
    const content = createElement(
      "p",
      { className: "card-text content" },
      note.content
    );

    const textfield = createElement("textarea", {
      className: "form-control textfield d-none",
      rows: "3",
    });

    const datesList = createElement("ul", {
      className: "list-group list-group-flush dates",
    });

    if (note.dates) {
      const dateHeader = createElement(
        "li",
        { className: "list-group-item h6" },
        "Important dates:"
      );
      datesList.appendChild(dateHeader);

      note.dates.forEach((date) => {
        const dateItem = createElement(
          "li",
          { className: "list-group-item" },
          date
        );
        datesList.appendChild(dateItem);
      });
    }

    const cardBody = createElement(
      "div",
      { className: "card-body" },
      createdAt,
      category,
      content,
      textfield,
      datesList
    );

    const editButton = createElement(
      "button",
      { className: "btn btn-primary edit", type: "button" },
      "Edit"
    );
    const removeButton = createElement(
      "button",
      { className: "btn btn-primary remove", type: "button" },
      "Delete"
    );
    const archiveButton = createElement(
      "button",
      { className: "btn btn-primary archive", type: "button" },
      "Archive"
    );

    const whiteSpace1 = document.createTextNode("\u00A0");
    const whiteSpace2 = document.createTextNode("\u00A0");

    const cardFooter = createElement(
      "div",
      { className: "card-footer" },
      editButton,
      whiteSpace1,
      removeButton,
      whiteSpace2,
      archiveButton
    );

    const card = createElement(
      "div",
      { className: "card h-100" },
      cardBody,
      cardFooter
    );

    const noteCol = createElement(
      "div",
      {
        className: "col",
        "data-id": note.id,
      },
      card
    );

    return this.addEventListeners(noteCol, note.archived);
  }

  createArchivedElement(note) {
    const createdAt = createElement(
      "h6",
      { className: "text-muted small" },
      `Created: ${note.createdAt}`
    );
    const category = createElement(
      "h6",
      { className: "text-muted small" },
      `Category: ${note.category}`
    );
    const content = createElement(
      "p",
      { className: "card-text" },
      note.content
    );

    const datesList = createElement("ul", {
      className: "list-group list-group-flush",
    });

    if (note.dates) {
      const dateHeader = createElement(
        "li",
        { className: "list-group-item h6" },
        "Important dates:"
      );
      datesList.appendChild(dateHeader);

      note.dates.forEach((date) => {
        const dateItem = createElement(
          "li",
          { className: "list-group-item" },
          date
        );
        datesList.appendChild(dateItem);
      });
    }

    const cardBody = createElement(
      "div",
      { className: "card-body" },
      createdAt,
      category,
      content,
      datesList
    );

    const unarchiveButton = createElement(
      "button",
      { className: "btn btn-primary unarchive", type: "button" },
      "Unarchive"
    );

    const cardFooter = createElement(
      "div",
      { className: "card-footer" },
      unarchiveButton
    );

    const card = createElement(
      "div",
      { className: "card h-100" },
      cardBody,
      cardFooter
    );

    const noteCol = createElement(
      "div",
      {
        className: "col",
        "data-id": note.id,
      },
      card
    );

    return this.addEventListeners(noteCol, note.archived);
  }

  addEventListeners(note, archived) {
    if (archived) {
      const unarchiveButton = note.querySelector("button.unarchive");

      unarchiveButton.addEventListener(
        "click",
        this.handleUnarchive.bind(this)
      );
    } else {
      const archiveButton = note.querySelector("button.archive");
      const editButton = note.querySelector("button.edit");
      const removeButton = note.querySelector("button.remove");

      archiveButton.addEventListener("click", this.handleArchive.bind(this));
      editButton.addEventListener("click", this.handleEdit.bind(this));
      removeButton.addEventListener("click", this.handleRemove.bind(this));
    }

    return note;
  }

  handleAdd(event) {
    event.preventDefault();

    if (!this.noteContent.value) {
      return alert("Please, fill the note content!");
    }

    const content = this.noteContent.value;
    const category = this.noteCategory.value;

    this.emit("add", { content, category });
  }

  handleArchive({ target }) {
    const noteItem = target.parentNode.parentNode.parentNode;
    const id = noteItem.dataset.id;
    const archived = true;

    // update model
    this.emit("archive", { id, archived });
  }

  handleUnarchive({ target }) {
    const noteItem = target.parentNode.parentNode.parentNode;
    const id = noteItem.dataset.id;
    const archived = false;

    // update model
    this.emit("unarchive", { id, archived });
  }

  handleRemove({ target }) {
    const noteItem = target.parentNode.parentNode.parentNode;
    const id = noteItem.dataset.id;

    // update model
    this.emit("remove", id);
  }

  handleEdit({ target }) {
    const noteItem = target.parentNode.parentNode.parentNode;
    const id = noteItem.dataset.id;
    const note = noteItem.querySelector("p.content");
    const input = noteItem.querySelector(".textfield");
    const editButton = noteItem.querySelector("button.edit");
    const archiveButton = noteItem.querySelector("button.archive");
    const removeButton = noteItem.querySelector("button.remove");
    const content = input.value;
    removeButton.classList.toggle("d-none");
    archiveButton.classList.toggle("d-none");
    input.classList.toggle("d-none");
    note.classList.toggle("d-none");
    const isEditing = noteItem.classList.contains("editing");

    if (isEditing) {
      // update model
      this.emit("edit", { id, content });
    } else {
      input.value = note.textContent;
      editButton.textContent = "Save";
      noteItem.classList.add("editing");
    }
  }

  addItem(note) {
    const noteItem = this.createElement(note);

    this.noteContent.value = "";
    this.noteCategory.value = "Task";

    this.activeNotesList.appendChild(noteItem);
  }

  archiveItem(note) {
    this.removeItem(note.id);

    const noteItem = this.createArchivedElement(note);

    this.archiveNotesList.appendChild(noteItem);
  }

  unarchiveItem(note) {
    this.removeArchivedItem(note.id);

    const noteItem = this.createElement(note);

    this.activeNotesList.appendChild(noteItem);
  }

  removeItem(id) {
    const listItem = this.findListItem(id);

    this.activeNotesList.removeChild(listItem);
  }

  removeArchivedItem(id) {
    const listItem = this.findArchivedListItem(id);

    this.archiveNotesList.removeChild(listItem);
  }

  editItem(note) {
    const noteItem = this.findListItem(note.id);
    const content = noteItem.querySelector("p.content");
    const editButton = noteItem.querySelector("button.edit");
    const datesUl = noteItem.querySelector("ul.dates");

    content.textContent = note.content;
    datesUl.innerHTML = "";

    if (note.dates) {
      note.dates.forEach((date) => {
        const dateItem = createElement(
          "li",
          { className: "list-group-item" },
          date
        );
        datesUl.appendChild(dateItem);
      });
    }

    editButton.textContent = "Edit";
    noteItem.classList.remove("editing");
  }
}

export default View;
