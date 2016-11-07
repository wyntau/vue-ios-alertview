import Vue = require('vue');

import VueIosAlertView = require('./index');

declare module "vue/types/vue" {
  interface Vue {
    $iosAlert: VueIosAlertView.VueIosAlertView<never>;
    $iosConfirm: VueIosAlertView.VueIosAlertView<never>;
    $iosPrompt: VueIosAlertView.VueIosAlertView<string>;
    $iosRemind: VueIosAlertView.VueIosAlertView<never>;
    $iosAlertView: VueIosAlertView.VueIosAlertViewStrict;
  }
}
