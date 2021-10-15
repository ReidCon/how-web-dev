import 'regenerator-runtime/runtime';
import AbstractView from '../Main';

export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle('About');
  }

  async getHtml() {
    return `About Page`;
  }
}
