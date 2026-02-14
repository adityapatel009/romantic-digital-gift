export function isFuture(date: Date) {
  return date.getTime() > Date.now();
}

export function formatDateTime(d: Date) {
  return d.toLocaleString();
}
