import { createElement } from "./helpers.js";
class UI {
  createUiElement(note) {
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

    this.createUiDates(datesList, note);

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

    return noteCol;
  }

  createUiArchivedElement(note) {
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

    this.createUiDates(datesList, note);

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

    return noteCol;
  }

  createUiDates(parentElement, note) {
    if (note.dates) {
      const dateHeader = createElement(
        "li",
        { className: "list-group-item h6" },
        "Important dates:"
      );
      parentElement.appendChild(dateHeader);
      note.dates.forEach((date) => {
        const dateItem = createElement(
          "li",
          { className: "list-group-item" },
          date
        );
        parentElement.appendChild(dateItem);
      });
    }

    return parentElement;
  }
}

export default UI;
