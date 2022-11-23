import {isNil, trim} from 'lodash'
import { message } from "antd";

/**
 * 复制文本到剪贴板
 */
export function handleClipboard(text: string, successMsg?: string | undefined) {
  if (trim(text) === '') {
    return;
  }
  const textField = document.createElement('textarea');
  textField.innerText = text;
  document.body.appendChild(textField);
  textField.select();
  document.execCommand('copy');
  textField.remove();
  // if (successMsg) {
  //   message.success(`${successMsg} copied. press 'Ctrl+V' to use.`);
  // } else {
  //   message.success(`${text} copied. press 'Ctrl+V' to use.`);
  // }
}
