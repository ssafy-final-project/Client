import { ElNotification } from "element-plus";

export const notificationBottomRight = ({ title, message, type }) => {
  ElNotification({
    title,
    message,
    position: "bottom-right",
    duration: 3000,
    type,
  });
};

export const notificationTopRight = ({ title, message, type }) => {
  ElNotification({
    title,
    message,
    position: "top-right",
    duration: 3000,
    type,
  });
};

export const SuccessNotificationTopRight = (message) => {
  ElNotification({
    title: "Success!",
    message,
    position: "top-right",
    duration: 3000,
    type: "success",
  });
};
