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

export const getDatesRange = (startDate: any, endDate: any) => {
  const start = moment(new Date(startDate), "MM/DD/YYYY");
  const end = moment(new Date(endDate), "MM/DD/YYYY");
  const dates = [];

  while (start.isSameOrBefore(end)) {
    dates.push(start.format("MM/DD/YYYY"));
    start.add(1, "day");
  }

  return dates;
};

// get dates from todays date to next seven days!
export const getDateRangesToDisplay = () => {
  const dateList = [];

  for (let i = 0; i < 7; i++) {
    dateList.push({
      date: moment().add(i, "days").format("DD"),
      day: moment().add(i, "days").format("dd"),
      formattedDate: moment().add(i, "days").format("L"),
    });
  }

  return dateList;
};
