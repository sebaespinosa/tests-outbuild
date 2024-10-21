// routes/index.js
const express = require('express');
const router = express.Router();
const { createEmptySchedule, createUser, addActivity, addMultipleActivities, getScheduleWithActivities, seedDatabase } = require('../controllers');

// Define the route for creating a schedule
router.post('/new-empty-schedule', createEmptySchedule);

// Define the route for creating a user
router.post('/create-user', createUser);

// Define the route for adding an activity to a schedule
router.post('/schedules/:scheduleId/activities', addActivity);

// Define the route for adding multiple activities to a schedule
router.post('/schedules/:scheduleId/activities/bulk', addMultipleActivities);

// Define the route for retrieving a schedule along with its activities
router.get('/schedules/:scheduleId', getScheduleWithActivities);

// Define the route for seeding the database
router.post('/seed', seedDatabase);

module.exports = router;