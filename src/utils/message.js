import {
  Message
} from "element-ui";
let messageInstance = null;
const rewriteMessage = options => {
  if (messageInstance) {
    messageInstance.close();
  }
  messageInstance = Message(options);
};

["error", "success", "info", "warning"].forEach(type => {
  rewriteMessage[type] = options => {
    if (typeof options === "string") {
      options = {
        message: options
      };
    }
    options.type = type;
    return rewriteMessage(options);
  };
});

//错误提示中使用
export default function handleError(data) {
  console.log(data);
  console.log(typeof data);
  if (data instanceof Error) {
    rewriteMessage.error(data.message);
  } else if (typeof data === "string") {
    rewriteMessage.error(data);
  } else if (typeof data === 'object') {
    rewriteMessage.error(data.message);
  }
  return window.Promise.reject(data);
}