import View from './View.js';
import icons from 'url:../../img/icons.svg';
class ResultsView extends View {
  _errorMessage = 'No recipes found for your query! Please try again ;)';
  _successMessage = '';
  _parentElement = document.querySelector('.results');

  _generateMarkup() {
    return this._data
      .map(result => {
        return `<li class="preview">
        <a class="preview__link" href="#${result.id}">
          <figure class="preview__fig">
            <img src="${result.image}" alt="${result.title}" />
          </figure>
          <div class="preview__data">
            <h4 class="preview__title">${result.title}</h4>
            <p class="preview__publisher">${result.publisher}</p>
          </div>
        </a>
      </li>`;
      })
      .join('');
  }

  generateMarkupPreview() {
    return `<li class="preview">
    <a class="preview__link preview__link--active" href="#23456">
      <figure class="preview__fig">
        <img src="src/img/test-1.jpg" alt="Test" />
      </figure>
      <div class="preview__data">
        <h4 class="preview__title">Pasta with Tomato Cream ...</h4>
        <p class="preview__publisher">The Pioneer Woman</p>
        <div class="preview__user-generated">
          <svg>
            <use href="src/img/icons.svg#icon-user"></use>
          </svg>
        </div>
      </div>
    </a>
  </li>`;
  }
}

export default new ResultsView();