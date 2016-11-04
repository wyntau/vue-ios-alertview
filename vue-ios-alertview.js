(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports"], factory);
    }
    else {
      factory();
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

  var IosAlertView = Vue.extend({
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
    mounted: function () {
      var self = this;
      self.$nextTick(function () {
        self.showModal = true;

        if (!self.buttons || !self.buttons.length) {
          setTimeout(function () {
            self.showModal = false;
          }, 400 + self.remindDuration || 650);
        }
      });
    },
    methods: {
      onClick: function (button, index) {
        var cbkData = {
          index: index,
          button: button,
          value: this.value
        };

        if (typeof button.onClick === 'function') {
          button.onClick(cbkData);
        }

        this.showModal = false;
      },
      afterLeave: function () {
        this.$destroy();
      }
    }
  });

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

  function openIosAlertView(propsData) {
    var instance = new IosAlertView({propsData: propsData || {}});

    var mount = document.createElement('div');
    var mountId = 'ios-alert-view-' + Date.now();

    mount.id = mountId;

    document.body.appendChild(mount);

    instance.$mount(mount);
  }

  openIosAlertView.install = function (Vue, globalOptions) {

    globalOptions = globalOptions || {};

    if (typeof globalOptions !== 'object') {
      throw 'Expect Object options';
    }

    var defaultOption = globalOptions.defaultOption || defaults.defaultOption;

    Vue.prototype.$iosAlertView = openIosAlertView;

    Vue.prototype.$iosAlert = function (options) {

      options = options || '';

      var propsData = Vue.util.extend({}, defaults);
      if (typeof options === 'string') {
        propsData[defaultOption] = options;
      } else {
        propsData = Vue.util.extend(propsData, options);
      }

      return new Promise(function (resolve, reject) {
        propsData.buttons = [
          {
            text: propsData.okText,
            onClick: resolve,
            bold: true
          }
        ];

        openIosAlertView(propsData);
      });
    };

    Vue.prototype.$iosConfirm = function(options){
      options = options || '';

      var propsData = Vue.util.extend({}, defaults);
      if (typeof options === 'string') {
        propsData[defaultOption] = options;
      } else {
        propsData = Vue.util.extend(propsData, options);
      }

      return new Promise(function(resolve, reject){
        propsData.buttons = [
          {
            text: propsData.cancelText,
            onClick: reject
          },
          {
            text: propsData.okText,
            onClick: resolve,
            bold: true
          }
        ];

        openIosAlertView(propsData);
      });
    };

    Vue.prototype.$iosPrompt = function(options){
      options = options || '';

      var propsData = Vue.util.extend({}, defaults);
      if (typeof options === 'string') {
        propsData[defaultOption] = options;
      } else {
        propsData = Vue.util.extend(propsData, options);
      }

      propsData.input = true;

      return new Promise(function(resolve, reject){
        propsData.buttons = [
          {
            text: propsData.cancelText,
            onClick: reject
          },
          {
            text: propsData.okText,
            onClick: function (data) {
              resolve(data.value);
            },
            bold: true
          }
        ];

        openIosAlertView(propsData);
      });
    };

    Vue.prototype.$iosRemind = function(options){
      options = options || '';

      var propsData = Vue.util.extend({}, defaults);
      if (typeof options === 'string') {
        propsData[defaultOption] = options;
      } else {
        propsData = Vue.util.extend(propsData, options);
      }

      return new Promise(function(resolve, reject){
        openIosAlertView(propsData);
        setTimeout(resolve, 400 + propsData.remindDuration);
      });
    };
  };

  if(window && window.Vue){
    window.Vue.use(openIosAlertView.install);
  }

  return openIosAlertView;
});

