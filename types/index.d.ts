
import './vue';

import { PluginFunction } from 'vue';

export default VueIosAlertView;

declare let VueIosAlertView: PluginFunction<GlobalOption>;

export interface BaseOption {
  title?: string;
  text?: string;
  [key: string]: any;
}

export interface AlertOption extends BaseOption {
  okText?: string;
}

export interface ConfirmOption extends BaseOption {
  okText?: string;
  cancelText?: string;
}

export interface PromptOption extends BaseOption {
  // input?: boolean; // only alertview support this option
  placeholder?: string;
  okText?: string;
  cancelText?: string;
}

export interface RemindOption extends BaseOption {
  remindDuration?: number;
}

export interface AlertViewOption extends BaseOption {
  input?: boolean;
  placeholder?: string;
  okText?: string;
  cancelText?: string;
  remindDuration?: number;
  buttons?: Array<ButtonObject>
}

export interface GlobalOption extends AlertViewOption {
  defaultOption?: 'title' | 'text';
}

export interface ButtonObject {
  text: string;
  bold?: boolean;
  onClick?: (data: ButtonData) => never;
}

export interface ButtonData {
  index: number;
  button: ButtonObject;
  value?: string;
}
