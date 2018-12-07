import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';
import '@polymer/marked-element/marked-element.js';

import './shared-styles.js';

class MyView extends PolymerElement {
  static get template() {
    return html`
      <style include="shared-styles">
        :host {
          display: block;

          padding: 10px;
        }
      </style>

      <div class="card">
      <marked-element>
      <div slot="markdown-html"></div>
      <script type="text/markdown" src="./mds/[[file]].md"></script> 
      </marked-element>
      </div>
    `;
  }
  static get properties() {
    return {
      step: {
        type: String,
        reflectToAttribute: true,
        observer: '_stepChanged'
      }
    };
  }
  constructor() {
    super();  
    this.file = "step-2"
  }
  _stepChanged(step) {
    this.file = `step-${step[4]}`;
  }
}

window.customElements.define('my-view', MyView);
