'use strict';

exports.__esModule = true;

var _dom = require('element-ui/lib/utils/dom');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Transition = function () {
  function Transition() {
    _classCallCheck(this, Transition);
  }

  Transition.prototype.beforeEnter = function beforeEnter(el) {
    (0, _dom.addClass)(el, 'horizontal-collapse-transition');
    if (!el.dataset) el.dataset = {};

    el.dataset.oldPaddingLeft = el.style.paddingLeft;
    el.dataset.oldPaddingRight = el.style.paddingRight;

    el.style.width = '0';
    el.style.paddingLeft = 0;
    el.style.paddingRight = 0;
  };

  Transition.prototype.enter = function enter(el) {
    el.dataset.oldOverflow = el.style.overflow;
    if (el.scrollWidth !== 0) {
      el.style.width = el.scrollWidth + 'px';
      el.style.paddingLeft = el.dataset.oldPaddingLeft;
      el.style.paddingRight = el.dataset.oldPaddingRight;
    } else {
      el.style.width = '';
      el.style.paddingLeft = el.dataset.oldPaddingLeft;
      el.style.paddingRight = el.dataset.oldPaddingRight;
    }

    el.style.overflow = 'hidden';
  };

  Transition.prototype.afterEnter = function afterEnter(el) {
    // for safari: remove class then reset height is necessary
    (0, _dom.removeClass)(el, 'horizontal-collapse-transition');
    el.style.width = '';
    el.style.overflow = el.dataset.oldOverflow;
  };

  Transition.prototype.beforeLeave = function beforeLeave(el) {
    if (!el.dataset) el.dataset = {};
    el.dataset.oldPaddingLeft = el.style.paddingLeft;
    el.dataset.oldPaddingRight = el.style.paddingRight;
    el.dataset.oldOverflow = el.style.overflow;

    el.style.width = el.scrollWidth + 'px';
    el.style.overflow = 'hidden';
  };

  Transition.prototype.leave = function leave(el) {
    if (el.scrollWidth !== 0) {
      // for safari: add class after set height, or it will jump to zero height suddenly, weired
      (0, _dom.addClass)(el, 'horizontal-collapse-transition');
      el.style.width = 0;
      el.style.paddingLeft = 0;
      el.style.paddingRight = 0;
    }
  };

  Transition.prototype.afterLeave = function afterLeave(el) {
    (0, _dom.removeClass)(el, 'horizontal-collapse-transition');
    el.style.width = '';
    el.style.overflow = el.dataset.oldOverflow;
    el.style.paddingLeft = el.dataset.oldPaddingLeft;
    el.style.paddingRight = el.dataset.oldPaddingRight;
  };

  return Transition;
}();

exports.default = {
  name: 'HorizontalElCollapseTransition',
  functional: true,
  render: function render(h, _ref) {
    var children = _ref.children;

    var data = {
      on: new Transition()
    };

    return h('transition', data, children);
  }
};
