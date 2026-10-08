export const getDuration = (runtime?: number | null) => {
  if (typeof runtime === 'number' && runtime > 0) {
    return `${runtime} мин.`
  }

  return '—'
}
