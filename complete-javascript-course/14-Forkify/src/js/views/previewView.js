import View from "./View.js";
import icons from "url:../../img/icons.svg"; // parcel 2

class PreviewView extends View {
  _parentElement = "";

  _generateMarkup(rec) {
    const id = window.location.hash.slice(1);
    return `
        <li class="preview">
          <a class="preview__link" ${
            id === this._data.id ? "preview__link--active" : ""
          }  href="#${this._data.id}">
            <figure class="preview__fig">
              <img src="src/img/test-1.jpg" alt="Test" />
            </figure>
            <div class="preview__data">
              <h4 class="preview__name">${this._data.title}</h4>
              <p class="preview__publisher">${this._data.publisher}</p>
              <div class="preview__user-generated ${
                this._data.key ? "" : "hidden"
              }">
              <svg>
                <use href="${icons}#icon-user"></use>
              </svg>
            </div>
            </div>

          </a>
        </li>`;
  }
}

export default new PreviewView();
