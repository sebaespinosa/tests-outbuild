// controllers/index.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const logger = require('../logger');

// Controller function to create a schedule
const createEmptySchedule = async (req, res) => {
  const { name, imageUrl, userId } = req.body;

  try {
    const newSchedule = await prisma.schedule.create({
      data: {
        name,
        imageUrl,
        userId,
      },
    });
    logger.info('Created a new empty schedule');
    res.status(201).json(newSchedule);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create schedule' });
  }
};

// Controller function to create a user
const createUser = async (req, res) => {
  const { name, email } = req.body;

  try {
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
      },
    });
    logger.info(`Created a new user with email: ${req.body.email}`);
    res.status(201).json({ id: newUser.id });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create user' });
  }
};

// Controller function to add an activity to a schedule
const addActivity = async (req, res) => {
  const { scheduleId } = req.params;
  const { name, startDate, endDate } = req.body;

  try {

    const newActivity = await prisma.activity.create({
      data: {
        name,
        startDate,
        endDate,
        scheduleId: parseInt(scheduleId),
      },
      select: {
        id: true,
        name: true,
        startDate: true,
        endDate: true,
      },
    });
    logger.info(`Added activity to schedule ID: ${req.params.scheduleId}`);
    res.status(201).json(newActivity);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add activity' });
  }
};

// Controller function to add multiple activities to a schedule
const addMultipleActivities = async (req, res) => {
  const { scheduleId } = req.params;
  const activities = req.body.activities;

  try {
    const newActivities = await prisma.activity.createMany({
      data: activities.map(activity => ({
        ...activity,
        scheduleId: parseInt(scheduleId),
      })),
    });
    logger.info(`Added multiple activities to schedule ID: ${req.params.scheduleId}`);
    res.status(201).json(newActivities);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add activities' });
  }
};

// Controller function to retrieve a schedule along with its activities
const getScheduleWithActivities = async (req, res) => {
  const { scheduleId } = req.params;
  const userId = req.user.id;

  try {
    const schedule = await prisma.schedule.findUnique({
      where: { id: parseInt(scheduleId) },
      include: { activities: true },
    });

    if (!schedule || schedule.userId !== userId) {
      return res.status(403).json({ error: 'Access denied. You do not own this schedule.' });
    }

    logger.info(`User ${userId} retrieved schedule with ID: ${scheduleId}`);
    res.status(200).json(schedule);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve schedule' });
  }
};

// Controller function to seed the database
const seedDatabase = async (req, res) => {
  try {
    // Delete all existing data
    await prisma.activity.deleteMany();
    await prisma.schedule.deleteMany();
    await prisma.user.deleteMany();

    // Create a new user
    const newUser = await prisma.user.create({
      data: {
        name: 'demo',
        email: 'demo@demo.com',
      },
    });

    logger.info('Seeded the database');
    res.status(201).json({ message: 'Database seeded successfully', user: newUser });
  } catch (error) {
    res.status(500).json({ error: 'Failed to seed database' });
  }
};

module.exports = {
  createEmptySchedule,
  createUser,
  addActivity,
  addMultipleActivities,
  getScheduleWithActivities,
  seedDatabase,
};