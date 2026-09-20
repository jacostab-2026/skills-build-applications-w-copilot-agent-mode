import { DataView } from './DataView'

const teamsEndpoint = import.meta.env?.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/teams/`
  : 'http://localhost:8000/api/teams/'

function Teams() {
  return (
    <DataView
      resource="teams"
      endpointUrl={teamsEndpoint}
      eyebrow="Team management"
      title="Teams"
      description="Training groups, descriptions, and member counts for the Octofit community."
      emptyMessage="No teams have been created yet."
    >
      {(teams) => (
        <div className="card-grid two-up">
          {teams.map((team) => (
            <article className="feature-card" key={team._id ?? team.name}>
              <span>{team.members?.length ?? 0} members</span>
              <h2>{team.name}</h2>
              <p>{team.description ?? 'No team description provided.'}</p>
            </article>
          ))}
        </div>
      )}
    </DataView>
  )
}

export default Teams