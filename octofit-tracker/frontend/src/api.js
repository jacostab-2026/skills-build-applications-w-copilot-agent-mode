const codespaceName = import.meta.env.VITE_CODESPACE_NAME

export const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api`
  : 'http://localhost:8000/api'

export const isCodespaceApiConfigured = Boolean(codespaceName)

export function endpointFor(resource) {
  return `${apiBaseUrl}/${resource}/`
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

export async function fetchCollection(resource, signal) {
  const response = await fetch(endpointFor(resource), { signal })

  if (!response.ok) {
    throw new Error(`Request failed with ${response.status}`)
  }

  return normalizeCollection(await response.json())
}