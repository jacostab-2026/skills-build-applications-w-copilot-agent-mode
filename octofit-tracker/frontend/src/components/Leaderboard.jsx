import { entityLabel } from '../formatters'
import { DataView } from './DataView'

const leaderboardEndpoint = import.meta.env?.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`
  : 'http://localhost:8000/api/leaderboard/'

function Leaderboard() {
  return (
    <DataView
      resource="leaderboard"
      endpointUrl={leaderboardEndpoint}
      eyebrow="Competition"
      title="Leaderboard"
      description="Ranked Octofit athletes and teams ordered by performance score."
      emptyMessage="No leaderboard entries are available yet."
    >
      {(entries) => (
        <div className="leaderboard-list">
          {entries.map((entry, index) => (
            <article className="leaderboard-row" key={entry._id ?? `${entry.user}-${entry.rank}`}>
              <div className="rank">#{entry.rank ?? index + 1}</div>
              <div>
                <h2>{entityLabel(entry.user, 'Unknown athlete')}</h2>
                <p>{entityLabel(entry.team, 'Independent athlete')}</p>
              </div>
              <strong>{entry.score ?? 0}</strong>
            </article>
          ))}
        </div>
      )}
    </DataView>
  )
}

export default Leaderboard