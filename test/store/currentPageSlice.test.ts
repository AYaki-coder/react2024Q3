import * as slice from '../../src/store/currentPageSlice';
import { describe, expect, test } from 'vitest';
import { Person } from '../../src/types';
import { personMock } from '../person.test.data';

describe('currentPageSlice Tests', () => {
  test('should return default state when passed an empty action', () => {
    const result = slice.currentPagesReducer(undefined, { type: '' });

    expect(result).toEqual(slice.initialState);
  });

  test('should set total items to the store', () => {
    const totalItems1 = 29;
    const totalItems2 = 42;
    const action1 = { type: slice.setTotalItems.type, payload: totalItems1 };
    const action2 = { type: slice.setTotalItems.type, payload: totalItems2 };

    let result = slice.currentPagesReducer({ list: [], totalItems: 7 }, action1);
    expect(result.totalItems).toEqual(totalItems1);
    result = slice.currentPagesReducer(result, action2);
    expect(result.totalItems).toEqual(totalItems2);
  });

  test('should unset current person from store', () => {
    const person1: Person = { ...personMock, name: 'testName1' };
    const person2: Person = { ...personMock, name: 'testName2' };
    const person3: Person = { ...personMock, name: 'testName3' };

    const Array1 = [person1, person3];
    const Array2 = [person2, person3];
    const Array3 = [person1, person2, person3];
    const Array4 = [person1];

    const action1 = { type: slice.setCurrentPersons.type, payload: Array1 };
    const action2 = { type: slice.setCurrentPersons.type, payload: Array2 };
    const action3 = { type: slice.setCurrentPersons.type, payload: Array3 };
    const action4 = { type: slice.setCurrentPersons.type, payload: Array4 };
    const action5 = { type: slice.setCurrentPersons.type, payload: [] };

    let result = slice.currentPagesReducer({ list: [], totalItems: 42 }, action1);
    expect(result.totalItems).toEqual(42);
    expect(result.list).toMatchObject(Array1);
    expect(result.list).not.toMatchObject([Array2]);
    result = slice.currentPagesReducer({ list: [], totalItems: 42 }, action2);
    expect(result.totalItems).toEqual(42);
    expect(result.list).toMatchObject(Array2);
    expect(result.list).not.toMatchObject(Array1);
    result = slice.currentPagesReducer({ list: [], totalItems: 42 }, action3);
    expect(result.totalItems).toEqual(42);
    expect(result.list).toMatchObject(Array3);
    expect(result.list).not.toMatchObject(Array2);
    result = slice.currentPagesReducer({ list: [], totalItems: 42 }, action4);
    expect(result.totalItems).toEqual(42);
    expect(result.list).toMatchObject(Array4);
    expect(result.list).not.toMatchObject(Array3);
    result = slice.currentPagesReducer({ list: [], totalItems: 42 }, action5);
    expect(result.totalItems).toEqual(42);
    expect(result.list).toMatchObject([]);
    expect(result.list).not.toMatchObject(Array4);
  });
});
