import '@polymer/polymer/polymer-element.js';

const $_documentContainer = document.createElement('template');
$_documentContainer.innerHTML = `<dom-module id="shared-styles">
  <template>
    <style>
      .card {
        margin: 24px;
        padding: 16px;
        border-radius: 5px;
        background-color: #fff;
        box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12), 0 3px 1px -2px rgba(0, 0, 0, 0.2);
      }

      .circle {
        display: inline-block;
        width: 64px;
        height: 64px;
        text-align: center;
        color: #555;
        border-radius: 50%;
        background: #ddd;
        font-size: 30px;
        line-height: 64px;
      }

      h1 {
        margin: 16px 0;
        color: #212121;
        font-size: 22px;
      }

      img {
        width: auto;
        height: auto;
        max-width: 68%;
        max-height: 30rem;
        display: block;
        margin-left: auto;
        margin-right: auto;
        margin-top: 10px;
        margin-bottom: 10px;
      }
      pre {
        font-family: Inconsolata, Consolas, 'DEJA VU SANS MONO', 'DROID SANS MONO', Proggy, monospace;
        font-size: 80%;
        background-color: #f4f4f4;
        border: 1px solid #e0e0e0;
        border-radius: 4px;
        padding: 5px;
        line-height: 1.3;
        display: block;
        width: 100%;
        overflow: auto;
      }
      code {
        font-family: Inconsolata, Consolas, 'DEJA VU SANS MONO', 'DROID SANS MONO', Proggy, monospace;
        background-color: #eff0f1;
        white-space: pre-wrap;
        padding: 1px 5px;
      }
    </style>
  </template>
</dom-module>`;

document.head.appendChild($_documentContainer.content);
