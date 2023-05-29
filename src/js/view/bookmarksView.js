import View from './View.js';
import previewView from './previewView.js';
import icons from 'url:../../img/icons.svg';

class BookmarksView extends View {
  _errorMessage = ' No bookmarks yet. Find a nice recipe and bookmark it :)';
  _successMessage = '';
  _parentElement = document.querySelector('.bookmarks__list');

  _generateMarkup() {
    return this._data.map(bookmark => previewView.render(bookmark,false)).join('');
  }
}

export default new BookmarksView();
