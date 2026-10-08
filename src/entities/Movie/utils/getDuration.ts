export const getDuration = (runtime?: number | null) => {
  if (typeof runtime === 'number' && runtime > 0) {
    const hours = Math.floor(runtime / 60)
    const minutes = runtime % 60

    return `${hours}h ${minutes}min`
  }

  return '—'
}
