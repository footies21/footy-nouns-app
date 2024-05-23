import format from 'date-fns/format';

export const formatStartDate = (date: Date) => format(date, 'PP p O');
