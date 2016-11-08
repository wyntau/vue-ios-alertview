(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports"], factory);
    }
    else if(typeof window !== 'undefined' && window.Vue){
      window.Vue.use(factory());
    }
})(function (require, exports) {
  "use strict";
  var template = [
    '<transition @after-leave="afterLeave">',
      '<div class="ios-alertview-overlay" v-if="showModal">',
        '<div class="ios-alertview">',
          '<div class="ios-alertview-inner" :class="{\'ios-alertview-inner-remind\': !buttons || !buttons.length}">',
            '<div class="ios-alertview-title" v-if="title">{{ title }}</div>',
            '<div class="ios-alertview-text" v-html="text" v-if="text"></div>',
            '<input autofocus class="ios-alertview-text-input" :placeholder="placeholder" v-model="value" v-if="input" />',
          '</div>',
          '<div class="ios-alertview-buttons" v-if="buttons && buttons.length" :class="{\'ios-alertview-buttons-horizontal\': buttons.length <= 2}">',
            '<span class="ios-alertview-button" :class="{\'ios-alertview-button-bold\': button.bold}" v-for="(button, index) in buttons" @click.prevent.stop="onClick(button, index)">{{ button.text }}</span>',
          '</div>',
        '</div>',
      '</div>',
    '</transition>'
  ].join('');

  // css 动画执行的时间
  var ANIMATION_TIME = 400;

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

  return function(Vue, globalOptions){

    globalOptions = globalOptions || {};

    if (typeof globalOptions !== 'object') {
      throw new Error('Expect Object options');
    }

    // override defaults
    defaults = Vue.util.extend(defaults, globalOptions);

    var IosAlertViewComponent = Vue.extend({
      template: template,
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
          var self = this;

          self._deferred = defer();

          self.showModal = true;

          // no buttons, remind (ANIMATION_TIME + remindDuration) time, then auto remove
          if(!self.buttons || !self.buttons.length){
            setTimeout(function(){
              self.showModal = false;
              self._deferred.resolve();
            }, ANIMATION_TIME + self.remindDuration);
          }

          return self._deferred.promise;
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
        }
      }
    });

    function getPropsData(options){
      options = options || {};

      var propsData = Vue.util.extend({}, defaults);

      if (typeof options === 'string') {
        propsData[defaults.defaultOption] = options;
      } else {
        propsData = Vue.util.extend(propsData, options);
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

      propsData.buttons = [
        {
          text: propsData.okText,
          onClick: deferred.resolve,
          bold: true
        }
      ];

      IosAlertView(propsData);

      return deferred.promise;
    };

    Vue.prototype.$iosConfirm = function(options){
      var deferred = defer();
      var propsData = getPropsData(options);

      propsData.buttons = [
        {
          text: propsData.cancelText,
          onClick: deferred.reject
        },
        {
          text: propsData.okText,
          onClick: deferred.resolve,
          bold: true
        }
      ];

      IosAlertView(propsData);

      return deferred.promise;
    };

    Vue.prototype.$iosPrompt = function(options){
      var deferred = defer();
      var propsData = getPropsData(options);

      propsData.input = true;

      propsData.buttons = [
        {
          text: propsData.cancelText,
          onClick: deferred.reject
        },
        {
          text: propsData.okText,
          onClick: function (data) {
            deferred.resolve(data.value);
          },
          bold: true
        }
      ];

      IosAlertView(propsData);

      return deferred.promise;
    };

    Vue.prototype.$iosRemind = function(options){
      var propsData = getPropsData(options);
      return IosAlertView(propsData);
    };
  }
});

