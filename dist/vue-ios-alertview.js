(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.vueIosAlertview = global.vueIosAlertview || {})));
}(this, (function (exports) { 'use strict';

// a mini defer like angular's $q.defer()
var defer = function(){
  var promise;
  var resolve;
  var reject;

  promise = new Promise(function(_resolve_, _reject_){
    resolve = _resolve_;
    reject = _reject_;
  });

  return {
    promise: promise,
    resolve: resolve,
    reject: reject
  };
};

(function(){ if(document){ var head=document.head||document.getElementsByTagName('head')[0], style=document.createElement('style'), css=" .ios-alertview-overlay{ font-family: Helvetica Neue,Helvetica,Arial,sans-serif; color: #000; font-size: 14px; line-height: 1.4; position: fixed; left: 0; top: 0; width: 100%; height: 100%; background: rgba(0, 0, 0, 0.4); z-index: 10600; } .ios-alertview-overlay.v-enter{ opacity: 0; } .ios-alertview-overlay.v-enter-active{ transition: opacity .4s; } .ios-alertview-overlay.v-leave-active{ opacity: 0; transition: opacity .4s; } .ios-alertview-overlay *{ -webkit-tap-highlight-color: transparent; -webkit-touch-callout: none; } .ios-alertview{ width: 270px; position: absolute; z-index: 11000; left: 50%; top: 50%; text-align: center; border-radius: 7px; transform: translate3d(-50%, -50%, 0); } .ios-alertview-overlay.v-enter .ios-alertview{ opacity: 0; transform: translate3d(-50%, -50%, 0) scale(1.185); } .ios-alertview-overlay.v-enter-active .ios-alertview{ transition: all .4s; } .ios-alertview-overlay.v-leave-active .ios-alertview{ opacity: 0; z-index: 10999; transform: translate3d(-50%, -50%, 0) scale(0.815); transition: all .4s; } .ios-alertview-inner{ padding: 15px; border-bottom: 1px solid #b5b5b5; border-top-left-radius: 7px; border-top-right-radius: 7px; background: #e8e8e8; } .ios-alertview-inner-remind{ border-bottom-right-radius: 7px; border-bottom-left-radius: 7px; } .ios-alertview-title{ font-weight: bold; font-size: 18px; text-align: center; } .ios-alertview-title + .ios-alertview-text{ margin-top: 5px; } .ios-alertview-text-input{ outline: 0; box-sizing: border-box; height: 30px; background: #fff; margin: 0; margin-top: 15px; padding: 0 5px; border: 1px solid #a0a0a0; border-radius: 5px; width: 100%; font-size: 14px; font-family: inherit; display: block; box-shadow: 0 0 0 rgba(0, 0, 0, 0); appearance: none; } .ios-alertview-buttons{ overflow: hidden; } .ios-alertview-buttons-horizontal{ height: 44px; display: flex; justify-content: center; } .ios-alertview-button{ width: 100%; padding: 0 5px; height: 44px; font-size: 17px; line-height: 44px; text-align: center; color: #007aff; background: #e8e8e8; display: block; position: relative; white-space: nowrap; text-overflow: ellipsis; overflow: hidden; cursor: pointer; border-bottom: 1px solid #b5b5b5; box-sizing: border-box; } .ios-alertview-button.ios-alertview-button-bold{ font-weight: bold; } .ios-alertview-button:active{ background-color: #d4d4d4; } .ios-alertview-button:last-child{ border-radius: 0 0 7px 7px; } .ios-alertview-buttons-horizontal .ios-alertview-button{ border-bottom: none; border-right: 1px solid #b5b5b5; flex: 1; } .ios-alertview-buttons-horizontal .ios-alertview-button:first-child{ /* cancel */ border-radius: 0 0 0 7px; } .ios-alertview-buttons-horizontal .ios-alertview-button:last-child{ /* OK */ border-right: none; border-radius: 0 0 7px 0; } .ios-alertview-buttons-horizontal .ios-alertview-button:first-child:last-child{ border-radius: 0 0 7px 7px; } "; style.type='text/css'; if (style.styleSheet){ style.styleSheet.cssText = css; } else { style.appendChild(document.createTextNode(css)); } head.appendChild(style); } })();































































































































































// css 动画执行的时间
var ANIMATION_TIME = 400;

var IosAlertviewDefine = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('transition',{on:{"after-leave":_vm.afterLeave}},[(_vm.showModal)?_c('div',{staticClass:"ios-alertview-overlay"},[_c('div',{staticClass:"ios-alertview"},[_c('div',{staticClass:"ios-alertview-inner",class:{'ios-alertview-inner-remind': !_vm.buttons || !_vm.buttons.length}},[(_vm.title)?_c('div',{staticClass:"ios-alertview-title"},[_vm._v(_vm._s(_vm.title))]):_vm._e(),(_vm.text)?_c('div',{staticClass:"ios-alertview-text",domProps:{"innerHTML":_vm._s(_vm.text)}}):_vm._e(),(_vm.input)?_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.value),expression:"value"}],staticClass:"ios-alertview-text-input",attrs:{"autofocus":"","placeholder":_vm.placeholder},domProps:{"value":(_vm.value)},on:{"input":function($event){if($event.target.composing){ return; }_vm.value=$event.target.value;}}}):_vm._e()]),(_vm.buttons && _vm.buttons.length)?_c('div',{staticClass:"ios-alertview-buttons",class:{'ios-alertview-buttons-horizontal': _vm.buttons.length <= 2}},_vm._l((_vm.buttons),function(button,index){return _c('span',{staticClass:"ios-alertview-button",class:{'ios-alertview-button-bold': button.bold},on:{"click":function($event){$event.preventDefault();$event.stopPropagation();_vm.onClick(button, index);}}},[_vm._v(_vm._s(button.text))])})):_vm._e()])]):_vm._e()])},staticRenderFns: [],
  data: function () {
    return {
      value: '',
      showModal: false
    };
  },
  props: [
    'title',
    'text',
    'input',
    'placeholder',
    'onClick',
    'remindDuration',
    'buttons'
  ],
  methods: {
    activate: function(){
      var this$1 = this;

      this._deferred = defer();
      this.showModal = true;

      // no buttons, remind (ANIMATION_TIME + remindDuration) time, then auto remove
      if(!this.buttons || !this.buttons.length){
        setTimeout(function () {
          this$1.showModal = false;
          this$1._deferred.resolve();
        }, ANIMATION_TIME + this.remindDuration);
      }

      return this._deferred.promise;
    },
    onClick: function (button, index) {
      var cbkData = {
        index: index,
        button: button,
        value: this.value
      };

      if (typeof button.onClick === 'function') {
        button.onClick(cbkData);
      }

      this._deferred.resolve(cbkData);
      this.showModal = false;
    },
    afterLeave: function () {
      this.$destroy();
      this.$el.parentNode.removeChild(this.$el);
    }
  }
};

