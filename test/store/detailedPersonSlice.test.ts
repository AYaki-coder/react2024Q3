import * as slice from '../../src/store/detailedPersonSlice';
import { describe, expect, test } from 'vitest';
import { Person } from '../../src/types';
import { personMock } from '../person.test.data';

describe('detailedPersonSlice Tests', () => {
  test('should return default state when passed an empty action', () => {
    const result = slice.detailedPersonReducer(undefined, { type: '' });

    expect(result).toEqual(slice.initialState);
  });

  test('should set current persons in store', () => {
    const person1: Person = { ...personMock, name: 'testName1' };
    const person2: Person = { ...personMock, name: 'testName2' };
    const action1 = { type: slice.setCurrentPerson.type, payload: person1 };
    const action2 = { type: slice.setCurrentPerson.type, payload: person2 };

    let result = slice.detailedPersonReducer({ person: null }, action1);
    expect(result.person).toEqual(person1);
    result = slice.detailedPersonReducer({ person: null }, action2);
    expect(result.person).toEqual(person2);
    result = slice.detailedPersonReducer(result, action1);
    expect(result.person).toEqual(person1);
    expect(person1).not.toEqual(person2);
  });

  test('should unset current person from store', () => {
    const person1: Person = { ...personMock, name: 'testName1' };
    const action1 = { type: slice.setCurrentPerson.type, payload: person1 };
    const action2 = { type: slice.clearCurrentPerson.type };

    let result = slice.detailedPersonReducer({ person: null }, action1);
    expect(result.person).toEqual(person1);
    result = slice.detailedPersonReducer(result, action2);
    expect(result.person).toEqual(null);
  });
});
