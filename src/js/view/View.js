import icons from 'url:../../img/icons.svg';

export default class View {
  _data;

  _clearAndInsert(markup) {
    this._parentElement.innerHTML = '';
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
  render(data) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();
    this._data = data;
    const markup = this._generateMarkup();
    this._clearAndInsert(markup);
  }

  update(data) {
    this._data = data;
    const newMarkup = this._generateMarkup(); //string
    //console.log(newMarkup);

    //convert newMarkup (string format) to a DOM object
    const newDOM = document.createRange().createContextualFragment(newMarkup);
    //console.log(newDOM);

    const newElements = Array.from(newDOM.querySelectorAll('*'));
    //console.log(newElements);

    const curElements = Array.from(this._parentElement.querySelectorAll('*'));
    //console.log(curElements);

    newElements.forEach((newEl, i) => {
      const curEl = curElements[i];
      //compare curEl to newEL
      //console.log(curEl, newEl.isEqualNode(curEl));

      //Updates changed TEXT
      if (
        !newEl.isEqualNode(curEl) &&
        newEl.firstChild?.nodeValue.trim() !== ''
      ) {
        //console.log(newEl.firstChild.nodeValue.trim());
        curEl.textContent = newEl.textContent;
      }

      //Updates changed ATTRIBUTES
      if (!newEl.isEqualNode(curEl)) {
        //console.log(newEl.attributes);
        //console.log(Array.from(newEl.attributes));
        Array.from(newEl.attributes).forEach(attr =>
          curEl.setAttribute(attr.name, attr.value)
        );
      }
    });
  }

  renderSpinner = function () {
    const markup = ` <div class="spinner">
    <svg>
      <use href="${icons}#icon-loader"></use>
    </svg>
  </div>`;
    this._clearAndInsert(markup);
  };

  _generateMarkupIngredient(ingredient) {
    return ` <li class="recipe__ingredient">
    <svg class="recipe__icon">
      <use href="${icons}#icon-check"></use>
    </svg>
    <div class="recipe__quantity">${
      ingredient.quantity ? new Fraction(ingredient.quantity).toString() : ''
    }</div>
    <div class="recipe__description">
      <span class="recipe__unit">${ingredient.unit}</span>
      ${ingredient.description}
    </div>
  </li>`;
  }

  renderError(message = this._errorMessage) {
    const markup = `<div class="error">
    <div>
      <svg>
        <use href="${icons}#icon-alert-triangle"></use>
      </svg>
    </div>
    <p>${message}</p>
  </div>`;
    this._clearAndInsert(markup);
  }

  renderMessage(message = this._successMessage) {
    const markup = ` <div class="recipe">
    <div class="message">
      <div>
        <svg>
          <use href="${icons}#icon-smile"></use>
        </svg>
      </div>
      <p>${message}</p>
    </div>`;
    this._clearAndInsert(markup);
  }
}
