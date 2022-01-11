// https://nodejs.org/docs/latest-v12.x/api/intl.html
export const timeFormatter = Intl.DateTimeFormat("en", {
  minute: "2-digit",
  hour: "2-digit",
});
export const dateFormatter = Intl.DateTimeFormat("en", {
  dateStyle: "medium",
});

export const timeFormatterUTC = Intl.DateTimeFormat("en", {
  minute: "2-digit",
  hour: "2-digit",
  timeZone: "UTC",
});

export const dateFormatterUTC = Intl.DateTimeFormat("en", {
  dateStyle: "medium",
  timeZone: "UTC",
});
