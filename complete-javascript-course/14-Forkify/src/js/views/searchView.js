class SearchView {
  _parentElement = document.querySelector(".search");

  getQuery() {
    const query = this._parentElement.querySelector(".search__field").value;
    this._clearInput();
    return query;
  }

  _clearInput() {
    this._parentElement.querySelector(".search__field").value = "";
  }

  // Publisher in Publisher-Subscriber
  addHandlerRender(handler) {
    // listening to ID change in link
    this._parentElement.addEventListener("submit", function (e) {
      e.preventDefault(); //needed with submit a form
      handler();
    });
  }
}

export default new SearchView();
