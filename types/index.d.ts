
import './vue';

import { PluginFunction } from 'vue';

export = VueIosAlertView;

declare let VueIosAlertView: PluginFunction<VueIosAlertView.VueIosAlertViewOption>

declare namespace VueIosAlertView {

  export interface VueIosAlertView<T> {
    (options: string | VueIosAlertView.VueIosAlertViewOption): PromiseLike<T>;
  }

  export interface VueIosAlertViewStrict {
    (strictOptions: VueIosAlertView.VueIosAlertViewOption): PromiseLike<VueIosAlertView.VueIosAlertViewButtonData>;
  }

  export interface VueIosAlertViewButton {
    text: string;
    bold?: boolean;
    onClick?: (data: VueIosAlertViewButtonData) => never;
  }

  export interface VueIosAlertViewButtonData {
    index: number;
    value: string;
    button: VueIosAlertViewButton;
  }

  export interface VueIosAlertViewOption {
    defaultOption?: string;
    title?: string;
    text?: string;
    input?: boolean;
    placeholder?: string;
    cancelText?: string;
    okText?: string;
    remindDuration?: number;
    buttons?: Array<VueIosAlertViewButton>;
    [key: string]: any;
  }
}


