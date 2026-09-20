const codespaceName = import.meta.env?.VITE_CODESPACE_NAME ?? ''

const apiPaths = {
  activities: '/api/activities/',
  leaderboard: '/api/leaderboard/',
  teams: '/api/teams/',
  users: '/api/users/',
  workouts: '/api/workouts/',
}

export const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000'

export const isCodespaceApiConfigured = Boolean(codespaceName)

export function endpointFor(resource, endpointPath) {
  const apiPath = endpointPath ?? apiPaths[resource]

  if (!apiPath) {
    throw new Error(`Unknown API resource: ${resource}`)
  }

  return `${apiBaseUrl}${apiPath}`
}

export function normalizeCollection(payload) {
  if (Array.isArray(payload)) {
    return payload
  }

  if (!payload || typeof payload !== 'object') {
    return []
  }

  const collectionKeys = ['results', 'items', 'data', 'docs', 'records']
  const collection = collectionKeys
    .map((key) => payload[key])
    .find((value) => Array.isArray(value))

  return collection ?? []
}

export async function fetchCollection(resource, signal, endpointPath) {
  const response = await fetch(endpointFor(resource, endpointPath), { signal })

  if (!response.ok) {
    throw new Error(`Request failed with ${response.status}`)
  }

  return normalizeCollection(await response.json())
}