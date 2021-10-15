import 'regenerator-runtime/runtime';
import AbstractView from '../Main';

export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle('Contact');
  }

  async getHtml() {
    return `Contact Page`;
  }
}
