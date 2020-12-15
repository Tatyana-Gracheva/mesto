export default class Section {
  constructor({ items, renderer}, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._container = containerSelector;
  }

  renderItems() {
    this._reversItem = this._items.reverse();
    this._reversItem.forEach(item => this._renderer(item))
  }

  addItem(card) {
    this._container.prepend(card);
  }
}