export function formatDate(value) {
  if (!value) {
    return 'Not scheduled'
  }

  return new Intl.DateTimeFormat('en', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(value))
}

export function entityLabel(value, fallback = 'Unassigned') {
  if (!value) {
    return fallback
  }

  if (typeof value === 'string') {
    return value
  }

  return value.displayName ?? value.name ?? value.username ?? value._id ?? fallback
}