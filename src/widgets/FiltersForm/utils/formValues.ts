export const sortOptions = [
  { label: 'Popularity ↓', value: 'popularity.desc' },
  { label: 'Popularity ↑', value: 'popularity.asc' },
  { label: 'Release date ↓', value: 'primary_release_date.desc' },
  { label: 'Release date ↑', value: 'primary_release_date.asc' },
  { label: 'Title A-Z', value: 'title.asc' },
  { label: 'Title Z-A', value: 'title.desc' },
  { label: 'Vote average ↑', value: 'vote_average.asc' },
  { label: 'Vote average ↓', value: 'vote_average.desc' },
] as const
