
export function commonFunc(win, $){
  win.KOW = win.KOW || {};
  win.KOW['pageReposition'] = win.KOW['pageReposition'] || [];
  var hasOwnProperty = Object.prototype.hasOwnProperty;

  win.KOW.common = (function () {
    return {
      breakpoint: {
        TABLET: 1279,
        MOBILE: 767
      },
      util: {
        def: function (org, src) {
          for (var prop in src) {
            if (!hasOwnProperty.call(src, prop)) continue;
            if ('object' === $.type(org[prop])) {
              org[prop] = ('array' === $.type(org[prop])) ? src[prop].slice(0) : this.def(org[prop], src[prop]);
            } else {
              org[prop] = src[prop];
            }
          }
          return org;
        },
      },
    }
  })();
}
export function Tab(win, $){
  win.KOW = win.KOW || {};

  var UTIL = win.KOW.common.util,
    elementName = '.js-tab',
    pluginName = 'Tab';

  win.KOW[pluginName] = function (container, args) {
    var defParams = {
      selectClass: 'is-selected',
      ariaSelect: 'aria-selected',
      ariaControl: 'aria-controls'
    };
    this.obj = container;
    this.opts = UTIL.def(defParams, (args || {}));
    this.init();
  };
  win.KOW[pluginName].prototype = {
    init: function () {
      this.setElements();
      this.bindEvents();
      this.initLayout();
    },
    setElements: function () {
      this.tab = $('.js-tab');
      this.tabItem = this.tab.find('.js-tab-item');
      this.btnTab = this.tabItem.find('.js-btn-tab');
      this.tabPanel = this.tab.find('.js-tab-panel');
    },
    bindEvents: function () {
      this.tabItem.on('click', $.proxy(this.onClickFunc, this));
    },
    initLayout: function () {
      if (this.tabPanel) {
        this.tabPanel.hide();
      }
      [...this.tabItem].forEach(v => {
        if (v.classList.contains(this.opts.selectClass)) {
          var targetID = $(v).find('.js-tab-btn').attr(this.opts.ariaControl);
          $('#' + targetID).show();
        }
      });
    },
    onClickFunc: function (e) {
      e.preventDefault();
      this.changeActiveTab(e);
    },
    changeActiveTab: function (e) {
      var currentTarget, target, targetPanelID, targetParent;

      if (e.originalEvent) {
        currentTarget = $(e.currentTarget),
          target = $(e.target);
        targetParent = currentTarget.closest(this.tab);
      } else {
        currentTarget = $(e);
        target = currentTarget.children();
        targetParent = currentTarget.closest(this.tab);
      }
      this.hideTab(targetParent);
      this.visibleTargetTab(currentTarget, target, targetPanelID);

    },
    hideTab: function (_targetContainer) {
      _targetContainer.find(this.tabItem).removeClass(this.opts.selectClass);
      _targetContainer.find(this.tabPanel).hide();
    },
    visibleTargetTab: function (_currentTarget, _target, _targetPanelID) {
      _currentTarget.addClass(this.opts.selectClass);
      _target.attr(this.opts.ariaSelect, true);

      if (_target.attr(this.opts.ariaControl)) {
        _targetPanelID = _target.attr(this.opts.ariaControl);
        $('#' + _targetPanelID).show();
      }
    },
  };
  $.fn[pluginName] = function (args) {
    var _this = this;
    for (var i = 0, max = this.length; i < max; i++) {
      (function (index) {
        new win.KOW[pluginName](_this.eq(index), args);
      })(i);
    }
  };

  $(function () {
    $(elementName)[pluginName]();
  });
}

