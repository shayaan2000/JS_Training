import icons from "url:../../img/icons.svg"; // parcel 2

export default class View {
  _data;
  render(data, render = true) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();

    this._data = data;

    if (!render) return this._generateMarkup();
    this._clear();
    this._parentElement.insertAdjacentHTML(
      "afterbegin",
      this._generateMarkup()
    ); // inserting markup
  }

  update(data) {
    this._data = data;
    const newMarkup = this._generateMarkup();

    //compare new and old markups
    const newDOM = document.createRange().createContextualFragment(newMarkup);
    const newElements = Array.from(newDOM.querySelectorAll("*"));
    const curElements = Array.from(this._parentElement.querySelectorAll("*"));
    // console.log("NEW: ", newElements);
    // console.log("OLD: ", curElements);

    newElements.forEach((newEl, i) => {
      const curEl = curElements[i];
      // console.log(curEl, newEl.isEqualNode(curEl));

      // updates changed text
      if (
        !newEl.isEqualNode(curEl) &&
        newEl.firstChild?.nodeValue.trim() !== ""
      ) {
        curEl.textContent = newEl.textContent;
      }

      // updates attributes like data-goto
      if (!newEl.isEqualNode(curEl))
        Array.from(newEl.attributes).forEach((attr) =>
          curEl.setAttribute(attr.name, attr.value)
        );
    });
  }

  _clear() {
    this._parentElement.innerHTML = "";
  }

  // Showing spinner
  renderSpinner() {
    const markup = `
      <div class="spinner">
        <svg>
          <use href="${icons}#icon-loader"></use>
        </svg>
      </div> `;
    this._clear();
    this._parentElement.insertAdjacentHTML("afterBegin", markup);
  }

  renderError(message = this._errorMessage) {
    const markup = `
      <div class="error">
          <div> 
              <svg>
              <use href="${icons}#icon-alert-triangle"></use>
              </svg>
          </div>
          <p>${message}</p>
      </div> `;

    this._clear();
    this._parentElement.insertAdjacentHTML("afterBegin", markup);
  }

  renderMessage(message = this._message) {
    const markup = `
      <div class="message">
          <div> 
              <svg>
              <use href="${icons}#icon-smile"></use>
              </svg>
          </div>
          <p>${message}</p>
      </div> `;

    this._clear();
    this._parentElement.insertAdjacentHTML("afterBegin", markup);
  }
}
