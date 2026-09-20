import { DataView } from './DataView'

const usersEndpoint = import.meta.env?.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/users/`
  : 'http://localhost:8000/api/users/'

function Users() {
  return (
    <DataView
      resource="users"
      endpointUrl={usersEndpoint}
      eyebrow="Profiles"
      title="Users"
      description="Authenticated Octofit members with goals, locations, and favorite activity types."
      emptyMessage="No users are available yet."
    >
      {(users) => (
        <div className="card-grid">
          {users.map((user) => (
            <article className="feature-card" key={user._id ?? user.username}>
              <span>@{user.username}</span>
              <h2>{user.displayName ?? user.username}</h2>
              <p>{user.email}</p>
              <dl>
                <div>
                  <dt>Goal</dt>
                  <dd>{user.profile?.weeklyGoalMinutes ?? 0} min/week</dd>
                </div>
                <div>
                  <dt>Favorite</dt>
                  <dd>{user.profile?.favoriteActivity ?? 'N/A'}</dd>
                </div>
                <div>
                  <dt>Location</dt>
                  <dd>{user.profile?.location ?? 'N/A'}</dd>
                </div>
              </dl>
            </article>
          ))}
        </div>
      )}
    </DataView>
  )
}

export default Users