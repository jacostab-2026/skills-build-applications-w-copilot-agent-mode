import mongoose from 'mongoose';
import { Activity, LeaderboardEntry, Team, User, Workout } from '../models.js';

const connectionString = 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');
    console.log('Seed the octofit_db database with test data');

    await Promise.all([
      Activity.deleteMany({}),
      LeaderboardEntry.deleteMany({}),
      Team.deleteMany({}),
      User.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    const users = await User.insertMany([
      {
        username: 'ava_runner',
        email: 'ava.martinez@example.com',
        displayName: 'Ava Martinez',
        profile: {
          age: 29,
          favoriteActivity: 'Trail running',
          weeklyGoalMinutes: 300,
          location: 'Boulder, CO',
        },
      },
      {
        username: 'marcus_lifts',
        email: 'marcus.johnson@example.com',
        displayName: 'Marcus Johnson',
        profile: {
          age: 34,
          favoriteActivity: 'Strength training',
          weeklyGoalMinutes: 240,
          location: 'Austin, TX',
        },
      },
      {
        username: 'lin_cycle',
        email: 'lin.chen@example.com',
        displayName: 'Lin Chen',
        profile: {
          age: 27,
          favoriteActivity: 'Road cycling',
          weeklyGoalMinutes: 360,
          location: 'Portland, OR',
        },
      },
      {
        username: 'sofia_yoga',
        email: 'sofia.ramirez@example.com',
        displayName: 'Sofia Ramirez',
        profile: {
          age: 31,
          favoriteActivity: 'Yoga and mobility',
          weeklyGoalMinutes: 210,
          location: 'San Diego, CA',
        },
      },
    ]);

    const [ava, marcus, lin, sofia] = users;

    const teams = await Team.insertMany([
      {
        name: 'Trail Blazers',
        description: 'Outdoor cardio enthusiasts logging miles on trails and roads.',
        members: [ava._id, lin._id],
      },
      {
        name: 'Core Crew',
        description: 'Strength, conditioning, and recovery team focused on balanced fitness.',
        members: [marcus._id, sofia._id],
      },
    ]);

    const [trailBlazers, coreCrew] = teams;

    await Activity.insertMany([
      {
        user: ava._id,
        type: 'Run',
        durationMinutes: 52,
        distanceMiles: 6.2,
        caloriesBurned: 610,
        completedAt: new Date('2026-09-16T13:30:00Z'),
      },
      {
        user: marcus._id,
        type: 'Strength Training',
        durationMinutes: 48,
        caloriesBurned: 420,
        completedAt: new Date('2026-09-17T22:00:00Z'),
      },
      {
        user: lin._id,
        type: 'Cycling',
        durationMinutes: 95,
        distanceMiles: 28.4,
        caloriesBurned: 980,
        completedAt: new Date('2026-09-18T12:15:00Z'),
      },
      {
        user: sofia._id,
        type: 'Yoga',
        durationMinutes: 40,
        caloriesBurned: 180,
        completedAt: new Date('2026-09-19T14:45:00Z'),
      },
      {
        user: ava._id,
        type: 'Hiking',
        durationMinutes: 110,
        distanceMiles: 5.8,
        caloriesBurned: 760,
        completedAt: new Date('2026-09-20T15:20:00Z'),
      },
    ]);

    await LeaderboardEntry.insertMany([
      { user: lin._id, team: trailBlazers._id, score: 2450, rank: 1 },
      { user: ava._id, team: trailBlazers._id, score: 2215, rank: 2 },
      { user: marcus._id, team: coreCrew._id, score: 1880, rank: 3 },
      { user: sofia._id, team: coreCrew._id, score: 1640, rank: 4 },
    ]);

    await Workout.insertMany([
      {
        title: '5K Tempo Builder',
        description: 'A progressive run session for improving race pace control.',
        difficulty: 'Intermediate',
        durationMinutes: 45,
        activities: ['Warm-up jog', 'Tempo intervals', 'Cool-down walk'],
      },
      {
        title: 'Full-Body Strength Circuit',
        description: 'Compound lifts and bodyweight movements for balanced strength.',
        difficulty: 'Beginner',
        durationMinutes: 35,
        activities: ['Goblet squats', 'Push-ups', 'Bent-over rows', 'Plank holds'],
      },
      {
        title: 'Endurance Ride',
        description: 'Steady-state cycling workout focused on aerobic base building.',
        difficulty: 'Advanced',
        durationMinutes: 90,
        activities: ['Zone 2 ride', 'Cadence drills', 'Recovery spin'],
      },
      {
        title: 'Mobility Reset',
        description: 'Low-impact recovery session for flexibility and joint mobility.',
        difficulty: 'Beginner',
        durationMinutes: 25,
        activities: ['Hip openers', 'Thoracic rotations', 'Hamstring stretches'],
      },
    ]);

    console.log('Database seeding complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
