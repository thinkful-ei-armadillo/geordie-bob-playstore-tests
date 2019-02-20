'use strict';

const app = require('../app');
const chai = require('chai');
const callMyApp = require('supertest');
const playstore = require('../playstore');

describe('App Component', () => {
  describe('Sort Endpoint', () => {
    it('should sort the array', () => {
      let results = playstore;
      results = results.sort((a, b) => {
        return a['Rating'] < b['Rating'] ? 1 : a['Rating'] > b['Rating'] ? -1 : 0;
      });
      return callMyApp(app)
        .get('/apps')
        .query({'sort': 'rating'})
        .expect(200, results);
    });
    it('should throw error with bad sort', () => {
      return callMyApp(app)
        .get('/apps')
        .query({'sort': 'genre'})
        .expect(400, 'Sort must be one of title or rank');
    });
  });
  describe('Genre Enpoint', () => {
    it('should filter by genre', () => {
      let results = playstore;
      results = results.filter(play =>
        play.Genres.toLowerCase().includes('action'));
      return callMyApp(app)
        .get('/apps')
        .query({'genre': 'action'})
        .expect(200, results);
    });
    it('should throw error if invalid genre', () => {
      return callMyApp(app)
        .get('/apps')
        .query({'genre': 'rpg'})
        .expect(400, 'Genre must be any of the following: action, arcade, card, casual, puzzle, and/or strategy');
    });
  });
});