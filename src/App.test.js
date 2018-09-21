import React from 'react';
import ReactDOM from 'react-dom';

import deepFreeze from 'deep-freeze'
import counterReducer from './store/counterReducer'

describe('unicafe reducer', () => {
  const initialState = {
    good: 0,
    neutral: 0,
    bad: 0
  }

  it('should return a proper initial state when called with undefined state', () => {
    const state = {}
    const action = {
      type: 'DO_NOTHING'
    }

    const newState = counterReducer(undefined, action)
    expect(newState).toEqual(initialState)
  })

  it('good is incremented', () => {
    const action = {
      type: 'GOOD'
    }
    const state = initialState

    deepFreeze(state)
    const newState = counterReducer(state, action)
    expect(newState).toEqual({
      good: 1,
      neutral: 0,
      bad: 0
    })
  })
  it('bad is incremented', () => {
    const action = {
      type: 'BAD'
    }
    const state = initialState

    deepFreeze(state)
    const newState = counterReducer(state, action)
    expect(newState).toEqual({
      good: 0,
      neutral: 0,
      bad: 1
    })
  })
  it('neutral is incremented', () => {
    const action = {
      type: 'NEUTRAL'
    }
    const state = initialState

    deepFreeze(state)
    const newState = counterReducer(state, action)
    expect(newState).toEqual({
      good: 0,
      neutral: 1,
      bad: 0
    })
  })
  it('zero resets state', () => {
    const state = initialState

    deepFreeze(state)
    const newState = counterReducer(state, {
      type: 'NEUTRAL'
    })
    const newState2 = counterReducer(newState, {
      type: 'BAD'
    })
    const newState3 = counterReducer(newState2, {
      type: 'GOOD'
    })
    expect(newState3).toEqual({
      good: 1,
      neutral: 1,
      bad: 1
    })
    const finalState = counterReducer(newState3, {
      type: 'ZERO'
    })
    expect(finalState).toEqual({
      good: 0,
      neutral: 0,
      bad: 0
    })

  })

})