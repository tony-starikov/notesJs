import { createElement, EventEmitter } from "./helpers.js";
class View extends EventEmitter {
  constructor(ui) {
    super();
    this.ui = ui;
    this.form = document.getElementById("noteForm");
    this.noteContent = document.getElementById("noteContent");
    this.noteCategory = document.getElementById("noteCategory");
    this.activeNotesList = document.getElementById("activeNotesList");
    this.archiveNotesList = document.getElementById("archiveNotesList");

    this.countTask = document.getElementById("count-task");
    this.countRandom = document.getElementById("count-random");
    this.countIdea = document.getElementById("count-idea");

    this.form.addEventListener("submit", this.handleAdd.bind(this));
  }

  findListItem(id) {
    return this.activeNotesList.querySelector(`[data-id="${id}"]`);
  }

  findArchivedListItem(id) {
    return this.archiveNotesList.querySelector(`[data-id="${id}"]`);
  }

  createElement(note) {
    const noteCol = this.ui.createUiElement(note);

    return this.addEventListeners(noteCol, note.archived);
  }

  createArchivedElement(note) {
    const noteCol = this.ui.createUiArchivedElement(note);

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

    this.ui.createUiDates(datesUl, note);

    editButton.textContent = "Edit";
    noteItem.classList.remove("editing");
  }

  show(notes) {
    notes.forEach((note) => {
      const listItem = this.createElement(note);

      this.activeNotesList.appendChild(listItem);
    });
  }

  countItems({ task, idea, random }) {
    this.countTask.textContent = `Task | Active: ${task.active} | Archived: ${task.archived}`;
    this.countRandom.textContent = `Random Thought | Active: ${random.active} | Archived: ${random.archived}`;
    this.countIdea.textContent = `Idea | Active: ${idea.active} | Archived: ${idea.archived}`;
  }
}

export default View;
