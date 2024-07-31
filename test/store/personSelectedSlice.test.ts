import * as slice from '../../src/store/personSelectedSlice';
import { describe, expect, test } from 'vitest';
import { Person } from '../../src/types';
import { personMock } from '../person.test.data';

describe('personSelectedSlice Tests', () => {
  test('should return default state when passed an empty action', () => {
    const result = slice.selectedPersonsReducer(undefined, { type: '' });

    expect(result).toEqual(slice.initialState);
  });

  test('should toggle persons in store', () => {
    const person1: Person = { ...personMock, name: 'testName1' };
    const person2: Person = { ...personMock, name: 'testName2' };
    const person3: Person = { ...personMock, name: 'testName3' };
    let action = { type: slice.toggleSelected.type, payload: person3 };

    let result = slice.selectedPersonsReducer({ list: [] }, action);
    expect(result.list[0]).toEqual(person3);
    expect(result.list.length).toEqual(1);
    action = { type: slice.toggleSelected.type, payload: person2 };
    result = slice.selectedPersonsReducer(result, action);
    expect(result.list.length).toEqual(2);
    expect(result.list.find((e) => e.name === person2.name)).toEqual(person2);
    action = { type: slice.toggleSelected.type, payload: person1 };
    result = slice.selectedPersonsReducer(result, action);
    expect(result.list.length).toEqual(3);
    expect(result.list.find((e) => e.name === person1.name)).toEqual(person1);
    action = { type: slice.toggleSelected.type, payload: person2 };
    result = slice.selectedPersonsReducer(result, action);
    expect(result.list.length).toEqual(2);
    expect(result.list.find((e) => e.name === person2.name)).not.toBeDefined();
  });

  test('should unselect all persons from store', () => {
    const person1: Person = { ...personMock, name: 'testName1' };
    const person2: Person = { ...personMock, name: 'testName2' };
    const person3: Person = { ...personMock, name: 'testName3' };
    let action = { type: slice.toggleSelected.type, payload: person3 };

    let result = slice.selectedPersonsReducer({ list: [] }, action);
    expect(result.list[0]).toEqual(person3);
    expect(result.list.length).toEqual(1);
    action = { type: slice.toggleSelected.type, payload: person2 };
    result = slice.selectedPersonsReducer(result, action);
    expect(result.list.length).toEqual(2);
    expect(result.list.find((e) => e.name === person2.name)).toEqual(person2);
    action = { type: slice.toggleSelected.type, payload: person1 };
    result = slice.selectedPersonsReducer(result, action);
    expect(result.list.length).toEqual(3);
    expect(result.list.find((e) => e.name === person1.name)).toEqual(person1);
    const action2 = { type: slice.unselectAll.type };
    result = slice.selectedPersonsReducer(result, action2);
    expect(result.list.length).toEqual(0);
  });
});
