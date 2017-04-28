import Vue = require('vue');

import {
  AlertOption,
  ConfirmOption,
  PromptOption,
  RemindOption,
  AlertViewOption,
  ButtonData
} from './index';

interface $iosAlert {
  (option: string): PromiseLike<ButtonData>;
  (option: AlertOption): PromiseLike<ButtonData>;
}

interface $iosConfirm {
  (option: string): PromiseLike<ButtonData>;
  (option: ConfirmOption): PromiseLike<ButtonData>;
}

interface $iosPrompt {
  (option: string): PromiseLike<ButtonData>;
  (option: PromptOption): PromiseLike<ButtonData>;
}

interface $iosRemind {
  (option: string): PromiseLike<never>;
  (option: RemindOption): PromiseLike<never>;
}

interface $iosAlertView {
  (option: AlertViewOption): PromiseLike<ButtonData>;
}

declare module "vue/types/vue" {
  interface Vue {
    $iosAlert: $iosAlert;
    $iosConfirm: $iosConfirm;
    $iosPrompt: $iosPrompt;
    $iosRemind: $iosRemind;
    $iosAlertView: $iosAlertView;
  }
}
