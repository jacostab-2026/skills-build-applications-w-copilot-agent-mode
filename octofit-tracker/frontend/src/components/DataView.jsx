import { useEffect, useState } from 'react'
import { endpointFor, fetchCollection } from '../api'

export function DataView({ resource, endpointPath, title, eyebrow, description, children, emptyMessage }) {
  const [items, setItems] = useState([])
  const [status, setStatus] = useState('loading')
  const [error, setError] = useState('')

  useEffect(() => {
    const controller = new AbortController()

    fetchCollection(resource, controller.signal, endpointPath)
      .then((collection) => {
        setItems(collection)
        setStatus('ready')
      })
      .catch((requestError) => {
        if (requestError.name === 'AbortError') {
          return
        }

        setError(requestError.message)
        setStatus('error')
      })

    return () => controller.abort()
  }, [resource, endpointPath])

  return (
    <section className="data-view" aria-labelledby={`${resource}-title`}>
      <div className="section-heading">
        <span>{eyebrow}</span>
        <h1 id={`${resource}-title`}>{title}</h1>
        <p>{description}</p>
        <code>{endpointFor(resource, endpointPath)}</code>
      </div>

      {status === 'loading' && <div className="state-panel">Loading {title.toLowerCase()}...</div>}

      {status === 'error' && (
        <div className="state-panel error" role="alert">
          Unable to load {title.toLowerCase()}: {error}
        </div>
      )}

      {status === 'ready' && items.length === 0 && (
        <div className="state-panel">{emptyMessage}</div>
      )}

      {status === 'ready' && items.length > 0 && children(items)}
    </section>
  )
}