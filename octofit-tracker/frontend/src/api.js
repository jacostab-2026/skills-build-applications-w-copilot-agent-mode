const codespaceName = import.meta.env?.VITE_CODESPACE_NAME ?? ''

export const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000'

export const isCodespaceApiConfigured = Boolean(codespaceName)

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

export async function fetchCollection(endpointUrl, signal) {
  const response = await fetch(endpointUrl, { signal })

  if (!response.ok) {
    throw new Error(`Request failed with ${response.status}`)
  }

  return normalizeCollection(await response.json())
}