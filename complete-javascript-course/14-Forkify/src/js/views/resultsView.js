import View from "./View.js";
import icons from "url:../../img/icons.svg"; // parcel 2
import previewView from "./previewView.js";

class ResultsView extends View {
  _parentElement = document.querySelector(".results");
  _errorMessage = "Sorry, no recipes were found for the search";
  _message = "";

  _generateMarkup() {
    // console.log("data inside generateMarkup()", this._data);

    return this._data
      .map((results) => previewView.render(results, false))
      .join("");
  }
}

export default new ResultsView();
