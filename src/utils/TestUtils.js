import { Observable, TestScheduler } from 'rxjs';
import { ActionsObservable } from 'redux-observable';

export const createTestScheduler = () => new TestScheduler((actual, expected) => expect(actual).toEqual(expected));

export const hot = (testScheduler, marbles, values) => new ActionsObservable(
  testScheduler.createHotObservable(marbles, values));

