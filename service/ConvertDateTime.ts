import moment from "moment";

export const formatDate = (timestamp: number) => {
  return new Date(timestamp).setHours(0, 0, 0, 0);
};

export const formatDateToText = (date: Date) => {
  return moment(date).format("L");
};

export const formatTime = (timestamp: number) => {
  const date = new Date(timestamp);
  const timeString = date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  return timeString;
};
