import { DataView } from './DataView'

function Workouts() {
  return (
    <DataView
      resource="workouts"
      eyebrow="Suggestions"
      title="Workouts"
      description="Personalized training sessions and activity blocks served by the logic tier."
      emptyMessage="No workout suggestions are available yet."
    >
      {(workouts) => (
        <div className="card-grid two-up">
          {workouts.map((workout) => (
            <article className="feature-card workout-card" key={workout._id ?? workout.title}>
              <div className="card-kicker">
                <span>{workout.difficulty ?? 'General'}</span>
                <strong>{workout.durationMinutes ?? 0} min</strong>
              </div>
              <h2>{workout.title}</h2>
              <p>{workout.description ?? 'No workout description provided.'}</p>
              <ul>
                {(workout.activities ?? []).map((activity) => (
                  <li key={activity}>{activity}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      )}
    </DataView>
  )
}

export default Workouts