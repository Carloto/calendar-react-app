const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export function getToday() {
  return '2021-06-17';
}

export function monthToString(isoMonth: string) {
  const [year, month] = isoMonth.split('-');
  return `${months[parseInt(month) - 1]} ${year}`;
}

export function addMonth(isoMonth: string, increment: number) {
  const date = new Date(isoMonth + '-01T12:00:00');
  date.setMonth(date.getMonth() + increment);
  return `${date.getFullYear()}-${(date.getMonth() + 1)
    .toString()
    .padStart(2, '0')}`;
}
