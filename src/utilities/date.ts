export const padStart2 = (x: string | number) => `${x}`.padStart(2, '0');

export const getIsoTimezoneString = (timezoneOffset: number): string => {
  const sign = '++-'[Math.sign(timezoneOffset) + 1];
  const abs = Math.abs(timezoneOffset);

  return sign + padStart2(abs / 60 | 0) + padStart2(abs % 60);
};

export const parseIsoDateString = (isoDateString?: string): Date | null => {
  if (!isoDateString) {
    return null;
  }
  return new Date(`${isoDateString}T00:00:00`);
};

export const toLocalIsoDateString = (inputDate: Date): string => {
  if (isNaN(inputDate.valueOf())) {
    throw new TypeError('Input date is invalid');
  }

  const year = inputDate.getFullYear();
  const month = inputDate.getMonth() + 1;
  const date = inputDate.getDate();

  return `${year}-${padStart2(month)}-${padStart2(date)}`;
};
