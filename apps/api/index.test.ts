import { describe, it, expect } from 'vitest';
import request from 'supertest';
import express from 'express';
import api from './index';

describe('Weather API', () => {
  it('GET /api/weather returns weather data', async () => {
    const res = await request(api).get('/api/weather');
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('city');
    expect(res.body).toHaveProperty('country');
    expect(res.body).toHaveProperty('temperature');
    expect(res.body).toHaveProperty('condition');
  });

  it('POST /api/weather updates weather data', async () => {
    const res = await request(api)
      .post('/api/weather')
      .send({ city: 'Paris', country: 'France', temperature: 25, condition: 'Sunny' });
    expect(res.status).toBe(200);
    expect(res.body.city).toBe('Paris');
    expect(res.body.country).toBe('France');
    expect(res.body.temperature).toBe(25);
    expect(res.body.condition).toBe('Sunny');
  });
});
