
import './vue';

import { PluginFunction } from 'vue';

export = VueIosAlertView;

declare interface VueIosAlertView<T>{
  (options: string | VueIosAlertView.VueIosAlertViewOption): PromiseLike<T>;
}

declare function VueIosAlertView(strictOptions: VueIosAlertView.VueIosAlertViewOption) : PromiseLike<VueIosAlertView.VueIosAlertViewButtonData>;

declare namespace VueIosAlertView{
  export interface VueIosAlertViewButton{
    text: string;
    bold?: boolean;
    onClick?: (data: VueIosAlertViewButtonData) => never;
  }

  export interface VueIosAlertViewButtonData{
    index: number;
    value: string;
    button: VueIosAlertViewButton;
  }

  export interface VueIosAlertViewOption{
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

  export const install: PluginFunction<VueIosAlertViewOption>;
}


