const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const { createEmptySchedule, seedDatabase, addActivity } = require('./index');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const app = express();
app.use(bodyParser.json());
app.post('/seed', seedDatabase);
app.post('/new-empty-schedule', createEmptySchedule);
app.post('/schedules/:scheduleId/activities', addActivity);

describe('Integration tests for schedule and activities', () => {
  let userId;
  let scheduleId;

  beforeAll(async () => {
    await prisma.activity.deleteMany();
    await prisma.schedule.deleteMany();
    await prisma.user.deleteMany();
  });

  it('should seed the database and get the user ID', async () => {
    const response = await request(app).post('/seed');
    expect(response.status).toBe(201);
    expect(response.body.user).toHaveProperty('id');
    userId = response.body.user.id;
  });

  it('should create a new empty schedule and get the schedule ID', async () => {
    const response = await request(app)
      .post('/new-empty-schedule')
      .send({
        name: 'My Schedule',
        imageUrl: 'http://example.com/image.png',
        userId: userId,
      });
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    scheduleId = response.body.id;
  });

  it('should add an activity to the schedule', async () => {
    const response = await request(app)
      .post(`/schedules/${scheduleId}/activities`)
      .send({
        name: 'Morning Yoga',
        startDate: '2023-10-21T07:00:00Z',
        endDate: '2023-10-21T08:00:00Z',
      });
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.name).toBe('Morning Yoga');
  });
});