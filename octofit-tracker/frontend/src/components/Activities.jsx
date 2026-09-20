import { entityLabel, formatDate } from '../formatters'
import { DataView } from './DataView'

function Activities() {
  return (
    <DataView
      resource="activities"
      eyebrow="Activity log"
      title="Activities"
      description="Recent workouts, mileage, effort, and completion dates from the Octofit API."
      emptyMessage="No activities have been logged yet."
    >
      {(activities) => (
        <div className="responsive-table">
          <table className="table align-middle">
            <thead>
              <tr>
                <th>Type</th>
                <th>User</th>
                <th>Duration</th>
                <th>Distance</th>
                <th>Calories</th>
                <th>Completed</th>
              </tr>
            </thead>
            <tbody>
              {activities.map((activity) => (
                <tr key={activity._id ?? `${activity.type}-${activity.completedAt}`}>
                  <td>{activity.type}</td>
                  <td>{entityLabel(activity.user)}</td>
                  <td>{activity.durationMinutes ?? 0} min</td>
                  <td>{activity.distanceMiles ? `${activity.distanceMiles} mi` : 'N/A'}</td>
                  <td>{activity.caloriesBurned ?? 0}</td>
                  <td>{formatDate(activity.completedAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </DataView>
  )
}

export default Activities