/*
object-assign
(c) Sindre Sorhus
@license MIT
*/

/* eslint-disable no-unused-vars */
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
	if (val === null || val === undefined) {
		throw new TypeError('Object.assign cannot be called with null or undefined');
	}

	return Object(val);
}

function shouldUseNative() {
	try {
		if (!Object.assign) {
			return false;
		}

		// Detect buggy property enumeration order in older V8 versions.

		// https://bugs.chromium.org/p/v8/issues/detail?id=4118
		var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
		test1[5] = 'de';
		if (Object.getOwnPropertyNames(test1)[0] === '5') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test2 = {};
		for (var i = 0; i < 10; i++) {
			test2['_' + String.fromCharCode(i)] = i;
		}
		var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
			return test2[n];
		});
		if (order2.join('') !== '0123456789') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test3 = {};
		'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
			test3[letter] = letter;
		});
		if (Object.keys(Object.assign({}, test3)).join('') !==
				'abcdefghijklmnopqrst') {
			return false;
		}

		return true;
	} catch (err) {
		// We don't expect any of the above to throw, but better to be safe.
		return false;
	}
}

var index = shouldUseNative() ? Object.assign : function (target, source) {
	var arguments$1 = arguments;

	var from;
	var to = toObject(target);
	var symbols;

	for (var s = 1; s < arguments.length; s++) {
		from = Object(arguments$1[s]);

		for (var key in from) {
			if (hasOwnProperty.call(from, key)) {
				to[key] = from[key];
			}
		}

		if (getOwnPropertySymbols) {
			symbols = getOwnPropertySymbols(from);
			for (var i = 0; i < symbols.length; i++) {
				if (propIsEnumerable.call(from, symbols[i])) {
					to[symbols[i]] = from[symbols[i]];
				}
			}
		}
	}

	return to;
};

// 默认选项
var defaults = {
  defaultOption: 'title',
  title: null,
  text: null,
  input: false,
  placeholder: '',
  cancelText: 'Cancel',
  okText: 'OK',
  remindDuration: 650
};

function install(Vue, globalOptions){
  if ( globalOptions === void 0 ) globalOptions = {};

  if (typeof globalOptions !== 'object') {
    throw new Error('Expect Object options');
  }

  var IosAlertViewComponent = Vue.extend(IosAlertviewDefine);

  // override defaults
  index(defaults, globalOptions);

  function getPropsData(options){
    if ( options === void 0 ) options = {};

    var propsData = index({}, defaults);

    if (typeof options === 'string') {
      propsData[defaults.defaultOption] = options;
    } else {
      propsData = index(propsData, options);
    }

    return propsData;
  }

  function IosAlertView(options) {
    var propsData = getPropsData(options);

    var instance = new IosAlertViewComponent({propsData: propsData});

    var mount = document.createElement('div');
    mount.id = 'ios-alert-view-' + Date.now();
    document.body.appendChild(mount);

    instance.$mount(mount);

    return instance.activate();
  }

  Vue.prototype.$iosAlertView = IosAlertView;

  Vue.prototype.$iosAlert = function (options) {
    var deferred = defer();
    var propsData = getPropsData(options);

    propsData.buttons = [{
      text: propsData.okText,
      onClick: deferred.resolve,
      bold: true
    }];

    IosAlertView(propsData);

    return deferred.promise;
  };

  Vue.prototype.$iosConfirm = function(options){
    var deferred = defer();
    var propsData = getPropsData(options);

    propsData.buttons = [{
      text: propsData.cancelText,
      onClick: deferred.reject
    }, {
      text: propsData.okText,
      onClick: deferred.resolve,
      bold: true
    }];

    IosAlertView(propsData);

    return deferred.promise;
  };

  Vue.prototype.$iosPrompt = function(options){
    var deferred = defer();
    var propsData = getPropsData(options);

    propsData.input = true;

    propsData.buttons = [{
      text: propsData.cancelText,
      onClick: deferred.reject
    }, {
      text: propsData.okText,
      onClick: function (data) {
        deferred.resolve(data.value);
      },
      bold: true
    }];

    IosAlertView(propsData);

    return deferred.promise;
  };

  Vue.prototype.$iosRemind = function(options){
    var propsData = getPropsData(options);
    return IosAlertView(propsData);
  };
}

if(typeof window !== 'undefined' && window.Vue){
  window.Vue.use(install);
}

exports['default'] = install;

Object.defineProperty(exports, '__esModule', { value: true });

})));
