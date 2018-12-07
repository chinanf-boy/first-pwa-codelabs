import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';
import {
  setPassiveTouchGestures,
  setRootPath
} from '@polymer/polymer/lib/utils/settings.js';
import '@polymer/app-layout/app-drawer/app-drawer.js';
import '@polymer/app-layout/app-drawer-layout/app-drawer-layout.js';
import '@polymer/app-layout/app-header/app-header.js';
import '@polymer/app-layout/app-header-layout/app-header-layout.js';
import '@polymer/app-layout/app-scroll-effects/app-scroll-effects.js';
import '@polymer/app-layout/app-toolbar/app-toolbar.js';
import '@polymer/app-route/app-location.js';
import '@polymer/app-route/app-route.js';
import '@polymer/iron-pages/iron-pages.js';
import '@polymer/iron-selector/iron-selector.js';
import '@polymer/paper-icon-button/paper-icon-button.js';
import './my-icons.js';

// Gesture events like tap and track generated from touch will not be
// preventable, allowing for better scrolling performance.
setPassiveTouchGestures(true);

// Set Polymer's root path to the same value we passed to our service worker
// in `index.html`.
setRootPath(MyAppGlobals.rootPath);

class MyApp extends PolymerElement {
  static get template() {
    return html`
      <style>
        :host {
          --app-primary-color: #4285f4;
          --app-secondary-color: black;

          display: block;
        }

        app-drawer-layout:not([narrow]) [drawer-toggle] {
          display: none;
        }

        app-header {
          color: #fff;
          background-color: var(--app-primary-color);
        }

        app-header paper-icon-button {
          --paper-icon-button-ink-color: white;
        }

        .drawer-list {
          margin: 0 20px;
        }

        .drawer-list a {
          display: block;
          padding: 0 16px;
          text-decoration: none;
          color: var(--app-secondary-color);
          line-height: 40px;
        }

        .drawer-list a.iron-selected {
          color: black;
          font-weight: bold;
        }
      </style>

      <app-location route="{{route}}" url-space-regex="^[[rootPath]]">
      </app-location>

      <app-route route="{{route}}" pattern="[[rootPath]]:page" data="{{routeData}}" tail="{{subroute}}">
      </app-route>

      <app-drawer-layout fullbleed="" narrow="{{narrow}}">
        <!-- Drawer content -->
        <app-drawer id="drawer" slot="drawer" swipe-open="[[narrow]]">
          <app-toolbar>步骤</app-toolbar>
          <iron-selector selected="[[page]]" attr-for-selected="name" class="drawer-list" role="navigation">
            <a name="view1" href="[[rootPath]]view1">1. 介绍</a>
            <hr style="width:88%;" /><a name="view2" href="[[rootPath]]view2">2. 开始</a>
            <hr style="width:88%;" /><a name="view3" href="[[rootPath]]view3">3. 设计 app shell 框架</a>
            <hr style="width:88%;" /><a name="view4" href="[[rootPath]]view4">4. 实现 app shell</a>
            <hr style="width:88%;" /><a name="view5" href="[[rootPath]]view5">5. 从第一次快速载入开始</a>
            <hr style="width:88%;" /><a name="view6" href="[[rootPath]]view6">6. 使用 service worker 预缓存 app shell</a>
            <hr style="width:88%;" /><a name="view7" href="[[rootPath]]view7">7. 使用 service worker 缓存预报数据</a>
            <hr style="width:88%;" /><a name="view8" href="[[rootPath]]view8">8. 支持原生集成</a>
            <hr style="width:88%;" /><a name="view9" href="[[rootPath]]view9">9. 分发到安全的主机然后庆祝一下</a>
          </iron-selector>
        </app-drawer>

        <!-- Main content -->
        <app-header-layout has-scrolling-region="">

          <app-header slot="header" condenses="" reveals="" effects="waterfall">
            <app-toolbar>
            <paper-icon-button src="https://assets-cdn.github.com/images/modules/logos_page/Octocat.png" alt="octocat" title="octocat"></paper-icon-button>
              <div main-title="">你的第一个渐进式Web应用程序</div>
            </app-toolbar>
          </app-header>

          <iron-pages selected="[[page]]" attr-for-selected="name" role="main">
            <my-view name="[[page]]" step="[[page]]"></my-view>
            <my-view404 name="view404"></my-view404>
          </iron-pages>
        </app-header-layout>
      </app-drawer-layout>
    `;
  }

  static get properties() {
    return {
      page: {
        type: String,
        reflectToAttribute: true,
        observer: '_pageChanged'
      },
      routeData: Object,
      subroute: Object
    };
  }

  static get observers() {
    return ['_routePageChanged(routeData.page)'];
  }

  _routePageChanged(page) {
    // Show the corresponding page according to the route.
    //
    // If no page was found in the route data, page will be an empty string.
    // Show 'view1' in that case. And if the page doesn't exist, show 'view404'.
    if (!page) {
      this.page = 'view1';
    } else if (page.startsWith("view")) {
      this.page = page;
    } else {
      this.page = 'view404';
    }

    // Close a non-persistent drawer when the page & route are changed.
    if (!this.$.drawer.persistent) {
      this.$.drawer.close();
    }
  }

  _pageChanged(page) {
    switch (true) {
      case (page.length <= 5): // 'view1' == 5
        import('./my-view.js');
        break;
      case (page.length > 5): // 'view404' == 5
        import('./my-view404.js');
        break;
    }
  }
}

window.customElements.define('my-app', MyApp);
