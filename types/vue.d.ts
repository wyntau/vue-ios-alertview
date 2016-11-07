import Vue = require('vue');

import VueIosAlertView = require('./index');

declare module "vue/types/vue" {
  interface Vue {
    $iosAlert: VueIosAlertView<never>;
    $iosConfirm: VueIosAlertView<never>;
    $iosPrompt: VueIosAlertView<string>;
    $iosRemind: VueIosAlertView<never>;
    $iosAlertView: typeof VueIosAlertView;
  }
}
