import moment from 'moment';

export const formatDate = (timestamp: number) => {
  return new Date(timestamp).setHours(0, 0, 0, 0);
};


export const formatDateToText = (date:Date) => {
    return moment(date).format('L')
}