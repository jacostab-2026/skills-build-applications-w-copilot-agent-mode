import mongoose, { Schema } from 'mongoose';

const userSchema = new Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true },
    displayName: String,
    profile: Schema.Types.Mixed,
  },
  { timestamps: true, collection: 'users' },
);

const teamSchema = new Schema(
  {
    name: { type: String, required: true },
    description: String,
    members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  },
  { timestamps: true, collection: 'teams' },
);

const activitySchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    type: { type: String, required: true },
    durationMinutes: Number,
    distanceMiles: Number,
    caloriesBurned: Number,
    completedAt: Date,
  },
  { timestamps: true, collection: 'activities' },
);

const leaderboardSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    team: { type: Schema.Types.ObjectId, ref: 'Team' },
    score: { type: Number, default: 0 },
    rank: Number,
  },
  { timestamps: true, collection: 'leaderboard' },
);

const workoutSchema = new Schema(
  {
    title: { type: String, required: true },
    description: String,
    difficulty: String,
    durationMinutes: Number,
    activities: [String],
  },
  { timestamps: true, collection: 'workouts' },
);

export const User = mongoose.model('User', userSchema);
export const Team = mongoose.model('Team', teamSchema);
export const Activity = mongoose.model('Activity', activitySchema);
export const LeaderboardEntry = mongoose.model('LeaderboardEntry', leaderboardSchema);
export const Workout = mongoose.model('Workout', workoutSchema);
