import defer from './defer.js';
import IosAlertviewDefine from './iosAlertview.vue';

// 默认选项
const defaults = {
  defaultOption: 'title',
  title: null,
  text: null,
  input: false,
  placeholder: '',
  cancelText: 'Cancel',
  okText: 'OK',
  remindDuration: 650
};

function install(Vue, globalOptions = {}){
  if (typeof globalOptions !== 'object') {
    throw new Error('Expect Object options');
  }

  const IosAlertViewComponent = Vue.extend(IosAlertviewDefine);

  // override defaults
  Object.assign(defaults, globalOptions);

  function getPropsData(options = {}){
    let propsData = Object.assign({}, defaults);

    if (typeof options === 'string') {
      propsData[defaults.defaultOption] = options;
    } else {
      propsData = Object.assign(propsData, options);
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

export default install;
